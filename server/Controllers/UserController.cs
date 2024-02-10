using System;
using Context;
using Models;
using Repository;
using Microsoft.AspNetCore.Mvc;
using Repository.IRepository;
using MongoDB.Bson;
using DTOs;
using Services.IServices;
using Services;
namespace Controllers
{

    [Controller]
    [Route("api/User")]
    public class UserController : ControllerBase
    {

        private IUserService _service;

        public UserController(MongoDbContext _mongoDBContext)
        {
            this._service=new UserService(_mongoDBContext);
        }
   /*     [HttpPost]
        [Route("CreateUser")]
        public async Task<IActionResult> CreateUser([FromBody] User user)
        {
            await _repository.Create(user);
            return Ok();
        }
        [HttpPut]
        [Route("EditUser")]
        public async Task<IActionResult> EditUser([FromBody] User user)
        {
           await _repository.UpdateUser(user);
            return Ok();
        }
        [HttpDelete]
        [Route("DeleteUser")]
        public async Task<IActionResult> DeleteUser( String? Id)
        {
            await _repository.DeleteUser(Id);
            return Ok();
        }*/
        [HttpGet]
        [Route("GetUserById")]
        public async Task<IActionResult> GetUserById(String? id)
        {
            try
            {
            var a =await _service.Repository.GetUserById(id);
            return Ok(a);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }/*
        [HttpGet]
        [Route("GetAllUsers")]
        public async Task<IActionResult> GetAllUsers()
        {
            var a = await  _repository.GetAllUsers();
            return Ok(a);
        }*/
         [Route("Register")]
        [HttpPost]
        public async Task<IActionResult> Register([FromForm] UserRegisterDTO user, [FromForm] IFormFile profilePicture)
        {
            try
            {
                var result = await this._service.Register(user, profilePicture);
                return Created("success", result);
            } 
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("Login")]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] UserLoginDTO user)
        {
            try
            {
                var result = await this._service.Login(user.Email, user.Password);

                Response.Cookies.Append("jwt", result, new CookieOptions { HttpOnly = true, Secure = true, SameSite = SameSiteMode.None });

                return Ok(new { message = "success" });
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("GetUser")]
        [HttpGet]
        public async Task<IActionResult> GetUser()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];

                var user = await this._service.GetUser(jwt);

                return Ok(user);
            }
            catch (Exception e)
            {
                return Unauthorized();
            }
        }
        [Route("EditUser")]
        [HttpPut]
        public async Task<IActionResult> EditUser([FromBody] UserUpdateDTO us)
        {
            try
            {
                var user = await this._service.UpdateUser(us);

                return Ok(user);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("Logout")]
        [HttpPost]
        public async Task<IActionResult> Logout()
        {
            Response.Cookies.Delete("jwt", new CookieOptions { SameSite = SameSiteMode.None, Secure = true });

            return Ok(new { message = "success" });
        }

    }
}