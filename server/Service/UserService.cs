using Services.IServices;
using Models;
using DTOs;
using Repository;
using Helpers;
using Context;
using BCrypt.Net;
using Services;
using System.IO;

namespace Services
{
    public class UserService : IUserService
    {
        public UserRepository Repository { get; set; }
        public IProductService productService { get; set; }
        public IReservationService reservationService { get; set; }
        private JwtService jwtService { get; set; }


        public UserService(MongoDbContext _db)
        {
            this.Repository = new UserRepository(_db);
            this.productService = new ProductService(_db);
            this.reservationService = new ReservationService(_db);
            jwtService = new JwtService();
        }

        public async Task<User> Register(UserRegisterDTO user, IFormFile profilePicture)
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

                if (profilePicture != null)
                {
                    MemoryStream memoryStream = new MemoryStream();
                    profilePicture.OpenReadStream().CopyTo(memoryStream);
                    userCreated.ProfilePicture = Convert.ToBase64String(memoryStream.ToArray());
                }

                

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
        
        public async Task<User> UpdateUser(UserUpdateDTO user, IFormFile profilePicture)
        {
            if (user != null)
            {
                var userFound = await this.Repository.GetUserById(user.Id);

                if(userFound.ProfilePicture != null)
                {
                    if (profilePicture != null)
                    {
                        MemoryStream memoryStream = new MemoryStream();
                        profilePicture.OpenReadStream().CopyTo(memoryStream);
                        userFound.ProfilePicture = Convert.ToBase64String(memoryStream.ToArray());
                    }
                    else
                    {
                        userFound.ProfilePicture = "";
                    }
                }
                else
                {
                    if (profilePicture != null)
                    {
                        MemoryStream memoryStream = new MemoryStream();
                        profilePicture.OpenReadStream().CopyTo(memoryStream);
                        userFound.ProfilePicture = Convert.ToBase64String(memoryStream.ToArray());
                    }
                }
                userFound.Name = user.Name;
                userFound.Lastname = user.LastName;
                userFound.City =user.City;
                userFound.Adress=user.Adress;
                userFound.PhoneNumber=user.PhoneNumber;
                return await this.Repository.UpdateUser(userFound);
            }
            else
            {
                throw new Exception("User With that Id doesnt exist");
            }
        }

        public async Task<User> GetUser(string jwt)
        {
            var token = jwtService.Verify(jwt);

            string? userId = token.Issuer;

            var user = await this.Repository.GetUserById(userId);

            return user;
        }

        public async Task DeleteUser(string id)
        {
            var user = await this.Repository.GetUserById(id);
            if(user != null)
            {
                var reservation = await this.reservationService.Repository.GetReservationsByOwnerId(user.Id);

                if(reservation != null)
                {
                    foreach(var res in reservation)
                    {
                        await this.reservationService.DeleteReservation(res.Id);
                    }
                }

                var products = await this.productService.Repository.GetProductsByOwnerId(user.Id);

                if(products != null)
                {
                    foreach(var pro  in products)
                    {
                        await this.productService.Repository.DeleteProduct(pro.Id);
                    }
                }

                await this.Repository.DeleteUser(id);

            }
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
