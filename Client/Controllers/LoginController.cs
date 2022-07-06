using API.Models;
using API.ViewModel;
using Client.Base;
using Client.Repositories.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Client.Controllers
{
    public class LoginController : BaseController<Account, LoginRepository, string>
    {
        private readonly LoginRepository repository;
        public LoginController(LoginRepository repository) : base(repository)
        {
            this.repository = repository;
        }
        [HttpPost]
        public async Task<JsonResult> Auth(LoginVM loginVM)
        {

            var result = await repository.Auth(loginVM);
            var token = result.Token;

            if (token == null)
            {
                return Json(result);
            }

            HttpContext.Session.SetString("JWToken", result.Token.ToString());
            //HttpContext.Session.SetString("Name", token.Name);
            return Json(result);
        }

      
        public IActionResult Index()
        {
            if (HttpContext.Session.GetString("JWToken") != null)
            {
                //return Redirect("/Login");
                if (HttpContext.User.IsInRole("Admin"))
                {
                    return Redirect("/Admin");
                } else if(HttpContext.User.IsInRole("User"))
                {
                    return Redirect("/Customer");
                }
                else
                {
                    return Redirect("/User");
                }
            }
            return View();
        }



        [HttpGet("Logout/")]
        public async Task<IActionResult> Logout()
        {
            HttpContext.Session.Clear();
            return RedirectToAction("Index", "User");

        }
        public IActionResult Forgot()
        {
            return View();
        }

        [HttpPost]
        public async Task<JsonResult> Forgot(ForgotVM forgotVM)
        {
            var result = await repository.Forgot(forgotVM);
            return Json(result);
        }

        public IActionResult ChangePassword()
        {
            return View();
        }

        [HttpPost]
        public async Task<JsonResult> ChangePassword(ChangePasswordVM changePasswordVM)
        {
            var result = await repository.ChangePassword(changePasswordVM);
            return Json(result);
        }
    }
}
