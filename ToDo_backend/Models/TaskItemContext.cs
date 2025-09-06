using Microsoft.EntityFrameworkCore;

namespace ToDo_backend.Models
{
    public class TaskItemContext:DbContext
    {
        public TaskItemContext(DbContextOptions options) : base(options) {

        }
        public DbSet<TaskItem> TaskItems { get; set; }  
    }
}
