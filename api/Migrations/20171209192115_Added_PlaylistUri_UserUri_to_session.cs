using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace api.Migrations
{
    public partial class Added_PlaylistUri_UserUri_to_session : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SpotifyPlaylistUri",
                table: "Session",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SpotifyUserUri",
                table: "Session",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SpotifyPlaylistUri",
                table: "Session");

            migrationBuilder.DropColumn(
                name: "SpotifyUserUri",
                table: "Session");
        }
    }
}
