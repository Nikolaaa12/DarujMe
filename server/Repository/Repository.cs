using Repository.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Linq.Expressions;
using System.Text;
using Context;
using System.Threading.Tasks;

namespace Repository
{
    public class Repository<T> : IRepository<T> where T : class
    {
        protected readonly MongoDbContext _context;
        public Repository(MongoDbContext context)
        {
            this._context = context;
        }



        public async Task<T> GetOne<T>(String? id)
        {
             var filter = Builders<T>.Filter.Eq("_id", ObjectId.Parse(id));
            var result = await _context._database.GetCollection<T>(typeof(T).Name).Find(filter).FirstOrDefaultAsync();

            if (result == null)
            {
                throw new Exception($"Object with ID '{id}' does not exist.");
            }

            return result;
        }

        public async Task<IQueryable<T>> GetAll<T>()
        {
            var collection = _context._database.GetCollection<T>(typeof(T).Name);
            var result = await collection.FindAsync(new BsonDocument());
            return result.ToList().AsQueryable();
        }

        public IQueryable<T> Find<T>(Expression<Func<T, bool>> predicate)
        {
            var collection = _context._database.GetCollection<T>(typeof(T).Name);
            return collection.Find(predicate).ToEnumerable().AsQueryable();
        }

        public async Task Add<T>(T obj)
        {
            var collection = _context._database.GetCollection<T>(typeof(T).Name);
            await collection.InsertOneAsync(obj);
        }

        public async Task Delete<T>(String? id)
        {
            var collection = _context._database.GetCollection<T>(typeof(T).Name);
            var filter = Builders<T>.Filter.Eq("_id", ObjectId.Parse(id));
            await collection.DeleteOneAsync(filter);
        }


        public async Task Update<T>(String? id, T obj)
        {
            var collection = _context._database.GetCollection<T>(typeof(T).Name);
            var filter = Builders<T>.Filter.Eq("_id", ObjectId.Parse(id));
            await collection.ReplaceOneAsync(filter, obj);
        }


    }
}