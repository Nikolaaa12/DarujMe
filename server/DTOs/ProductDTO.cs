using Models;

namespace DTOs
{
    public class CreateProductDTO
    {
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? ProfilePicture { get; set; }
        public string? ProductTypeId { get; set; }
        public string? OwnerId { get; set; }
    }
}