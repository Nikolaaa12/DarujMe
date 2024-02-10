using Context;
using DTOs;
using Models;
using MongoDB.Bson;
using Repository.IRepository;

namespace Repository
{
    public class ReservationRepository : Repository<Reservation>, IReservationRepository
    {
        private MongoDbContext _db;
        public ReservationRepository(MongoDbContext db) : base(db)
        {
            _db = db;
        }
        public async Task<IQueryable<Reservation>> GetAllReservations()
        {
             var reservations = await this.GetAll<Reservation>();
            return reservations;
        }

        public async Task<Reservation> GetReservationById(string? id)
        {
            var reservation = await this.GetOne<Reservation>(id);
            return reservation;
        }

        public async Task<IQueryable<Reservation>> GetReservationsByOwnerId(string? id)
        {
            var reservations = await this.FindMore<Reservation>((products)=>products.OwnerId==id);
            return reservations;
        }

        public async Task<IQueryable<Reservation>> GetReservationsByCustomerId(string? id)
        {
            var reservations = await this.FindMore<Reservation>((products)=>products.CustomerId==id);
            return reservations;
        }

        public async Task DeleteReservation(string? Id)
        {
             await this.Delete<Reservation>(Id);
        }

        public async Task<Reservation> Create(Reservation reservation)
        {
            await this.Add<Reservation>(reservation);
            return reservation;
        }
         public async Task<Reservation> GetReservationByProductId(string? id)
        {
            var reservation = await this.Find<Reservation>(a=>a.ProductId==id);
            return reservation;
        }
    }
}
