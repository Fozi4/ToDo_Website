using System.ComponentModel.DataAnnotations;

namespace ToDo_backend.Models
{
    public class TaskItem
    {
        [Key]
        public int TaskId { get; set; }
        public string TaskName { get; set; } = string.Empty;
        public bool IsDone { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
