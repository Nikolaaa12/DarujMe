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
    [Route("api/ProductType")]
    public class ProductTypeController : ControllerBase
    {

        private IProductTypeService _service;

        public ProductTypeController(MongoDbContext _mongoDBContext)
        {
            this._service = new ProductTypeService(_mongoDBContext);
        }

        [HttpGet]
        [Route("GetProductTypeById")]
        public async Task<IActionResult> GetProductTypeById(String? id)
        {
            try
            {
                var a = await _service.Repository.GetTypeById(id);
                return Ok(a);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpGet]
        [Route("GetAllProductType")]
        public async Task<IActionResult> GetAllProductType()
        {
            var a = await _service.Repository.GetAllTypes();
            return Ok(a);
        }
        [HttpDelete]
        [Route("DeleteProductType")]
        public async Task<IActionResult> DeleteProductType(String? id)
        {
            try
            {
                await _service.Repository.DeleteType(id);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpPost]
        [Route("CreateProductType")]
        public async Task<IActionResult> CreateProductType(String? name)
        {
            var a = await _service.Repository.Create(name);
            return Ok(a);
        }



    }
}