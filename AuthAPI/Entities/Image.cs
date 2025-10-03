using System.Text.Json.Serialization;

namespace AuthAPI.Entities
{
    public class Image
    {
        public Guid Id { get; set; }
        public string? FileName { get; set; }
        public string? FilePath { get; set; }
        public DateTime UploadedAt { get; set; }
        public Guid UploadedBy { get; set; }

        [JsonIgnore]  // prevent circular reference
        public User? UploadedByUser { get; set; }

        public string? Title { get; set; } // <-- Add this property to fix CS0117
        public string? Description { get; set; } 
    }
}
