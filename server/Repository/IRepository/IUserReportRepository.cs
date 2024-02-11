using Models;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.IRepository
{
    public interface IUserReportRepository : IRepository<UserReport>
    {
        Task<IQueryable<UserReport>> GetAllReports();
        Task<UserReport> GetReportById(String? id);
        //Task<IQueryable<Report>> GetReportsByProductId(String? id);
        Task DeleteReport(String? Id);
        Task<UserReport> Create(UserReport report);
        Task<UserReport> UpdateReport(UserReport report);
    }
}
