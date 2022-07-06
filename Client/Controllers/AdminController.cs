using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Client.Controllers
{
    //[Authorize]
    
    public class AdminController : Controller
    {
        [Authorize(Roles = "Admin")]
        public IActionResult Index()
        {
            
            return View();
        }

        [Authorize(Roles = "Admin")]
        public IActionResult TopicData()
        {
            return View();
        }

        [Authorize(Roles = "Admin")]
        public IActionResult CourseData()
        {
            return View();
        }
        [Authorize(Roles = "Admin")]
        public IActionResult SectionData()
        {
            return View();
        }
        [Authorize(Roles = "Admin")]
        public IActionResult TransactionWaiting()
        {
            return View();
        }
        [Authorize(Roles = "Admin")]
        public IActionResult TransactionDecline()
        {
            return View();
        }

        [Authorize(Roles = "Admin")]
        public IActionResult TransactionAccept()
        {
            return View();
        }
        [Authorize(Roles = "Admin")]
        public IActionResult UserData()
        {
            return View();
        }
    }
}
