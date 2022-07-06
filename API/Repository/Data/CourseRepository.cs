using API.Contex;
using API.Models;
using API.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Repository.Data
{
    public class CourseRepository : GeneralRepository<MyContex, Course, int>
    {
        private readonly MyContex _context;
        public CourseRepository(MyContex myContext) : base(myContext)
        {
            this._context = myContext;
        }

        public IEnumerable<GetAllCourseVM> GetAll()
        {
            var getCourseAll = (from co in _context.Courses
                                   //join a in myContext.Accounts on e.NIK equals a.NIK
                               join to in _context.Topics on co.TopicId equals to.TopicId


                               select new GetAllCourseVM()
                               {
                                   CourseId = co.CourseId,
                                   Topic = to.Name,
                                   Name = co.Name,
                                   Description = co.Description,
                                   Price = co.Price,
                               }).ToList();

            return getCourseAll;

        }
    }
}
