using Models;
using DTOs;
using Repository;

namespace Services.IServices
{
    public interface IProductService
    {
        public ProductRepository Repository { get; set; }
        Task<Product> CreateProduct(CreateProductDTO product, IFormFile profilePicture);

        Task<Product> ChangeState(ChangeStateDTO cs);
    }
}
