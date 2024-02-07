using Context;
using Models;
using MongoDB.Bson;
using Repository.IRepository;

namespace Repository
{
    public class ProductTypeRepository : Repository<ProductType>, IProductTypeRepository
    {
        private MongoDbContext _db;
        public ProductTypeRepository(MongoDbContext db) : base(db)
        {
            _db = db;
        }

        public async Task<IQueryable<ProductType>> GetAllTypes()
        {
            var user = await this.GetAll<ProductType>();
            return user;
        }

        public async Task DeleteType(String? Id)
        {
            await this.Delete<ProductType>(Id);
        }

        public async Task<ProductType> GetTypeById(String? id)
        {
            var user = await this.GetOne<ProductType>(id);
            return user;
        }
        public async Task<ProductType> Create(String? name)
        {
            ProductType type = new()
            {
                Name = name
            };
            await this.Add<ProductType>(type);
            return type;
        }
    }
}
