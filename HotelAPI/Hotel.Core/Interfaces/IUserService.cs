using Hotel.DataAccess.DTOs.UsersRequest;
using Hotel.DataAccess.Models;
using Hotel.Infastructure.Tokens;
using Microsoft.AspNetCore.Identity;
using System.Linq.Expressions;

namespace Hotel.Core.Interfaces
{
    public interface IUserService
    {
        //Task<IdentityResult> RegisterUserAsync(AddUserRequest createUserDto);
        //Task<string> LoginUserAsync(AuthenticationUserRequest userAuthenticationDto, JWTSettings jwt);

        Task<IEnumerable<User>> GetAllUsers(); // получение всех объектов
        Task<IEnumerable<User>> GetAllUsersWithInclude(); // получение всех объектов
        Task<User> GetUserById(Guid id); // получение одного объекта по id
        Task<User> FindUserByName(string name);
        Task<IEnumerable<User>> FindUsersByRole(string rolename);
        Task<User> InitAdmin();
        Task<User> AddUser(AddUserRequest item); // создание объекта
        Task<User> UpdateUser(Guid id, AddUserRequest item); // обновление объекта
        Task<User> DeleteUser(Guid id); // удаление объекта по id

        Task<User> LoginAsync(AuthenticationUserRequest userRequest, JWTSettings _jwt);
        Task<User> AddManager(AddUserRequest item);
        Task<User> BlockUser(Guid id);
    }
}
