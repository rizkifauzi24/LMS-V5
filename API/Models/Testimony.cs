using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class Testimony
    {
        [Key]
        public int TId { get; set; }
        public int UserId { get; set; }
        public int CourseId { get; set; }
        public string Deskripsi { get; set; }
        

        public User user { get; set; }

        public Course course { get; set; }
    }
}
