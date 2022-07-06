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
    public class SectionController : BaseController<Section, SectionRepository, int>
    {
        private readonly SectionRepository _sectionRepository;
        public SectionController(SectionRepository sectionRepository) : base(sectionRepository)
        {
            this._sectionRepository = sectionRepository;
        }

        [HttpGet("GetSection")]
        public IEnumerable<GetAllSectionVM> GetAll()
        {
            return _sectionRepository.GetAll().ToList();
        }
    }

}
