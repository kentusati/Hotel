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
        //private readonly UserManager<User> _userManager;
        //private readonly SignInManager<User> _signInManager;
        //private readonly IRoleService _roleService;
        //private readonly bool isAuthenticationPersistant = false;
        //private readonly bool isLockoutOnFailtureRequired = false;

        //public UserService(UserManager<User> userManager,
        //                   SignInManager<User> signInManager)
        //{
        //    _userManager = userManager;
        //    _signInManager = signInManager;
        //}

        //public async Task<IdentityResult> RegisterUserAsync(AddUserRequest createUserDto)
        //{
        //    var user = new User()
        //    {
        //        Email = createUserDto.Email,
        //        UserName = createUserDto.UserName,
        //    };

        //    var userCreationResult = await _userManager.CreateAsync(user, createUserDto.Password);

        //    if (userCreationResult.Succeeded)
        //    {
        //        return await _roleService.AddToRoleAsync(user, enumRole.User.ToString());
        //    }

        //    return userCreationResult;
        //}

        //public async Task<string> LoginUserAsync(AuthenticationUserRequest userAuthenticationDto, JWTSettings jwt)
        //{
        //    var user = await _userManager.FindByEmailAsync(userAuthenticationDto.Email);

        //    var signInResult = await _signInManager.PasswordSignInAsync(user,
        //                                                                userAuthenticationDto.Password,
        //                                                                isAuthenticationPersistant,
        //                                                                isLockoutOnFailtureRequired);
        //    if (signInResult.Succeeded)
        //    {
        //        IEnumerable<Claim> claims = await _userManager.GetClaimsAsync(user);
        //        var token = GetToken(user, jwt, claims);
        //        return token;
        //    }

        //    return null;
        //}

        //---------------------------------------------------------------------------------------------------------
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
        public async Task<User> GetUserById(Guid id)
        {
            return await _userRep.GetByIdAsync(id);
        }
        public async Task<User> AddUser(AddUserRequest addRequest)
        {
            var password = addRequest.Password;
            var newUser = new User()
            {
                Id = Guid.NewGuid(),
                UserName = addRequest.UserName,
                Email = addRequest.Email,
            };
            newUser.PasswordHash = new PasswordHasher<User>().HashPassword(newUser, password);
            _roleService.AddToRoleAsync(newUser, "User");

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
            newUser.PasswordHash = new PasswordHasher<User>().HashPassword(newUser, password);
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
            user.PasswordHash = new PasswordHasher<User>().HashPassword(user, addRequest.Password);
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
            if(user.isBlocked==false)
            user.isBlocked = true;
            user.isBlocked = false;
            return user;
        }

        public async Task<string> LoginAsync(AuthenticationUserRequest userRequest, JWTSettings jwt)
        {
            var users = await _userRep.FindAsync(user=>user.Email==userRequest.Email);
            User LoginUser =  users.First();

            if(LoginUser.PasswordHash == new PasswordHasher<User>().HashPassword(LoginUser, userRequest.Password))
                return GetToken(LoginUser, jwt);
            return null;
        }


        //-------------------------------------------
        public async Task<User> AddTestUser()
        {
            var user = new User()
            {
                Id = Guid.NewGuid(),
                UserName = "Test",
                Email = "Test@test.com",
            };
            _roleService.AddToRoleAsync(user, "User");
            user.PasswordHash = new PasswordHasher<User>().HashPassword(user, "TEST@test1234");

            await _userRep.AddAsync(user);
            await _userRep.SaveAsync();
            return user;
        }

    }
}
