using API.Repository.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseController<Entity, Repository, Key> : ControllerBase
        where Entity : class
        where Repository : IRepository<Entity, Key>
    {

        private readonly Repository repository;

        public BaseController(Repository repository)
        {
            this.repository = repository;
        }

        [HttpGet]
        public ActionResult<Entity> Get()
        {

            var hasil = repository.Get();

            if (hasil == null)
            {
                return StatusCode(400, new { status = HttpStatusCode.BadRequest, message = "DATA KOSONG" });
            }
            else
            {
                return Ok(hasil);
            }
        }

        [HttpPost]
        public ActionResult Post(Entity entity)
        {
            //try
            //{
                var result = repository.Insert(entity);
                if (result == 1)
                {
                    return StatusCode(200, new { status = HttpStatusCode.OK, message = "Insert Berhasil " });
                }
                else
                {
                    return StatusCode(400, new { status = HttpStatusCode.BadRequest, message = "Insert Gagal" });
                }
            //}
            //catch (Exception)
            //{
            //    return StatusCode(400, new { status = HttpStatusCode.BadRequest, message = "Insert Gagal" });
            //}
        }

        [HttpPut]
        public ActionResult Put(Entity entity)
        {
            try
            {
                var result = repository.Update(entity);

                if (result == 1)
                {
                    return StatusCode(200, new { status = HttpStatusCode.OK, message = "Update Berhasil " });
                }
                else
                {
                    return StatusCode(400, new { status = HttpStatusCode.BadRequest, message = "Update Gagal" });
                }
            }
            catch (Exception)
            {
                return StatusCode(400, new { status = HttpStatusCode.BadRequest, message = "Update Gagal" });
            }
        }

        [HttpDelete("{key}")]
        public ActionResult Delete(Key key)
        {
            try
            {
                if (key == null)
                {
                    return StatusCode(400, new { status = HttpStatusCode.BadRequest, message = "Delete Gagal" });
                }
                else
                {
                    repository.Delete(key);
                    return StatusCode(200, new { status = HttpStatusCode.OK, message = "Delete Berhasil" });
                }
            }
            catch (Exception)
            {
                return StatusCode(400, new { status = HttpStatusCode.BadRequest, message = "Delete Gagal " + "Id Tidak Ditemukan !" });
            }
        }


        [HttpGet("{key}")]
        public ActionResult Get(Key key)
        {
            try
            {
                if (repository.Get(key) == null)
                {
                    return StatusCode(400, new { status = HttpStatusCode.NotFound, message = "id Tidak Ditemukan !" });
                }
                else
                {
                    return Ok(repository.Get(key)); ;
                }
            }
            catch (Exception)
            {
                return StatusCode(400, new { status = HttpStatusCode.NotFound, message = "id Tidak Ditemukan !" });
            }

        }

    }
}
