﻿using Hotel.DataAccess.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Hotel.Infastructure.Configurations;

namespace Hotel.Infastructure.Data
{
    public class HotelAPIDBcontext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<RoomType> RoomTypes { get; set; }
        //public DbSet<SelectedServiceForOrder> SelectedServicesForOrders { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<Order> Orders { get; set; }

        public HotelAPIDBcontext(DbContextOptions options) : base(options)
        {
            //Database.EnsureDeleted();
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfiguration(new IdentityRoleConfiguration());
            builder.ApplyConfiguration(new UserConfiguration());

        //     builder.Entity<User>()
        //       .HasOne(u => u.Role)
        //       .WithMany(r => r.Users) 
        //       .HasForeignKey(u => u.roleId)
        //       .OnDelete(DeleteBehavior.SetNull);

        //builder.Entity<Booking>()
        //       .HasOne(x => x.User)
        //       .WithMany(ev => ev.Bookings)
        //       .HasForeignKey(ev => ev.UserId)
        //       .OnDelete(DeleteBehavior.SetNull); 

            base.OnModelCreating(builder);
        }
    }
}
