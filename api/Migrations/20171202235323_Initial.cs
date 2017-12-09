using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace api.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Session",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ClientToken = table.Column<string>(nullable: true),
                    HostToken = table.Column<string>(nullable: true),
                    SpotifyAccessToken = table.Column<string>(nullable: true),
                    SpotifyPlaylistId = table.Column<string>(nullable: true),
                    SpotifyUserId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Session", x => x.Id)
                        .Annotation("SqlServer:Clustered", true);
                });

            migrationBuilder.CreateTable(
                name: "SessionTrackVote",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ClientId = table.Column<string>(nullable: true),
                    SessionId = table.Column<int>(nullable: true),
                    SpotifyTrackUri = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SessionTrackVote", x => x.Id)
                        .Annotation("SqlServer:Clustered", true);
                    table.ForeignKey(
                        name: "FK_SessionTrackVote_Session_SessionId",
                        column: x => x.SessionId,
                        principalTable: "Session",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Session_ClientToken",
                table: "Session",
                column: "ClientToken");

            migrationBuilder.CreateIndex(
                name: "IX_Session_HostToken",
                table: "Session",
                column: "HostToken");

            migrationBuilder.CreateIndex(
                name: "IX_SessionTrackVote_SessionId",
                table: "SessionTrackVote",
                column: "SessionId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SessionTrackVote");

            migrationBuilder.DropTable(
                name: "Session");
        }
    }
}
