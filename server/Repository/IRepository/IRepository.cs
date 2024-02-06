using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Threading.Tasks;
 
namespace Repository.IRepository
{
    public interface IRepository<T> where T : class
    {
        Task<T> GetOne<T>(String? id);
        Task<IQueryable<T>> GetAll<T>();
        Task<T> Find<T>(Expression<Func<T, bool>> predicate);
        Task Add<T>(T obj);
        Task Delete<T>(String? id);
        Task Update<T>(String? id, T obj);
    }
}