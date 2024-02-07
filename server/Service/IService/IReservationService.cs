using Models;
using DTOs;
using Repository;

namespace Services.IServices
{
    public interface IReservationService
    {
        public ReservationRepository Repository { get; set; }
    }
}
