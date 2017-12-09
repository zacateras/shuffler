using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Session> Sessions { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<TrackVote> TrackVotes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Session>().ToTable("Session");
            modelBuilder.Entity<Session>().HasKey(x => x.Id).ForSqlServerIsClustered();
            modelBuilder.Entity<Session>().Property(x => x.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<Session>().Property(x => x.CreatedAt).HasDefaultValueSql("GETUTCDATE()").ValueGeneratedOnAdd();
            modelBuilder.Entity<Session>().HasIndex(x => x.HostToken);
            modelBuilder.Entity<Session>().HasMany(x => x.Clients).WithOne(x => x.Session).OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Client>().ToTable("SessionClient");
            modelBuilder.Entity<Client>().HasKey(x => x.Id).ForSqlServerIsClustered();
            modelBuilder.Entity<Client>().Property(x => x.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<Client>().Property(x => x.CreatedAt).HasDefaultValueSql("GETUTCDATE()").ValueGeneratedOnAdd();
            modelBuilder.Entity<Client>().HasMany(x => x.TrackVotes).WithOne(x => x.Client).OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<TrackVote>().ToTable("SessionTrackVote");
            modelBuilder.Entity<TrackVote>().HasKey(x => x.Id).ForSqlServerIsClustered();
            modelBuilder.Entity<TrackVote>().Property(x => x.CreatedAt).HasDefaultValueSql("GETUTCDATE()").ValueGeneratedOnAdd();
            modelBuilder.Entity<TrackVote>().Property(x => x.Id).ValueGeneratedOnAdd();
        }
    }
}