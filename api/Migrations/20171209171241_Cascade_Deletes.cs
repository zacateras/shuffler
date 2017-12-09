using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace api.Migrations
{
    public partial class Cascade_Deletes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SessionClient_Session_SessionId",
                table: "SessionClient");

            migrationBuilder.DropForeignKey(
                name: "FK_SessionTrackVote_SessionClient_ClientId",
                table: "SessionTrackVote");

            migrationBuilder.AddForeignKey(
                name: "FK_SessionClient_Session_SessionId",
                table: "SessionClient",
                column: "SessionId",
                principalTable: "Session",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SessionTrackVote_SessionClient_ClientId",
                table: "SessionTrackVote",
                column: "ClientId",
                principalTable: "SessionClient",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SessionClient_Session_SessionId",
                table: "SessionClient");

            migrationBuilder.DropForeignKey(
                name: "FK_SessionTrackVote_SessionClient_ClientId",
                table: "SessionTrackVote");

            migrationBuilder.AddForeignKey(
                name: "FK_SessionClient_Session_SessionId",
                table: "SessionClient",
                column: "SessionId",
                principalTable: "Session",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_SessionTrackVote_SessionClient_ClientId",
                table: "SessionTrackVote",
                column: "ClientId",
                principalTable: "SessionClient",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
