using Models;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.IRepository
{
    public interface IProductTypeRepository : IRepository<ProductType>
    {
        Task<IQueryable<ProductType>> GetAllTypes();
        Task<ProductType> GetTypeById(String? id);
        Task DeleteType(String? Id);
        Task<ProductType> Create(String name);
    }
}
