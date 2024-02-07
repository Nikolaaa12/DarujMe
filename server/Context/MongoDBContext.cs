using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using Models;

namespace Context
{
    public class MongoDbContext
    {
        public readonly IMongoDatabase _database;

        public MongoDbContext(IConfiguration configuration)
        {
            var connectionUri = configuration.GetValue<string>("MongoDB:ConnectionURI");
            var databaseName = configuration.GetValue<string>("MongoDB:Database");
            var client = new MongoClient(connectionUri);
            _database = client.GetDatabase(databaseName);
        }

        public IMongoCollection<User> Users => _database.GetCollection<User>("User");
        public IMongoCollection<User> ProductTypes => _database.GetCollection<User>("ProductType");
        public IMongoCollection<Product> Products => _database.GetCollection<Product>("Product");
        public IMongoCollection<Reservation> Reservations => _database.GetCollection<Reservation>("Reservations");

        public async Task CreateAsync(User user)
        {
            await Users.InsertOneAsync(user);
            return;
        }
    }
}
