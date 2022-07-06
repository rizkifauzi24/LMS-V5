using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using API.Repository.Data;
using API.ViewModel;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : BaseController<Transaction, TransactionRepository, int>
    {
        private readonly TransactionRepository _transactionRepository;
        public TransactionController(TransactionRepository transactionRepository) : base(transactionRepository)
        {
            this._transactionRepository = transactionRepository;
        }

        [HttpGet("GetTransaction")]
        public IEnumerable<GetAllTransactionVM> GetAll()
        {
            return _transactionRepository.GetAll().ToList();
        }
    }
}