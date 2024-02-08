using Models;
using DTOs;
using Repository;

namespace Services.IServices
{
    public interface IReportService
    {
        public ReportRepository Repository { get; set; }
    }
}
