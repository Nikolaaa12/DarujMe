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
    [Route("api/UserReport")]
    public class UserReportController : ControllerBase
    {

        private IUserReportService _service;

        public UserReportController(MongoDbContext _mongoDBContext)
        {
            this._service = new UserReportService(_mongoDBContext);
        }

        [HttpGet]
        [Route("GetUserReportById")]
        public async Task<IActionResult> GetUserReportById(String? id)
        {
            try
            {
                var a = await _service.Repository.GetReportById(id);
                return Ok(a);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpGet]
        [Route("GetAllUserReports")]
        public async Task<IActionResult> GetAllUserReports()
        {
            var a = await _service.Repository.GetAllReports();
            return Ok(a);
        }
        [HttpDelete]
        [Route("DeleteUserReport")]
        public async Task<IActionResult> DeleteUserReport(String? id)
        {
            try
            {
                await _service.Repository.DeleteReport(id);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpPost]
        [Route("CreateUserReport")]
        public async Task<IActionResult> CreateUserReport([FromBody]UserReport? report)
        {
            var a = await _service.Repository.Create(report);
            return Ok(a);
        }
    }
}