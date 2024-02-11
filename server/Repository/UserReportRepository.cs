using Context;
using DTOs;
using Models;
using MongoDB.Bson;
using Repository.IRepository;

namespace Repository
{
    public class UserReportRepository : Repository<UserReport>, IUserReportRepository
    {
        private MongoDbContext _db;
        public UserReportRepository(MongoDbContext db) : base(db)
        {
            _db = db;
        }
        public async Task<IQueryable<UserReport>> GetAllReports()
        {
            var reports = await this.GetAll<UserReport>();
            return reports;
        }

        public async Task<UserReport> GetReportById(string? id)
        {
            var report = await this.GetOne<UserReport>(id);
            return report;
        }

        public async Task DeleteReport(string? Id)
        {
            await this.Delete<UserReport>(Id);
        }

        public async Task<UserReport> Create(UserReport report)
        {
            await this.Add<UserReport>(report);
            return report;
        }

        public async Task<UserReport> UpdateReport(UserReport report)
        {
            await this.Update<UserReport>(report.Id, report);
            return report;
        }
    }
}
