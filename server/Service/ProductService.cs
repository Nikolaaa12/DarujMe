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



        public ProductService(MongoDbContext _db)
        {
            this.Repository = new ProductRepository(_db);
            this.TypeService = new ProductTypeService(_db);
        }
        public async Task<Product> CreateProduct(CreateProductDTO product, IFormFile profilePicture)
        {
            Product product1 = new Product(product.Name, product.Description, product.ProfilePicture, product.ProductTypeId, product.OwnerId);
            var type = await TypeService.Repository.GetTypeById(product.ProductTypeId);
            product1.TypeofProduct = type;

            if (profilePicture != null)
            {
                MemoryStream memoryStream = new MemoryStream();
                profilePicture.OpenReadStream().CopyTo(memoryStream);
                product1.ProfilePicture = Convert.ToBase64String(memoryStream.ToArray());
            }

            var pro = await this.Repository.Create(product1);
            return pro;
        }

        public async Task<Product> ChangeState(ChangeStateDTO productDTO)
        {
            if (productDTO != null)
            {
                var productFound = await this.Repository.GetProductById(productDTO.Id);
                if (productFound != null)
                {
                    productFound.isSent = true;
                    return await this.Repository.UpdateProduct(productFound);
                }
                else
                {
                    throw new Exception("Product with this id doesn't exist");
                }
            }
            else
            {
                throw new Exception("Invalid product data provided");
            }
        }
    }

}
