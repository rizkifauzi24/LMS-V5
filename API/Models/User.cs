using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Gender Gender { get; set; }
        public DateTime Birthdate { get; set; }
        public string Phone { get; set; }
        public string email { get; set; }
        public bool IsDelete { get; set; }

        public Account Account { get; set; }
        public ICollection<Transaction> Transactions { get; set; }
        public ICollection<Testimony> Testimony{ get; set; }


    }

    public enum Gender
    {
        Male,
        Female
    }
}
