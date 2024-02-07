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
    [Route("api/Product")]
    public class ProductController : ControllerBase
    {

        private IProductService _service;

        public ProductController(MongoDbContext _mongoDBContext)
        {
            this._service = new ProductService(_mongoDBContext);
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
                await _service.Repository.DeleteProduct(id);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpPost]
        [Route("CreateProduct")]
        public async Task<IActionResult> CreateProduct([FromBody] CreateProductDTO product)
        {
            var a = await _service.CreateProduct(product);
            return Ok(a);
        }



    }
}