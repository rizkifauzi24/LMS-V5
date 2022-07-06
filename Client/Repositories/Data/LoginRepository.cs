using API.Models;
using API.ViewModel;
using Client.Base;
using Client.Models;
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
    public class LoginRepository : GeneralRepository<Account, string>
    {
        private readonly Address address;
        private readonly HttpClient httpClient;
        private readonly string request;
        private readonly IHttpContextAccessor _contextAccessor;

        //string request => di isi disesuaikan dengan controller API kalian
        public LoginRepository(Address address, string request = "Account/") : base(address, request)
        {
            this.address = address;
            this.request = request;
            _contextAccessor = new HttpContextAccessor();
            httpClient = new HttpClient
            {
                BaseAddress = new Uri(address.link)
            };
            //httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("bearer", _contextAccessor.HttpContext.Session.GetString("JWToken"));
        }

        public async Task<JWTokenVM> Auth(LoginVM loginVM)
        {
            JWTokenVM token = null;

            StringContent content = new StringContent(JsonConvert.SerializeObject(loginVM), Encoding.UTF8, "application/json");
            var result = await httpClient.PostAsync(request + "Login", content);

            string apiResponse = await result.Content.ReadAsStringAsync();
            token = JsonConvert.DeserializeObject<JWTokenVM>(apiResponse);

            return token;
        }
        public async Task<object> Forgot(ForgotVM forgotVM)
        {
            object entities;

            StringContent content = new StringContent(JsonConvert.SerializeObject(forgotVM), Encoding.UTF8, "application/json");
            var result = httpClient.PostAsync(request + "Forgot/", content).Result;
            string apiResponse = await result.Content.ReadAsStringAsync();
            entities = JsonConvert.DeserializeObject(apiResponse);

            return entities;
        }

        public async Task<object> ChangePassword(ChangePasswordVM changePasswordVM)
        {
            object entities;

            StringContent content = new StringContent(JsonConvert.SerializeObject(changePasswordVM), Encoding.UTF8, "application/json");
            var result = httpClient.PostAsync(request + "ChangePassword/", content).Result;
            string apiResponse = await result.Content.ReadAsStringAsync();
            entities = JsonConvert.DeserializeObject(apiResponse);

            return entities;
        }
    }
}
