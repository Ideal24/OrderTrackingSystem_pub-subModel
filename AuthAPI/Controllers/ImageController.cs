using System.Security.Claims;
using AuthAPI.Data;
using AuthAPI.Models;
//using JWAuthTokenDotNet9.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AuthAPI.Entities;
namespace AuthAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ImageController(UserDbContext context) : ControllerBase
    {
        private readonly UserDbContext _context = context;

        // 1️⃣ Upload image (Admin only)
        [HttpPost("upload")]
        [Authorize(Roles = "Admin")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Upload([FromForm] UploadFileRequest request)
        {
            var file = request.File;

            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded");

            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "uploads");
            if (!Directory.Exists(uploadsFolder))
                Directory.CreateDirectory(uploadsFolder);

            // Ensure unique filename to avoid overwrite
            var uniqueFileName = $"{Guid.NewGuid()}_{file.FileName}";
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            try
            {
                // Save the file
                await using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                // Save DB record
                var image = new Image
                {
                    FileName = uniqueFileName,
                    FilePath = $"/uploads/{uniqueFileName}",
                    UploadedBy = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value),
                    Title = request.Title,
                    Description = request.Description,
                    UploadedAt = DateTime.UtcNow
                };

                _context.Images.Add(image);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    image.Id,
                    image.FilePath,
                    image.Title,
                    image.Description,
                    image.UploadedAt
                });
            }
            catch (Exception ex)
            {
                if (System.IO.File.Exists(filePath))
                    System.IO.File.Delete(filePath);

                return StatusCode(500, new { msg = $"Error uploading file: {ex.Message}" });
            }
        }

        // 2️⃣ Get all images (User or Admin)
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll()
        {
            var images = await _context.Images
                .AsNoTracking()
                .OrderByDescending(i => i.UploadedAt)
                .ToListAsync();

            return Ok(images);
        }

        // 3️⃣ Get by ID
        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetImage(Guid id)
        {
            var image = await _context.Images.FindAsync(id);
            if (image == null)
                return NotFound("Image not found");

            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "uploads", image.FileName ?? string.Empty);

            if (!System.IO.File.Exists(filePath))
                return NotFound("File not found on disk");

            var contentType = GetContentType(filePath);

            Response.Headers.Append("Content-Disposition", $"inline; filename={image.FileName}");
            var bytes = await System.IO.File.ReadAllBytesAsync(filePath);
            return File(bytes, contentType);
        }

        // 4️⃣ Get by FileName
        [HttpGet("byname/{fileName}")]
        [Authorize]
        public async Task<IActionResult> GetImageByFileName(string fileName)
        {
            fileName = Uri.UnescapeDataString(fileName);

            var image = await _context.Images.FirstOrDefaultAsync(i => i.FileName == fileName);
            if (image == null)
                return NotFound("Image not found");

            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "uploads", image.FileName ?? string.Empty);

            if (!System.IO.File.Exists(filePath))
                return NotFound("File not found on disk");

            var contentType = GetContentType(filePath);

            Response.Headers.Append("Content-Disposition", $"inline; filename={image.FileName}");
            var bytes = await System.IO.File.ReadAllBytesAsync(filePath);
            return File(bytes, contentType);
        }

        // Helper method: detect content type
        private static string GetContentType(string filePath)
        {
            var ext = Path.GetExtension(filePath).ToLower();
            return ext switch
            {
                ".jpg" or ".jpeg" or ".jfif" => "image/jpeg",
                ".png" => "image/png",
                ".gif" => "image/gif",
                ".bmp" => "image/bmp",
                ".webp" => "image/webp",
                _ => "application/octet-stream"
            };
        }
    }
}
