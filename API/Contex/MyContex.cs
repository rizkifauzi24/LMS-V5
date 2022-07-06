using API.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Contex
{
    public class MyContex : DbContext
    {
        public MyContex(DbContextOptions<MyContex> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {


            //User  >> Account
            modelBuilder.Entity<User>()
                 .HasOne(ac => ac.Account)
                 .WithOne(u => u.User)
                 .HasForeignKey<Account>(u => u.UserId);

            // Account  >> Role
            modelBuilder.Entity<Account>()
               .HasOne(r => r.Role)
               .WithMany(ac => ac.Accounts);
         

            // Course >> Topic
            modelBuilder.Entity<Course>()
                .HasOne(t => t.Topic)
                .WithMany(c => c.Courses);
         

            //Section >> Course
            modelBuilder.Entity<Course>()
               .HasMany(s => s.Sections)
               .WithOne(c => c.Course);
           

            //User  >> Transaction
            modelBuilder.Entity<Transaction>()
                .HasOne(u => u.User)
                .WithMany(tr => tr.Transactions);

            // Course >> Transaction
            modelBuilder.Entity<Transaction>()
                .HasOne(c => c.Course)
                .WithMany(tr => tr.Transactions);

            // Testimoni >> User
            modelBuilder.Entity<Testimony>()
                 .HasOne(us => us.user)
                 .WithMany(ts => ts.Testimony);

            //Testimoni >> Course
            modelBuilder.Entity<Testimony>()
                 .HasOne(c => c.course)
                 .WithMany(ts => ts.Testimony);
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Section> Sections { get; set; }
        public DbSet<Topic> Topics { get; set; }
        public DbSet<Transaction> Transactions { get; set; }


    }
}
