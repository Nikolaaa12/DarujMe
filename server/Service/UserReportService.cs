using Services.IServices;
using Models;
using DTOs;
using Repository;
using Helpers;
using Context;
using BCrypt.Net;

namespace Services
{
    public class UserReportService : IUserReportService
    {
        public UserReportRepository Repository { get; set; }
    


        public UserReportService(MongoDbContext _db)
        {
            this.Repository = new UserReportRepository(_db);
        }
    }

}
