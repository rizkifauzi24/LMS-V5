using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class Topic
    {
        [Key]
        public int TopicId { get; set; }
        public string Name { get; set; }

        public ICollection<Course> Courses { get; set; }
    }
}
