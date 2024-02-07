using Services.IServices;
using Models;
using DTOs;
using Repository;
using Helpers;
using Context;
using BCrypt.Net;

namespace Services
{
    public class ReservationService : IReservationService
    {
        public ReservationRepository Repository { get; set; }
    


        public ReservationService(MongoDbContext _db)
        {
            this.Repository = new ReservationRepository(_db);
        }
    }

}
