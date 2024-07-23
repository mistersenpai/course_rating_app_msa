using Microsoft.EntityFrameworkCore;

namespace Models
{
    public class CourseContext : DbContext
    {
        public CourseContext(DbContextOptions<CourseContext> options) : base(options)
        {
        }

        public DbSet<Course> Courses { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<University> Universities { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Department>()
                .HasMany(d => d.Courses)
                .WithOne(c => c.Department)
                .HasForeignKey(c => c.DepartmentId);

            modelBuilder.Entity<University>()
                .HasMany(u => u.Departments)
                .WithOne(d => d.University)
                .HasForeignKey(d => d.UniversityId);
        }
    }
}
