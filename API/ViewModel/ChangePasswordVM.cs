using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.ViewModel
{
    public class ChangePasswordVM
    {
        public string Email { get; set; }

        public string Otp { get; set; }

        public string New_Password { get; set; }
    }
}
