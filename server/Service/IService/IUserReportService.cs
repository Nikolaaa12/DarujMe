using Models;
using DTOs;
using Repository;

namespace Services.IServices
{
    public interface IUserReportService
    {
        public UserReportRepository Repository { get; set; }
    }
}
