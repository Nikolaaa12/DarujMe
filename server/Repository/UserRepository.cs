using Context;
using Models;
using MongoDB.Bson;
using Repository.IRepository;

namespace Repository
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        private MongoDbContext _db;
        public UserRepository(MongoDbContext db) : base(db)
        {
            _db = db;
        }

        public async Task<IQueryable<User>> GetAllUsers()
        {
            var user = await this.GetAll<User>();
            return user;
        }

        public async Task DeleteUser(String? Id)
        {
            await this.Delete<User>(Id);
        }
        public async Task<User> UpdateUser(User user)
        {
            await this.Update<User>(user.Id, user);
            return user;
        }

        public async Task<User> GetUserById(String? id)
        {
            var user = await this.GetOne<User>(id);
            return user;
        }
        public async Task<User> GetUserByEmail(String? email)
        {
            return await this.Find<User>((a)=>a.Email==email);
        }
        public async Task<User> GetUserByUsername(String? username)
        {
            return await this.Find<User>((a)=>a.Username==username);
            
        }

        public async Task<User> Create(User user)
        {
            await this.Add<User>(user);
            return user;
        }
    }
}
