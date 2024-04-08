using Hotel.Core.Interfaces;
using Hotel.DataAccess.DTOs.UsersRequest;
using Hotel.DataAccess.Models;
using Hotel.Infastructure.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Identity;
using Microsoft.EntityFrameworkCore;
using System.Data;
using Hotel.DataAccess.Enums;
using Microsoft.VisualBasic;
using System.Security.Claims;
using Hotel.Infastructure.Tokens;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System;


namespace Hotel.Core.Services
{
    public class UserService : IUserService
    {
        public string GetToken(User user, JWTSettings jwtSettings)
        {
            //var claims = principal.ToList();
            //  claims.Add(new Claim(ClaimTypes.Name, user.UserName));

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Email),
                new Claim(ClaimTypes.Role, user.Role.Name)
            };
            //var claims = new List<Claim> { new Claim(ClaimTypes.Name, user.UserName) };

            var signInKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.SecretKey));

            var jwt = new JwtSecurityToken(
                issuer: jwtSettings.Issuer,
                audience: jwtSettings.Audience,
                claims: claims,
                expires: DateTime.UtcNow.Add(TimeSpan.FromMinutes(5)),
                notBefore: DateTime.UtcNow,
                signingCredentials: new SigningCredentials(signInKey, SecurityAlgorithms.HmacSha256)
                );

            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }

        //----------------------------------------------------------------------------------------------------------------------

        private readonly Repository<User> _userRep;
        private readonly IRoleService _roleService;
        public User hashUser = new User {
            Id = Guid.NewGuid(),
            UserName = "hashUser",
            Email = "hashUser@email.com"
        };

        public UserService(HotelAPIDBcontext dbContext, IRoleService roleService)
        {
            this._userRep = new Repository<User>(dbContext);
            this._roleService = roleService;
        }

        public async Task<IEnumerable<User>> GetAllUsers()
        {
            var users = await _userRep.GetAllItemsAsync();
            return users;
        }
        public async Task<IEnumerable<User>> GetAllUsersWithInclude()
        {
            var users = await _userRep.GetAllItemsAsyncWithInclude(u=>u.Role);
            return users;
        }

        public async Task<User> GetUserById(Guid id)
        {
            return await _userRep.GetByIdAsync(id);
        }
        public async Task<User> InitAdmin()
        {
            var user = await FindUserByName("Admin");
            _userRep.Update(user);
            if (user != null)
            {
                if (user.Role == null) { _roleService.AddToRoleAsync(user, "Admin"); }
            }
            await _userRep.SaveAsync();

            return user;
        }
        public async Task<User> FindUserByName(string username)
        {
            var userByName = await _userRep.FindAsync(u=>u.UserName == username);
            return userByName.First();
        }
        public async Task<IEnumerable<User>> FindUsersByRole(string rolename)
        {
            var users = await _userRep.GetAllItemsAsyncWithInclude(u=>u.Role);
            var items = new List<User>();
            foreach (var user in users) { if (user.Role.Name == rolename) items.Add(user); }
            return items;
        }
        public async Task<User> AddUser(AddUserRequest addRequest)
        {
            var password = addRequest.Password;
            var finduser = await _userRep.FindAsync(user => user.Email == addRequest.Email);
            if (!finduser.IsNullOrEmpty())  return null;
            var newUser = new User()
            {
                Id = Guid.NewGuid(),
                UserName = addRequest.UserName,
                Email = addRequest.Email,
            };
            _roleService.AddToRoleAsync(newUser, "User");
            newUser.PasswordHash = new PasswordHasher<User>().HashPassword(null, password);
            
            await _userRep.AddAsync(newUser);
            await _userRep.SaveAsync();
            return newUser;
        }
        public async Task<User> AddManager(AddUserRequest addRequest)
        {
            var password = addRequest.Password;
            var newUser = new User()
            {
                Id = Guid.NewGuid(),
                UserName = addRequest.UserName,
                Email = addRequest.Email,
            };
            newUser.PasswordHash = new PasswordHasher<User>().HashPassword(null, password);
            _roleService.AddToRoleAsync(newUser, "Manager");

            await _userRep.AddAsync(newUser);
            await _userRep.SaveAsync();
            return newUser;
        }
        public async Task<User> UpdateUser(Guid id, AddUserRequest addRequest)
        {
            var user = await _userRep.GetByIdAsync(id);
            if (user == null) return user;
            _userRep.Update(user);
            user.UserName = addRequest.UserName;
            user.Email = addRequest.Email;
            user.PasswordHash = new PasswordHasher<User>().HashPassword(null, addRequest.Password);
            await _userRep.SaveAsync();
            return user;
        }
        public async Task<User> DeleteUser(Guid id)
        {
            var user = await _userRep.GetByIdAsync(id);
            if (user == null) return user;
            _userRep.Delete(user);
            await _userRep.SaveAsync();
            return user;
        }
        public async Task<User> BlockUser(Guid id)
        {
            var user = await _userRep.GetByIdAsync(id);
            _userRep.Update(user);
            if(user.isBlocked==false)
            user.isBlocked = true;
            else user.isBlocked = false;
            await _userRep.SaveAsync();
            return user;
        }

        public async Task<User> LoginAsync(AuthenticationUserRequest userRequest, JWTSettings jwt)
        {
            var users = await _userRep.FindAsync(user=>user.Email==userRequest.Email);
            if (users.IsNullOrEmpty()) return null;
            User LoginUser =  users.First();
            if (PasswordVerificationResult.Success == new PasswordHasher<User>().VerifyHashedPassword(null, LoginUser.PasswordHash, userRequest.Password))
            {
                var userAndRoles = await _userRep.GetAllItemsAsyncWithInclude(u => u.Role);
                foreach (var item in userAndRoles)
                {
                    if (item.Email == LoginUser.Email) return item;
                }
            }
            return null;
        }


        //-------------------------------------------

    }
}
