using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class Course
    {
        [Key]
        public int CourseId { get; set; }
        public int TopicId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Price { get; set; }
        public Topic Topic { get; set; }
        public ICollection<Transaction> Transactions { get; set; }
        public ICollection<Section> Sections { get; set; }
        public ICollection<Testimony> Testimony { get; set; }

    }
}
