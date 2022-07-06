using API.Models;
using API.Repository.Data;
using API.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : BaseController<Course, CourseRepository, int>
    {
        private readonly CourseRepository _courseRepository;
        public CourseController(CourseRepository courseRepository) : base(courseRepository)
        {
            this._courseRepository = courseRepository;
        }

        [HttpGet("GetCourse")]
        public IEnumerable<GetAllCourseVM> GetAll()
        {
            return _courseRepository.GetAll().ToList();
        }
    }
}
