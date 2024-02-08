using Models;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.IRepository
{
    public interface IProductRepository : IRepository<Product>
    {
        Task<IQueryable<Product>> GetAllProducts();
        Task<Product> GetProductById(String? id);
        Task<IQueryable<Product>> GetProductsByTypeId(String? id);
        Task<IQueryable<Product>> GetProductsByOwnerId(String? id);
        Task DeleteProduct(String? Id);
        Task<Product> Create(Product product);
        Task<Product> UpdateProduct(Product product);
    }
}
