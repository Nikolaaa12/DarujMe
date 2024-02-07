using Models;
using DTOs;
using Repository;

namespace Services.IServices
{
    public interface IProductTypeService
    {
        public ProductTypeRepository Repository { get; set; }
    }
}
