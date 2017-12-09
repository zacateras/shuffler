using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace api.Migrations
{
    public partial class Added_Client_model : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SessionTrackVote_Session_SessionId",
                table: "SessionTrackVote");

            migrationBuilder.DropIndex(
                name: "IX_SessionTrackVote_SessionId",
                table: "SessionTrackVote");

            migrationBuilder.DropIndex(
                name: "IX_Session_ClientToken",
                table: "Session");

            migrationBuilder.DropColumn(
                name: "SessionId",
                table: "SessionTrackVote");

            migrationBuilder.DropColumn(
                name: "ClientToken",
                table: "Session");

            migrationBuilder.AlterColumn<int>(
                name: "ClientId",
                table: "SessionTrackVote",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "SessionClient",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ClientToken = table.Column<string>(nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: false, defaultValueSql: "GETUTCDATE()"),
                    SessionId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SessionClient", x => x.Id)
                        .Annotation("SqlServer:Clustered", true);
                    table.ForeignKey(
                        name: "FK_SessionClient_Session_SessionId",
                        column: x => x.SessionId,
                        principalTable: "Session",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SessionTrackVote_ClientId",
                table: "SessionTrackVote",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_SessionClient_SessionId",
                table: "SessionClient",
                column: "SessionId");

            migrationBuilder.AddForeignKey(
                name: "FK_SessionTrackVote_SessionClient_ClientId",
                table: "SessionTrackVote",
                column: "ClientId",
                principalTable: "SessionClient",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SessionTrackVote_SessionClient_ClientId",
                table: "SessionTrackVote");

            migrationBuilder.DropTable(
                name: "SessionClient");

            migrationBuilder.DropIndex(
                name: "IX_SessionTrackVote_ClientId",
                table: "SessionTrackVote");

            migrationBuilder.AlterColumn<string>(
                name: "ClientId",
                table: "SessionTrackVote",
                nullable: true,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SessionId",
                table: "SessionTrackVote",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ClientToken",
                table: "Session",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_SessionTrackVote_SessionId",
                table: "SessionTrackVote",
                column: "SessionId");

            migrationBuilder.CreateIndex(
                name: "IX_Session_ClientToken",
                table: "Session",
                column: "ClientToken");

            migrationBuilder.AddForeignKey(
                name: "FK_SessionTrackVote_Session_SessionId",
                table: "SessionTrackVote",
                column: "SessionId",
                principalTable: "Session",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
