using AuthAPI.Entities;
using AuthAPI.Models;

namespace AuthAPI.Services
{
    public interface IAuthService
    {
        Task<User?> RegisterAsync(UserDto user);
        Task<TokenResponseDto?> LoginAsync(UserDto request);
        Task<TokenResponseDto?>RefreshTokenAsync(RefreshTokenRequestDto request);

    }
}
