using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Net.Http.Headers;
using System.Text.Json.Serialization;

namespace Models
{

    public class ProductType:IEntity{

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public String? Id { get; set; }
        public string? Name { get; set; }
        public ProductType()
        {
            
        }

        public static implicit operator ProductType(Task<ProductType> v)
        {
            throw new NotImplementedException();
        }
    }

}