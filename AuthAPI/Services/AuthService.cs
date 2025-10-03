using AuthAPI.Data;
using AuthAPI.Entities;
using AuthAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace AuthAPI.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthService(UserDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // LOGIN
        public async Task<TokenResponseDto?> LoginAsync(UserDto request)
        {
            // Add null check for request.Password early
            if (string.IsNullOrEmpty(request.Password))
                return null;

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == request.Username);

            // Check for null user and password hash
            if (user is null || string.IsNullOrEmpty(user.PasswordHash))
                return null;

            var verify = new PasswordHasher<User>().VerifyHashedPassword(
                user,
                user.PasswordHash!, // Use ! to suppress warning, already checked for null above
                request.Password!   // Use ! to suppress warning, already checked for null above
            );

            if (verify == PasswordVerificationResult.Failed)
                return null;

            var response = new TokenResponseDto
            {
                AccessToken = CreateToken(user),
                RefreshToken = await GenerateAndSaveRefreshTokenAsync(user)
            };

            return response;
        }

        // REGISTER
        public async Task<User?> RegisterAsync(UserDto request)
        {
            // Add null/empty check for password
            if (string.IsNullOrEmpty(request.Password))
                return null;

            var exists = await _context.Users.AnyAsync(u => u.Username == request.Username);
            if (exists)
                return null;

            var user = new User
            {
                Username = request.Username
            };

            // Password is guaranteed to be non-null here
            user.PasswordHash = new PasswordHasher<User>().HashPassword(user, request.Password);

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return user;
        }

        // VALIDATE REFRESH TOKEN
        private async Task<User?> ValidateRefreshTokenAsync(Guid userId, string refreshToken)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user is null || user.RefreshToken != refreshToken || user.RefreshTokenExpiryTime <= DateTime.UtcNow)
                return null;

            return user;
        }

        // GENERATE REFRESH TOKEN
        private string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }

        private async Task<string> GenerateAndSaveRefreshTokenAsync(User user)
        {
            var refreshToken = GenerateRefreshToken();
            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
            await _context.SaveChangesAsync();
            return refreshToken;
        }

        // JWT CREATION
        private string CreateToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username ?? string.Empty),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Role, user.Role ?? "User") // Already handles null with ??
            };

            var keyBytes = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!);
            var key = new SymmetricSecurityKey(keyBytes);
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddDays(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<TokenResponseDto?> RefreshTokenAsync(RefreshTokenRequestDto request)
        {
            //  Find the user in DB
            var user = await _context.Users.FindAsync(request.UserId);
            if (user == null) return null; // User not found

            //  Validate the refresh token
            if (user.RefreshToken != request.RefreshToken || user.RefreshTokenExpiryTime <= DateTime.UtcNow)
            {
                return null; // Invalid or expired token
            }

            // Generate new tokens
            var newAccessToken = CreateToken(user);
            var newRefreshToken = await GenerateAndSaveRefreshTokenAsync(user);

            //  Prepare response DTO
            var response = new TokenResponseDto
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken
            };

            return response;
        }
    }
}