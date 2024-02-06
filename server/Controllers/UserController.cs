using System;
using Context;
using Models;
using Repository;
using Microsoft.AspNetCore.Mvc;
using Repository.IRepository;
using MongoDB.Bson;

namespace Controllers
{

    [Controller]
    [Route("api/User")]
    public class UserController : ControllerBase
    {
        private readonly MongoDbContext _mongoDBContext;
        private IUserRepository _repository;

        public UserController(MongoDbContext _mongoDBContext,IUserRepository _repository)
        {
            this._mongoDBContext = _mongoDBContext;
            this._repository = _repository;
        }
        [HttpPost]
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
        }
        [HttpGet]
        [Route("GetUser")]
        public async Task<IActionResult> GetUser(String? id)
        {
            var a =await _repository.GetUserById(id);
            return Ok(a);
        }
        [HttpGet]
        [Route("GetAllUsers")]
        public async Task<IActionResult> GetAllUsers()
        {
            var a = await  _repository.GetAllUsers();
            return Ok(a);
        }

    }
}