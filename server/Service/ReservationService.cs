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
        public ProductService productService { get; set; }
    


        public ReservationService(MongoDbContext _db)
        {
            this.Repository = new ReservationRepository(_db);
            this.productService = new ProductService(_db);
        }

        public async Task<Reservation> CreateReservation(Reservation reservation)
        {
            var product = await productService.Repository.GetProductById(reservation.ProductId);
            product.Available=false;
            var pro = await productService.Repository.UpdateProduct(product);
            var res = await this.Repository.Create(reservation);
            return res;
        }
         public async Task DeleteReservation(string reservationid)
        {
            var reservation = await this.Repository.GetReservationById(reservationid);
            var product = await productService.Repository.GetProductById(reservation.ProductId);
            product.Available=true;
            var pro = await productService.Repository.UpdateProduct(product);
            await this.Repository.DeleteReservation(reservationid);
        }
    }

}
