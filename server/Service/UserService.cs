using backend.Services.IServices;
using Models;
using DTOs;
using Repository;
using Helpers;
using Context;
using BCrypt.Net;

namespace backend.Services
{
    public class UserService : IUserService
    {
        public UserRepository Repository { get; set; }
        private JwtService jwtService { get; set; }


        public UserService(MongoDbContext _db)
        {
            this.Repository = new UserRepository(_db);
            jwtService = new JwtService();
        }

        public async Task<User> Register(UserRegisterDTO user)
        {
            if (user != null)
            {
                var userFound = await this.Repository.GetUserByEmail(user.Email);
                if (userFound != null)
                {
                    throw new Exception("User with this email already exists.");
                }

                userFound = await this.Repository.GetUserByUsername(user.Username);
                if (userFound != null)
                {
                    throw new Exception("User with this username already exists.");
                }

                if (user.Password != user.RepeatedPassword)
                {
                    throw new Exception("Password missmatch");
                }
                var userCreated = new User
                (
                    user.Name,
                    user.Lastname,
                    user.Username,
                    user.Email,
                    BCrypt.Net.BCrypt.HashPassword(user.Password),
                    user.City,
                    user.Adress,
                    user.PhoneNumber
                );

                return await this.Repository.Create(userCreated);
            }
            else
            {
                return null;
            }
        }
        /*    public async Task<User> Downvote(int id){
                var result = await this.userRepository.GetUserById(id);
                var newresult=this.userRepository.DownVote(result);
                return newresult;
            }
            public async Task<User> Upvote(int id){
                var result = await this.userRepository.GetUserById(id);
                var newresult=this.userRepository.UpVote(result);
                return newresult;
            }
            public async Task<User> GiveAdmin(int id){
                var result = await this.userRepository.GetUserById(id);
                var newresult = this.userRepository.GiveAdmin(result);
                return newresult;
            }*/
        public async Task<string> Login(string email, string password)
        {
            var userFound = await this.Repository.GetUserByEmail(email);

            if (userFound == null) throw new Exception("User with that mail doesn't exist");

            if (!BCrypt.Net.BCrypt.Verify(password, userFound.Password)) throw new Exception("Wrong password!");

            var jwt = jwtService.Generate(userFound.Id);

            return jwt;
        }
        /*
                public async Task UpdateProfile(UserUpdateDTO user)
                {
                    if (user != null)
                    {
                        var userFound = await this.userRepository.GetUserById(user.Id);
                        userFound.Name = user.Name;
                        userFound.LastName = user.LastName;
                        userFound.City =user.City;
                        userFound.Description=user.Description;
                        userFound.PricePerHour=user.PricePerHour;
                        userFound.Adress=user.Adress;
                        userFound.PhoneNumber=user.PhoneNumber;
                        this.userRepository.Update(userFound);
                    }
                }
*/
                public async Task<User> GetUser(string jwt)
                {
                    var token = jwtService.Verify(jwt);

                    string? userId = token.Issuer;

                    var user = await this.Repository.GetUserById(userId);

                    return user;
                }
/*                public async Task<IQueryable<User>> GetUsersbytypeId(int Id)
                {

                    var users = await this.userRepository.GetUsersByType(Id);

                    return users;
                }

        */
        /* public async Task<IQueryable<User>> Search(string username, string ownerUsername)
         {
             if (username == null)
             {
                 throw new Exception("Type usernama for searching!");
             }

             if (ownerUsername == null)
             {
                 throw new Exception("Missing username who searching!");
             }

             var users = await this._unitOfWork.User.GetUsersByUsername(username, ownerUsername);
             return users;
         } */
    }
}
