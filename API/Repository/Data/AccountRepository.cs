using API.Contex;
using API.Models;
using API.ViewModel;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace API.Repository.Data
{
    public class AccountRepository : GeneralRepository<MyContex, Account, int>
    {
        private readonly MyContex _context;
        public IConfiguration _configuration;
        public AccountRepository(MyContex myContext, IConfiguration configuration) : base(myContext)
        {
            this._context = myContext;
            this._configuration = configuration;
        }

        public bool CheckEmail(string email)
        {
            User employee = _context.Users.FirstOrDefault(user => user.email == email);
            return employee != null;
        }

        public bool CheckPassword(string password, string correctHash)
        {
            return BCrypt.Net.BCrypt.Verify(password, correctHash);
        }

        public int Login(LoginVM loginVM, out string Token)
        {
            if (CheckEmail(loginVM.Email))
            {
                var password = (from ac in _context.Accounts
                                join us in _context.Users
                                on ac.UserId equals us.UserId
                                where us.email == loginVM.Email
                                select ac.Password).FirstOrDefault();

                var cekPass = CheckPassword(loginVM.Password, password);

                if (cekPass != false)
                {
                    var checkRole = (from us in _context.Users
                                     join ac in _context.Accounts
                                     on us.UserId equals ac.UserId
                                     join r in _context.Roles
                                     on ac.RoleId equals r.RoleId
                                     where us.email == loginVM.Email
                                     select r).ToList();

                    var checkName = (from us in _context.Users
                                     join ac in _context.Accounts
                                     on us.UserId equals ac.UserId
                                     join r in _context.Roles
                                     on ac.RoleId equals r.RoleId
                                     where us.email == loginVM.Email
                                     select us).FirstOrDefault();
                    


                    var claims = new List<Claim>();
                    claims.Add(new Claim("Email", loginVM.Email));
                    claims.Add(new Claim("UserId", checkName.UserId.ToString()));
                    claims.Add(new Claim("Name", checkName.FirstName + " " + checkName.LastName));
                    foreach (var roles in checkRole)
                    {
                        claims.Add(new Claim("roles", roles.Name));
                    }

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                    var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                    var token = new JwtSecurityToken(
                        _configuration["Jwt:Issuer"],
                        _configuration["JwtConstants:Audience"],
                        claims,
                        expires: DateTime.UtcNow.AddMinutes(10),
                        signingCredentials: signIn
                        );

                    var idtoken = new JwtSecurityTokenHandler().WriteToken(token);
                    claims.Add(new Claim("Token Security", idtoken.ToString()));

                    Token = idtoken;
                    return 200;
                }
                Token = null;
                return 404;
            }
            Token = null;
            return 400;
        }

        public bool ValidateEmail(string Email)
        {
            var usr = _context.Users.FirstOrDefault(usr => usr.email == Email);

            return usr != null;
        }

        //FORGOT PASSWORD
        public string getOTP()
        {
            // generate random OTP
            var chars1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
            var stringChars1 = new char[6];
            var random1 = new Random();

            for (int i = 0; i < stringChars1.Length; i++)
            {
                stringChars1[i] = chars1[random1.Next(chars1.Length)];
            }

            var rand_str = new String(stringChars1);
            // end of generate random OTP
            return rand_str;
        }

        public void sendEmail(ForgotVM forgotVM, string otp)
        {
            var client = new SmtpClient("smtp.mailtrap.io", 2525)
            {
                Credentials = new NetworkCredential("c5de1dac4b3759", "4ab72482c1504e"),
                EnableSsl = true
            };
            //client.Send("from@example.com", loginVM.Email, "Kode OTP", "Kode OTP anda adalah : " + getOTP(loginVM));
            MailMessage message = new MailMessage("test666@gmail.com", forgotVM.Email);
            message.Subject = "Test OTP";
            message.Body = "Nomor OTP Anda Adalah : " + otp;
            message.IsBodyHtml = true;
            client.Send(message);
        }

        public int ForgotPassword(ForgotVM forgotVM)
        {
            if (!ValidateEmail(forgotVM.Email))
            {
                return -1;
            }
            else
            {
                string otp = getOTP();

                Account account = (from u in _context.Users
                                   join a in _context.Accounts
                                   on u.UserId equals a.UserId
                                   where u.email == forgotVM.Email
                                   select a).FirstOrDefault();

                account.IsActive = false;
                account.OTP = otp;
                account.ExpiredTime = DateTime.Now.AddMinutes(5);
                _context.Entry(account).State = EntityState.Modified;
                var result = _context.SaveChanges();
                sendEmail(forgotVM, otp);
                return result;
            }
        }



        //CHANGE PASSWORD
        public string GetRandomSalt()
        {
            return BCrypt.Net.BCrypt.GenerateSalt(12);
        }

        public int ChangePassword(ChangePasswordVM changePasswordVM)
        {
            var account = (from u in _context.Users
                           join a in _context.Accounts
                           on u.UserId equals a.UserId
                           where u.email == changePasswordVM.Email
                           select a).FirstOrDefault();

            var checkEmail = _context.Users.FirstOrDefault(u => u.email == changePasswordVM.Email);

            if (checkEmail == null)
            {
                return -1;
            }
            else if (account.IsActive)
            {
                return -2;
            }
            else if (DateTime.Now > account.ExpiredTime)
            {
                return -3;
            }
            else if (account.OTP != changePasswordVM.Otp)
            {
                return -4;
            }
            else
            {
                account.IsActive = true;
                account.Password = BCrypt.Net.BCrypt.HashPassword(changePasswordVM.New_Password, GetRandomSalt());

                _context.Entry(account).State = EntityState.Modified;
                var result = _context.SaveChanges();

                return result;
            }
        }
    }
}
