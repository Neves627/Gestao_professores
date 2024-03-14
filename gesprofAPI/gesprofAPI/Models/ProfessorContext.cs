using Microsoft.AspNetCore.Http.Features;
using Microsoft.EntityFrameworkCore;

namespace gesprofAPI.Models
{
    public class ProfessorContext : DbContext
    {
        public ProfessorContext(DbContextOptions<ProfessorContext> options) : base(options)
        {

        }

        public DbSet<Professor> Professors { get; set; }

    }
}
