using Models;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.IRepository
{
    public interface IUserRepository : IRepository<User>
    {
        Task<IQueryable<User>> GetAllUsers();
        Task<User> GetUserById(String? id);
        Task DeleteUser(String? Id);
        Task<User> GetUserByEmail(String? email);
        Task<User> GetUserByUsername(String? username);
        Task<User> UpdateUser(User user);
        Task<User> Create(User user);
    }
}
