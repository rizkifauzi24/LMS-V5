using API.Contex;
using API.Models;
using API.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Repository.Data
{
    public class UserRepository : GeneralRepository<MyContex, User, int>
    {
        private readonly MyContex _context;
        public UserRepository(MyContex myContext) : base(myContext)
        {
            this._context = myContext;
        }


        public int Insert(RegistUserVM  registUserVM)
        {
            User user = new User();
            Account account = new Account();



            //User
            user.FirstName = registUserVM.FirstName;
            user.LastName = registUserVM.LastName;
            user.email = registUserVM.email;
            user.Phone = registUserVM.Phone;
            user.Birthdate = registUserVM.Birthdate;
            user.Gender = (Gender)Enum.Parse(typeof(Gender), registUserVM.Gender);

            //Account
            account.Password = HashPassword(registUserVM.password);
            account.RoleId = 1;


            user.Account = account;


            _context.Users.Add(user);
            var result = _context.SaveChanges();
            return result;
   


        }



        public IEnumerable<RegistGetAllVM> GetAll()
        {
            List<RegistGetAllVM> registGetAllVMs = new List<RegistGetAllVM>();
            var User = (from user in _context.Users
                        select user).ToList();

            foreach(var us in User)
            {
                var data = (from acc in _context.Accounts
                            join r in _context.Roles
                            on acc.RoleId equals r.RoleId
                            where us.UserId == acc.UserId
                            select r).FirstOrDefault();

                RegistGetAllVM registGetAllVM = new RegistGetAllVM
                {
                    UserId = us.UserId,
                    FirstName = us.FirstName,
                    LastName = us.LastName,
                    Phone = us.Phone,
                    email = us.email,
                    Birthdate = us.Birthdate,
                    Gender = Enum.GetName(typeof(Gender), us.Gender),
                    roleName = data.Name,
                    isDelete = us.IsDelete
                };

                registGetAllVMs.Add(registGetAllVM);

            }


            return registGetAllVMs;
    
        }




        public bool CheckEmail(string email)
        {
            User user = _context.Users.FirstOrDefault(user => user.email == email);
            return user != null;
        }


        public bool CheckPhone(string phone)
        {
            User user = _context.Users.FirstOrDefault(user => user.Phone == phone);
            return user != null;
        }




        public string GetRandomSalt()
        {
            return BCrypt.Net.BCrypt.GenerateSalt(12);
        }
        public string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password, GetRandomSalt());
        }
        public bool CheckPassword(string password, string correctHash)
        {

            return BCrypt.Net.BCrypt.Verify(password, correctHash);
        }

    }
}
