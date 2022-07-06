using API.Contex;
using API.Models;
using API.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace API.Repository.Data
{
    public class TransactionRepository : GeneralRepository<MyContex, Transaction, int>
    {
        private readonly MyContex _context;

        public TransactionRepository(MyContex myContext) : base(myContext)
        {
            this._context = myContext;
        }
        
        public IEnumerable<GetAllTransactionVM> GetAll()
        {
            var getTransactionAll = (from tr in _context.Transactions
                                     join us in _context.Users on tr.UserId equals us.UserId
                                     join co in _context.Courses on tr.CourseId equals co.CourseId


                                     select new GetAllTransactionVM()
                                     {
                                         TransactionId = tr.TransactionId,
                                         User = String.Format("{0} {1}", us.FirstName, us.LastName),
                                         UserId = us.UserId,
                                         Course = co.Name,
                                         CourseId = co.CourseId,
                                         Status = tr.Status.ToString(),
                                         Date = tr.Date,
                                         Bukti_Pembayaran = tr.Bukti_Pembayaran

                                     }).ToList();

            return getTransactionAll;

        }
    }
}
