using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Net.Http.Headers;
using System.Text.Json.Serialization;

namespace Models{

    public class Product:IEntity{

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public String? Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? ProfilePicture { get; set; }
        public string? ProductTypeId { get; set; }
        public ProductType? TypeofProduct { get; set; }
        public string? OwnerId { get; set; }
        public Boolean Available { get; set; }

        public Boolean isSent {get; set;}

        public Product()
        {
            
        }
        public Product(String name,string description,string profilePicture,string typeid,string ownerid)
        {
            this.Name = name;
            this.Description = description;
            this.ProfilePicture = profilePicture;
            this.ProductTypeId = typeid;
            this.OwnerId = ownerid;
            this.TypeofProduct = null;
            this.Available = true;
            this.isSent = false;
        }

    }

}