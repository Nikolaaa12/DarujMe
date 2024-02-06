using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Net.Http.Headers;
using System.Text.Json.Serialization;

namespace Models{

    public class User:IEntity{

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public String? Id { get; set; }
        public string? Name { get; set; }
        public string? Lastname { get; set; }
        public string? Username { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? ProfilePicture { get; set; }
        public string? City { get; set; }
        public string? Adress { get; set; }
        public string? PhoneNumber { get; set; }
        public Boolean Admin { get; set; }
        public List<Product> Products { get; set; }
        public User()
        {
            
        }

    }

}