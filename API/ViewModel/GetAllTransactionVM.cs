using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.ViewModel
{
    public class GetAllTransactionVM
    {
        public int TransactionId { get; set; }
        public string User { get; set; }
        public int UserId { get; set; }
        public string Course { get; set; }
        public int CourseId { get; set; }
        public string Status { get; set; }
        public DateTime Date { get; set; }
        public Byte[] Bukti_Pembayaran { get; set; }
    }
}
