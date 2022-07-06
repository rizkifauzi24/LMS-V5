using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Client.Models
{
    public class JWTokenVM
    {
        public int Status { get; set; }
        public string Token { get; set; }
        public string Message { get; set; }
        //public string Name { get; set; }
    }
}
