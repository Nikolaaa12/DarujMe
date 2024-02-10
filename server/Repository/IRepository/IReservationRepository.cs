using Models;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.IRepository
{
    public interface IReservationRepository : IRepository<Reservation>
    {
        Task<IQueryable<Reservation>> GetAllReservations();
        Task<Reservation> GetReservationById(String? id);
        Task<IQueryable<Reservation>> GetReservationsByOwnerId(String? id);

        Task<IQueryable<Reservation>> GetReservationsByCustomerId(String? id);
        Task DeleteReservation(String? Id);
        Task<Reservation> Create(Reservation reservation);
    }
}
