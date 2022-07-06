using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using API.Models;
using API.Repository.Data;
using API.ViewModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace API.Controllers
{
    public class AccountController : BaseController<Account, AccountRepository, int>
    {
        private readonly AccountRepository _accountRepository;
        public IConfiguration _configuration;

        public AccountController(AccountRepository accountRepository, IConfiguration configuration) : base(accountRepository)
        {
            this._accountRepository = accountRepository;
            this._configuration = configuration;
        }
       
        [HttpPost("Login")]
        public ActionResult Post(LoginVM loginVM)
        {
            string Token;
            int TokeLogin = _accountRepository.Login(loginVM, out Token);

            if (_accountRepository.Login(loginVM, out Token) == 200)
            {
                return StatusCode(200, new { status = Convert.ToInt32(HttpStatusCode.OK), Token = Token, message = "Loggin" });
            }
            else if (_accountRepository.Login(loginVM, out Token) == 404)
            {
                return StatusCode(404, new { status = Convert.ToInt32(HttpStatusCode.NotFound), Token = Token, message = "Gagal Login : Password Salah!" });
            }
            else
            {
                return StatusCode(400, new { status = Convert.ToInt32(HttpStatusCode.BadRequest), Token = Token, message = "Gagal Login : Email tidak ditemukan!" });
            }
        }

        [HttpPost]
        [Route("Forgot")]

        public ActionResult ForgotPassword(ForgotVM forgotVM)
        {
            var result = _accountRepository.ForgotPassword(forgotVM);

            if (result == -1)
            {
                return StatusCode(400, new { status = HttpStatusCode.BadRequest, Message = "Email Tidak Terdaftar" });
            }
            else
            {
                return StatusCode(200, new { status = HttpStatusCode.OK, Message = "Kode OTP Sudah Dikirim" });
            }
        }

        [HttpPost]
        [Route("ChangePassword")]

        public ActionResult ChangePassword(ChangePasswordVM changePasswordVM)
        {
            var result = _accountRepository.ChangePassword(changePasswordVM);


            if (result == -1)
            {
                return StatusCode(400, new { status = HttpStatusCode.BadRequest, Message = "Email Salah!" });
            }
            else if (result == -2)
            {
                return StatusCode(400, new { status = HttpStatusCode.BadRequest, Message = "OTP Telah Aktif" });
            }
            else if (result == -3)
            {
                return StatusCode(400, new { status = HttpStatusCode.BadRequest, Message = "Kode OTP Telah Kadaluarsa" });
            }
            else if (result == -4)
            {
                return StatusCode(400, new { status = HttpStatusCode.BadRequest, Message = "Kode OTP Salah!" });
            }
            else if (result > 0)
            {
                return StatusCode(200, new { status = HttpStatusCode.OK, Message = "Password Berhasil Di Ganti" });
            }
            else
            {
                return StatusCode(400, new { status = HttpStatusCode.BadRequest, Message = "Password Gagal Di Ganti" });
            }
        }
    }
}