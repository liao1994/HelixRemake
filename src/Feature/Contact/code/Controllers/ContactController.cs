using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Feature.Contact.Controllers
{
    public class ContactController : Controller
    {
        public ContactController()
        {
        }

        public ActionResult Index()
        {
            return View();
        }
    }
}