using Models;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.IRepository
{
    public interface IReportRepository : IRepository<Report>
    {
        Task<IQueryable<Report>> GetAllReports();
        Task<Report> GetReportById(String? id);
        //Task<IQueryable<Report>> GetReportsByProductId(String? id);
        Task DeleteReport(String? Id);
        Task<Report> Create(Report report);
        Task<Report> UpdateReport(Report report);
    }
}
