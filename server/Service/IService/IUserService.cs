using Models;
using DTOs;
using Repository;

namespace Services.IServices
{
    public interface IUserService
    {
        public UserRepository Repository { get; set; }
        Task<User> Register(UserRegisterDTO user, IFormFile profilePicture);
        Task<string> Login(string email, string password);
      //  Task UpdateProfile(UserUpdateDTO user);
        Task<User> GetUser(string jwt);
        Task<User> UpdateUser(UserUpdateDTO user, IFormFile profilePicture);
        Task DeleteUser(string id);
     //   Task<User> Downvote(int id);
      //  Task<User> GiveAdmin(int id);
      //  Task<User> Upvote(int id);
      //  Task<IQueryable<User>> GetUsersbytypeId(int Id);
    }
}
