using Microsoft.AspNetCore.Http;

namespace AuthAPI.Models
{
    public class UploadFileRequest
    {
        public required IFormFile File { get; set; }
        public required string Title { get; set; }
        public string? Description { get; set; }
    }
}