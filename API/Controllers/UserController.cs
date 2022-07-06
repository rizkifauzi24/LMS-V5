using API.Models;
using API.Repository.Data;
using API.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : BaseController<User, UserRepository, int>
    {

        private readonly UserRepository _userRepository;
        public UserController(UserRepository userRepository) : base(userRepository)
        {
            this._userRepository = userRepository;
        }


        [HttpPost("Register")]
        /*[EnableCors("AllowOrigin")]*/
        public ActionResult Post(RegistUserVM registUserVM)
        {
            if (_userRepository.CheckEmail(registUserVM.email))
            {
                return StatusCode(400, new { status = HttpStatusCode.BadRequest, message = "Email Sudah Terpakai !" });
            }
            else if (_userRepository.CheckPhone(registUserVM.Phone))
            {
                return StatusCode(404, new { status = HttpStatusCode.NotFound, message = "Phone Sudah Terpakai !" });
            }
            else
            {
                var result = _userRepository.Insert(registUserVM);
                if (result > 0)
                {
                    return StatusCode(200, new { status = HttpStatusCode.OK, message = "Insert Berhasil " });
                }
                else
                {
                    return StatusCode(400, new { status = HttpStatusCode.BadRequest, message = "Insert Gagal" });
                }
            }
        }

        //[Authorize(Roles = "Admin")]
        [HttpGet("GetAll")]
        public IEnumerable<RegistGetAllVM> GetAll()
        {
            return _userRepository.GetAll().ToList();
        }





    }
}
