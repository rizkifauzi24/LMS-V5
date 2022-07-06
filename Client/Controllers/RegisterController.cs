using API.Models;
using API.ViewModel;
using Client.Base;
using Client.Repositories.Data;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Client.Controllers
{
    public class RegisterController : BaseController<User, RegisterRepository, int>
    {
        private readonly RegisterRepository repository;
        public RegisterController(RegisterRepository repository) : base(repository)
        {
            this.repository = repository;
        }
        public IActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public async Task<JsonResult> Register(RegistUserVM registUserVM)
        {
            var result = await repository.Registered(registUserVM);
            return Json(result);
        }
    }
}
