using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Hotel.API.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDBMigr : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("20c05bb4-4579-4321-a320-7c590a566a4c"));

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("3bc2e2e1-00f8-4eec-a657-c5cac147f011"));

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("689eb788-ae59-498f-b44b-772c5a8f3c53"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("8e0a3ad7-4684-4a41-b872-593ea5816e2f"));

            migrationBuilder.AddColumn<bool>(
                name: "isBlocked",
                table: "Users",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Img",
                table: "Services",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Rooms",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Img",
                table: "Rooms",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Rooms",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "Rooms",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { new Guid("1de43847-a69f-4d92-a911-7f47b7d64de7"), "Manager" },
                    { new Guid("5e05dc86-7991-48b1-a032-e936b6af1321"), "User" },
                    { new Guid("9d5022c6-8706-4170-9159-12897eb9db90"), "Admin" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "PasswordHash", "RoleId", "UserName", "isBlocked" },
                values: new object[] { new Guid("61a0e8ff-3eb9-4824-9096-213620cdb561"), "Admin@gmail.com", "AQAAAAIAAYagAAAAELoYvz5CUuF81ial1YJCFuHrUcjwzHKNwODXNAo1EmOnqq3lWGAUg8rLvCCGmtY7GQ==", null, "Admin", false });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("1de43847-a69f-4d92-a911-7f47b7d64de7"));

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("5e05dc86-7991-48b1-a032-e936b6af1321"));

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("9d5022c6-8706-4170-9159-12897eb9db90"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("61a0e8ff-3eb9-4824-9096-213620cdb561"));

            migrationBuilder.DropColumn(
                name: "isBlocked",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Img",
                table: "Services");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Rooms");

            migrationBuilder.DropColumn(
                name: "Img",
                table: "Rooms");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Rooms");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "Rooms");

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { new Guid("20c05bb4-4579-4321-a320-7c590a566a4c"), "Admin" },
                    { new Guid("3bc2e2e1-00f8-4eec-a657-c5cac147f011"), "User" },
                    { new Guid("689eb788-ae59-498f-b44b-772c5a8f3c53"), "Manager" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "PasswordHash", "RoleId", "UserName" },
                values: new object[] { new Guid("8e0a3ad7-4684-4a41-b872-593ea5816e2f"), "Admin@gmail.com", "AQAAAAIAAYagAAAAEB4rfmDrucHhOGUUfee0tHcOVRifBCdSquLHezEJaMQkPDwBD6f9CiRdSCZI6ogORQ==", null, "Admin" });
        }
    }
}
