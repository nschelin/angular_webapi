using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using ang_webapi.Models;

namespace ang_webapi.Database
{
	public class CatContext : DbContext
	{
		public CatContext() { }

		public CatContext(DbContextOptions<CatContext> options) : base(options) {}

		public DbSet<Cat> Cats { get; set; }

		protected override void OnModelCreating(ModelBuilder builder) {
			base.OnModelCreating(builder);
			builder.Entity<Cat>().ToTable("Cats");
		}
	}
}