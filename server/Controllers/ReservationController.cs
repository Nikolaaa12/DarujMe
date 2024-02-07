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
    [Route("api/Reservation")]
    public class ReservationController : ControllerBase
    {

        private IReservationService _service;

        public ReservationController(MongoDbContext _mongoDBContext)
        {
            this._service = new ReservationService(_mongoDBContext);
        }

        [HttpGet]
        [Route("GetReservationById")]
        public async Task<IActionResult> GetReservationById(String? id)
        {
            try
            {
                var a = await _service.Repository.GetReservationById(id);
                return Ok(a);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpGet]
        [Route("GetAllReservations")]
        public async Task<IActionResult> GetAllReservations()
        {
            var a = await _service.Repository.GetAllReservations();
            return Ok(a);
        }
        [HttpDelete]
        [Route("DeleteReservation")]
        public async Task<IActionResult> DeleteReservation(String? id)
        {
            try
            {
                await _service.Repository.DeleteReservation(id);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpPost]
        [Route("CreateReservation")]
        public async Task<IActionResult> CreateReservation([FromBody] Reservation reservation)
        {
            var a = await _service.Repository.Create(reservation);
            return Ok(a);
        }
        [HttpGet]
        [Route("GetReservationsByOwnerId")]
        public async Task<IActionResult> GetReservationsByOwnerId(String? id)
        {
            var a = await _service.Repository.GetReservationsByOwnerId(id);
            return Ok(a);
        }


    }
}