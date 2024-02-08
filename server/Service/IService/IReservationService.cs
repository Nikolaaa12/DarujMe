using Models;
using DTOs;
using Repository;

namespace Services.IServices
{
    public interface IReservationService
    {
        public ReservationRepository Repository { get; set; }
        Task<Reservation> CreateReservation(Reservation reservation);
        Task DeleteReservation(string reservationid);
    }
}
