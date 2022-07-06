using API.Contex;
using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Repository.Data
{
    public class RoleRepository : GeneralRepository<MyContex, Role, int>
    {
        private readonly MyContex _context;

        public RoleRepository(MyContex myContext) : base(myContext)
        {
            
        }
    }
}
