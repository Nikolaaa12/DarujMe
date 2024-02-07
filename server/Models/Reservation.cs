using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Net.Http.Headers;
using System.Text.Json.Serialization;

namespace Models{

    public class Reservation:IEntity{

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public String? Id { get; set; }
        public String? OwnerId { get; set; }
        public String? ProductId { get; set; }
        public String? CustomerId { get; set; }

        public Reservation()
        {
            
        }

    }

}