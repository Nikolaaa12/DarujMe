namespace Models{
    public class MongoDBSettings{
        public string ConnectionURI { get; set; } = null!;
        public string Database { get; set; } = null!;
        public string CollectionName { get; set; } = null!;
    }
}