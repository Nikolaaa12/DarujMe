using Context;
using DTOs;
using Models;
using MongoDB.Bson;
using Repository.IRepository;

namespace Repository
{
    public class ReportRepository : Repository<Report>, IReportRepository
    {
        private MongoDbContext _db;
        public ReportRepository(MongoDbContext db) : base(db)
        {
            _db = db;
        }
        public async Task<IQueryable<Report>> GetAllReports()
        {
            var reports = await this.GetAll<Report>();
            return reports;
        }

        public async Task<Report> GetReportById(string? id)
        {
            var report = await this.GetOne<Report>(id);
            return report;
        }

        public async Task DeleteReport(string? Id)
        {
            await this.Delete<Report>(Id);
        }

        public async Task<Report> Create(Report report)
        {
            await this.Add<Report>(report);
            return report;
        }

        public async Task<Report> UpdateReport(Report report)
        {
            await this.Update<Report>(report.Id, report);
            return report;
        }
    }
}
