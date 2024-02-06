using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Net.Http.Headers;
using System.Text.Json.Serialization;

namespace Models{

    public class Reports:IEntity{

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public String? Id { get; set; }
        public string? Description { get; set; } 
        public string? IdProduct { get; set; }
        public string? IdUser { get; set; }

        public Reports()
        {
            
        }

    }

}