using API.Contex;
using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Repository.Data
{
    public class TopicRepository : GeneralRepository<MyContex, Topic, int>
    {

        private readonly MyContex _context;
        public TopicRepository(MyContex myContext) : base(myContext)
        {

        }
    }
}
