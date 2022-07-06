using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class Transaction
    {
        [Key]
        public int TransactionId { get; set; }
        public int UserId { get; set; }
        public int CourseId { get; set; }
        public Status Status { get; set; }
        public DateTime Date { get; set; }
        public Byte[] Bukti_Pembayaran { get; set; }
        public User User { get; set; }
        public Course Course { get; set; }

    }

    public enum Status
    {
        Accept,
        Decline,
        Waiting
    } 
}
