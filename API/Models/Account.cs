using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class Account
    {
        [Key]
        public int UserId  { get; set; }
        public int RoleId { get; set; }
        public string Password { get; set; }
        public DateTime ExpiredTime { get; set; }
        public bool IsActive { get; set; }
        public string OTP { get; set; }
        public Role Role { get; set; }
        public User User { get; set; }


    }
}
