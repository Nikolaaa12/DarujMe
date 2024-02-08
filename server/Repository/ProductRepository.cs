using Context;
using DTOs;
using Models;
using MongoDB.Bson;
using Repository.IRepository;

namespace Repository
{
    public class ProductRepository : Repository<Product>, IProductRepository
    {
        private MongoDbContext _db;
        public ProductRepository(MongoDbContext db) : base(db)
        {
            _db = db;
        }

        public async Task<IQueryable<Product>> GetAllProducts()
        {
             var products = await this.GetAll<Product>();
            return products;
        }

        public async Task<Product> GetProductById(string? id)
        {
             var product = await this.GetOne<Product>(id);
            return product;
        }

        public async Task<IQueryable<Product>> GetProductsByTypeId(string? id)
        {
            var product = await this.FindMore<Product>((products)=>products.ProductTypeId==id);
            return product; 
        }

        public async Task<IQueryable<Product>> GetProductsByOwnerId(string? id)
        {
            var product = await this.FindMore<Product>((products)=>products.OwnerId==id);
            return product;
        }

        public async Task DeleteProduct(string? Id)
        {
             await this.Delete<Product>(Id);
        }

        public async Task<Product> Create(Product product)
        {
           
            await this.Add<Product>(product);
            return product;
        }
        public async Task<Product> UpdateProduct(Product product)
        {
            await this.Update<Product>(product.Id, product);
            return product;
        }
    }
}
