var gulp = require("gulp");
var msbuild = require("gulp-msbuild");
var log = require("fancy-log");
var fs = require('file-system');
var foreach = require("gulp-foreach");
var debug = require("gulp-debug");
var yargs = require("yargs").argv;

var config;
if (fs.existsSync("./gulp-config.js.user")) {
    config = require("./gulp-config.js.user")();
} else {
    config = require("./gulp-config.js")();
}

// some of the comments below is copied from: https://docs.microsoft.com/en-us/visualstudio/msbuild/msbuild-command-line-reference?view=vs-2017
// other comments copied from: https://www.npmjs.com/package/gulp-msbuild
gulp.task("Build-Solution",
    function () {
        var targets = ["Build"];
        
        if (config.runCleanBuilds) {
            targets = ["Clean", "Build"];
        }

        // source path. (Visual Studio Solution)
        var src = "./" + config.solutionName + ".sln";

        // destination path. msbuild is 
        var dest = msbuild({
            targets: targets, // Build the specified targets in the project. Specify each target separately, or use a semicolon or comma to separate multiple targets, as the following example shows:
            configuration: config.buildConfiguration,
            logCommand: true, // Logs the msbuild command that will be executed.
            verbosity: config.buildVerbosity,
            stdout: true, // Show output of msbuild
            stderr: true, // Show errors of msbuild
            errorOnFail: true, // If the MSBuild job fails with an error, this will cause the gulp-msbuild stream to return an error thus causing the gulp task to fail. This is useful if using an automated build server such as Jenkins where a failing MSBuild should also cause the overall build job to fail.
            maxcpucount: config.buildMaxCpuCount,
            nodeReuse: false,
            toolsVersion: config.buildToolsVersion,
            properties: { Platform: config.buildPlatform },
            customArgs: ["/restore"] // Specify custom msbuild arguments, which don't have a own property in gulp-msbuild.
        });

        return gulp.src(src)
            .pipe(dest);
    });


//******* publish *******
// most of it copied from habitat project GulpFile.js
//******* publish *******

// publish stream for piping
// this function returns a output-stream from 'msbuild' that holds the build files for a given project.
var publishStream = function (stream, dest) {
    var targets = ["Build"];

    return stream
        .pipe(debug({ title: "Building project:" }))
        .pipe(msbuild({
            targets: targets,
            configuration: config.buildConfiguration,
            logCommand: false,
            verbosity: config.buildVerbosity,
            stdout: true,
            errorOnFail: true,
            maxcpucount: config.buildMaxCpuCount,
            nodeReuse: false,
            toolsVersion: config.buildToolsVersion,
            properties: {
                Platform: config.publishPlatform,
                DeployOnBuild: "true",
                DeployDefaultTarget: "WebPublish",
                WebPublishMethod: "FileSystem",
                BuildProjectReferences: "false",
                DeleteExistingFiles: "false",
                publishUrl: dest
            }
        }));
};
// function this essentially pipes output from 'publishStream' to the websiteRoot
var publishProject = function (location, dest) {
    dest = dest || config.websiteRoot;

    log("publish to " + dest + " folder");
    return gulp.src([location + "/code/*.csproj"])
        .pipe(foreach(function (stream, file) {
            return publishStream(stream, dest);
        }));
};

// function this essentially pipes output from 'publishStream' to the websiteRoot for multiple projects
var publishProjects = function (location, dest) {
    dest = dest || config.websiteRoot;

    console.log("publish to " + dest + " folder");
    return gulp.src([location + "/**/code/*.csproj"])
        .pipe(foreach(function (stream, file) {
            return publishStream(stream, dest);
        }));
};

// gulp tasks for publishing for a helix architecture (Project, Feature, Foundation)
// foundation publishing
gulp.task("Publish-Foundation-Projects",
    function () {
        return publishProjects("./Foundation");
    });

// feature publishing
gulp.task("Publish-Feature-Projects",
    function () {
        return publishProjects("./Feature");
    });

// project publishing
gulp.task("Publish-Project-Projects",
    function () {
        return publishProjects("./Project");
    });

// project a specific project indicated by the args provided
/*
gulp.task("Publish-Project",
    function () {
        if (yargs && yargs.m && typeof (yargs.m) == "string") {
            return publishProject(yargs.m);
        } else {
            throw "\n\n------\n USAGE: -m Layer/Module. Example usage: gulp Publish-Project -m Foundation/Serialization \n------\n\n";
        }
    });
*/


gulp.task("Publish-Solution",
    ["Publish-Project-Projects","Publish-Feature-Projects","Publish-Foundation-Projects"]);

// ***** This is interesting for future usage when deployment should be on a "real" server *****//
/*
var user = "feg@novicell.dk";
var password = "********";
var host = "nc-feg-laptop";


//var ftp = require('vinyl-ftp'); // OBS this should be located at the top of this file instead!


function getFtpConnection() {
    return ftp.create({
        host: host, // Device Name of the computer. Find "This Computer" and look in System Properties
        port: 21,
        user: user,
        password: password,
        log: log
        //parallel: 5
    });
}
*/