using API.Contex;
using API.Repository.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Repository
{
    public class GeneralRepository<Contex, Entity, Key> : IRepository<Entity, Key>
        where Entity : class
        where Contex : MyContex
    {

        private readonly MyContex myContext;
        private readonly DbSet<Entity> entities;
        public GeneralRepository(MyContex myContext)
        {
            this.myContext = myContext;
            entities = myContext.Set<Entity>();
        }


        public int Delete(Key key)
        {
            var entity = entities.Find(key);
            myContext.Remove(entity);
            return myContext.SaveChanges();
        }

        public IEnumerable<Entity> Get()
        {
            return entities.ToList();
        }

        public Entity Get(Key key)
        {
            return entities.Find(key);
        }

        public int Insert(Entity entity)
        {
            entities.Add(entity);
            var result = myContext.SaveChanges();
            return result;
        }

        public int Update(Entity entity)
        {
            myContext.Entry(entity).State = EntityState.Modified;
            var result = myContext.SaveChanges();
            return result;
        }
    }
}
