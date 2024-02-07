using Services.IServices;
using Models;
using DTOs;
using Repository;
using Helpers;
using Context;
using BCrypt.Net;

namespace Services
{
    public class ProductService : IProductService
    {
        public ProductRepository Repository { get; set; }
        public ProductTypeService TypeService { get; set; }
        public UserService userService{ get; set; }
    


        public ProductService(MongoDbContext _db)
        {
            this.Repository = new ProductRepository(_db);
            this.TypeService = new ProductTypeService(_db);
            this.userService = new UserService(_db);
        }
        public async Task<Product> CreateProduct(CreateProductDTO product)
        {
            Product product1 = new Product(product.Name,product.Description,product.ProfilePicture,product.ProductTypeId,product.OwnerId);
            var type = await TypeService.Repository.GetTypeById(product.ProductTypeId);
            var owner = await userService.Repository.GetUserById(product.OwnerId);
            product1.Owner=owner;
            product1.TypeofProduct=type;
            var pro = await this.Repository.Create(product1);
            return pro;
        }
    }

}
