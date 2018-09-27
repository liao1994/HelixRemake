using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Sitecore.Mvc.Presentation;
using Sitecore.Data.Items;
using Sitecore.Links;
namespace Feature.Navigation.Controllers
{
    //public class RenderingThing
    //{
    //    public RenderingModel RenderingModel;
    //    public List<string> NavigationList;

    //    public RenderingThing(RenderingModel renderingModel, List<string> navigationList)
    //    {
    //        RenderingModel = renderingModel;
    //        NavigationList = navigationList;
    //    }
    //}
    public class NavigationController : Controller
    {
        // GET: Default
        public ActionResult Index()
        {
            var linkField = (Sitecore.Data.Fields.LinkField)Sitecore.Context.Item.Fields["Link"];

            var url = linkField.TargetItem != null ? LinkManager.GetItemUrl(linkField.TargetItem) : linkField.Url;
            

            ViewBag.Url = url ?? "null";
            ViewBag.ContentStartPath = Sitecore.Context.Site.ContentStartPath;
            ViewBag.StartPath = Sitecore.Context.Site.StartPath;
            var items = Sitecore.Context.Item.Children;
            var navigationOptions = new List<string>();
            foreach (var ele in items.ToArray())
            {
                navigationOptions.Add(ele.Name);
            }
            //var model = new RenderingThing(new RenderingModel(), navigationOptions);

            return View();
            //return View("Index",model);
        }

        public ActionResult DisplayNavigationHead() => View();

        public ActionResult DisplayNavigationMenu() => View();
    }
}