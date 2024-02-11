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
using Microsoft.AspNetCore.Authorization;
namespace Controllers
{

    [Controller]
    [Route("api/Product")]
    public class ProductController : ControllerBase
    {

        private IProductService _service;
        private IReservationService _reservationService;

        public ProductController(MongoDbContext _mongoDBContext)
        {
            this._service = new ProductService(_mongoDBContext);
            this._reservationService=new ReservationService(_mongoDBContext);
        }

        [HttpGet]
        [Route("GetProductById")]
        public async Task<IActionResult> GetProductById(String? id)
        {
            try
            {
                var a = await _service.Repository.GetProductById(id);
                return Ok(a);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpGet]
        [Route("GetAllProducts")]
        public async Task<IActionResult> GetAllProductType()
        {
            var a = await _service.Repository.GetAllProducts();
            return Ok(a);
        }
        [HttpDelete]
        [Route("DeleteProduct")]
        public async Task<IActionResult> DeleteProduct(String? id)
        {
            try
            {
                var reservation = await _reservationService.Repository.GetReservationByProductId(id);
                await _service.Repository.DeleteProduct(id);
                if(reservation != null)
                {
                    await _reservationService.Repository.DeleteReservation(reservation.Id);
                }
                
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpPost]
        [Route("CreateProduct")]
        public async Task<IActionResult> CreateProduct([FromForm] CreateProductDTO product, [FromForm] IFormFile profilePicture)
        {
            try
            {
                var a = await _service.CreateProduct(product, profilePicture);
                return Ok(a);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpGet]
        [Route("GetProductsByOwnerId")]
        public async Task<IActionResult> GetProductsByOwnerId(String? id)
        {
            var a = await _service.Repository.GetProductsByOwnerId(id);
            return Ok(a);
        }

        [HttpPut]
        [Route("ChangeState")]
        public async Task<IActionResult> ChangeState([FromBody] ChangeStateDTO cs){
            try
            {
                var product = await this._service.ChangeState(cs);

                return Ok(product);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}