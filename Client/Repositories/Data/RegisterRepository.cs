using API.Models;
using API.ViewModel;
using Client.Base;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Client.Repositories.Data
{
    public class RegisterRepository : GeneralRepository<User, int>
    {
        private readonly Address address;
        private readonly HttpClient httpClient;
        private readonly string request;
        private readonly IHttpContextAccessor _contextAccessor;

        //string request => di isi disesuaikan dengan controller API kalian
        public RegisterRepository(Address address, string request = "User/") : base(address, request)
        {
            this.address = address;
            this.request = request;
            _contextAccessor = new HttpContextAccessor();
            httpClient = new HttpClient
            {
                BaseAddress = new Uri(address.link)
            };         
        }

        public async Task<object> Registered(RegistUserVM registUserVM)
        {
            object entities;

            StringContent content = new StringContent(JsonConvert.SerializeObject(registUserVM), Encoding.UTF8, "application/json");
            var result = httpClient.PostAsync(request + "Register/", content).Result;
            string apiResponse = await result.Content.ReadAsStringAsync();
            entities = JsonConvert.DeserializeObject(apiResponse);

            return entities;
        }
    }
}
