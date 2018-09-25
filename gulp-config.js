module.exports = function () {
    var instanceRoot = "C:\\inetpub\\wwwroot\\helixRemake\\Website";
    var config = {
        websiteRoot: instanceRoot + "\\",
        solutionToProjectPAth: "\\.", // this could for example be: ./src/
        //sitecoreLibraries: instanceRoot + "\\bin",
        //licensePath: instanceRoot + "\\App_Data\\license.xml",
        //packageXmlBasePath: ".\\src\\Project\\Habitat\\code\\App_Data\\packages\\habitat.xml",
        //packagePath: instanceRoot + "\\App_Data\\packages",
        solutionName: "HelixRemake",
        buildConfiguration: "Release", // Specify Build Configuration (Release or Debug)
        buildToolsVersion: "auto", // Specify the .NET Tools-Version. Default: 4.0. Possible Values: 1.0, 1.1, 2.0, 3.5, 4.0, 12.0, 14.0, 15.0, 'auto'. 'auto' attempts to find the latest version >= 12.0, with a fallback to 4.0
        buildMaxCpuCount: 0, // Specifies the maximum number of concurrent processes to use when building. If you don't include this switch, the default value is 1. If you include this switch without specifying a value, MSBuild will use up to the number of processors in the computer. For more information, see Building multiple projects in parallel.
        buildVerbosity: "minimal", // Specifies the amount of information to display in the build log.
        buildPlatform: "Any CPU", // Specify the Solution Platform (e.g. x86, x64, AnyCPU).
        publishPlatform: "AnyCpu",
        runCleanBuilds: false
    };
    return config;
}