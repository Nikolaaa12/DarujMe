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
        public string? ProfilePicture { get; set; }
        public int UserId { get; set; }
        public User? Owner { get; set; }

        public Product()
        {
            
        }

    }

}