﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Feature.Blog.Controllers
{
    public class ArticleController : Controller
    {
        public ActionResult List()
        {
            return View();
        }

        public ActionResult Display()
        {
            return View();
        }
    }
}