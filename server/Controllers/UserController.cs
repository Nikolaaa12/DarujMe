using System;
using Services;
using Models;
using Microsoft.AspNetCore.Mvc;

namespace Controllers
{

    [Controller]
    [Route("api/User")]
    public class UserController : ControllerBase
    {
        private readonly MongoDBService _mongoDBService;

        public UserController(MongoDBService _mongoDBService)
        {
            this._mongoDBService = _mongoDBService;
        }
        [HttpPost]
        [Route("CreateUser")]
        public async Task<IActionResult> CreateUser([FromBody] User user)
        {
            await _mongoDBService.CreateAsync(user);
            return Ok();
        }

    }
}