using API.Contex;
using API.Models;
using API.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Repository.Data
{
    public class SectionRepository :  GeneralRepository<MyContex, Section, int>
    {
        private readonly MyContex _context;
        public SectionRepository(MyContex myContext) : base(myContext)
        {
            this._context = myContext;
        }

        public IEnumerable<GetAllSectionVM> GetAll()
        {
            var getSectionAll = (from co in _context.Sections
                                    //join a in myContext.Accounts on e.NIK equals a.NIK
                                join to in _context.Courses on co.CourseId equals to.CourseId


                                select new GetAllSectionVM()
                                {
                                    SectionId = co.SectionId,
                                    Course = to.Name,
                                    Name = co.Name,
                                    Description = co.Description,
                                    Link = co.Link,
                                }).ToList();

            return getSectionAll;

        }
    }
}
