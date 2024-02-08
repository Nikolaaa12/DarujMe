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
    [Route("api/Report")]
    public class ReportController : ControllerBase
    {

        private IReportService _service;

        public ReportController(MongoDbContext _mongoDBContext)
        {
            this._service = new ReportService(_mongoDBContext);
        }

        [HttpGet]
        [Route("GetReportById")]
        public async Task<IActionResult> GetReportById(String? id)
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
        [Route("GetAllReports")]
        public async Task<IActionResult> GetAllReports()
        {
            var a = await _service.Repository.GetAllReports();
            return Ok(a);
        }
        [HttpDelete]
        [Route("DeleteReport")]
        public async Task<IActionResult> DeleteReport(String? id)
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
        [Route("CreateReport")]
        public async Task<IActionResult> CreateReport(Report? report)
        {
            var a = await _service.Repository.Create(report);
            return Ok(a);
        }



    }
}