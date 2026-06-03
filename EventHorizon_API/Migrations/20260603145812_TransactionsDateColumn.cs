using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EventHorizon_API.Migrations
{
    /// <inheritdoc />
    public partial class TransactionsDateColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateOnly>(
                name: "Date",
                table: "transactions",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Date",
                table: "transactions");
        }
    }
}
