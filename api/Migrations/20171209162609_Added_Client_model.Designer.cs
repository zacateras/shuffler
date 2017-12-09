﻿// <auto-generated />
using api.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using System;

namespace api.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20171209162609_Added_Client_model")]
    partial class Added_Client_model
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.1-rtm-125")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("api.Models.Client", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClientToken");

                    b.Property<DateTime>("CreatedAt")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("GETUTCDATE()");

                    b.Property<int?>("SessionId");

                    b.HasKey("Id")
                        .HasAnnotation("SqlServer:Clustered", true);

                    b.HasIndex("SessionId");

                    b.ToTable("SessionClient");
                });

            modelBuilder.Entity("api.Models.Session", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedAt")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("GETUTCDATE()");

                    b.Property<string>("HostToken");

                    b.Property<string>("SpotifyAccessToken");

                    b.Property<string>("SpotifyPlaylistId");

                    b.Property<string>("SpotifyUserId");

                    b.HasKey("Id")
                        .HasAnnotation("SqlServer:Clustered", true);

                    b.HasIndex("HostToken");

                    b.ToTable("Session");
                });

            modelBuilder.Entity("api.Models.TrackVote", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("ClientId");

                    b.Property<DateTime>("CreatedAt")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("GETUTCDATE()");

                    b.Property<string>("SpotifyTrackUri");

                    b.HasKey("Id")
                        .HasAnnotation("SqlServer:Clustered", true);

                    b.HasIndex("ClientId");

                    b.ToTable("SessionTrackVote");
                });

            modelBuilder.Entity("api.Models.Client", b =>
                {
                    b.HasOne("api.Models.Session", "Session")
                        .WithMany("Clients")
                        .HasForeignKey("SessionId");
                });

            modelBuilder.Entity("api.Models.TrackVote", b =>
                {
                    b.HasOne("api.Models.Client", "Client")
                        .WithMany("TrackVotes")
                        .HasForeignKey("ClientId");
                });
#pragma warning restore 612, 618
        }
    }
}
