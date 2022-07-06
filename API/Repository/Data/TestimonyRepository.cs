using API.Contex;
using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Repository.Data
{
    public class TestimonyRepository : GeneralRepository<MyContex, Testimony, int>
    {
        private readonly MyContex _context;
        public TestimonyRepository(MyContex myContext) : base(myContext)
        {

        }

    }
}
