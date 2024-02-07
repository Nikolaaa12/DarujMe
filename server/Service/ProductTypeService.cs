using Services.IServices;
using Models;
using DTOs;
using Repository;
using Helpers;
using Context;
using BCrypt.Net;

namespace Services
{
    public class ProductTypeService : IProductTypeService
    {
        public ProductTypeRepository Repository { get; set; }
    


        public ProductTypeService(MongoDbContext _db)
        {
            this.Repository = new ProductTypeRepository(_db);
        }
    }

}
