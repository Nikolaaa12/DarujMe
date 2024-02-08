using Services.IServices;
using Models;
using DTOs;
using Repository;
using Helpers;
using Context;
using BCrypt.Net;

namespace Services
{
    public class ReportService : IReportService
    {
        public ReportRepository Repository { get; set; }
    


        public ReportService(MongoDbContext _db)
        {
            this.Repository = new ReportRepository(_db);
        }
    }

}
