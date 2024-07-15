namespace Models
{
    public class Department
    {
        public int Id { get; set; }
        public string University { get; set; } = "University of Auckland";
        public string Name { get; set; } = "Computer Science";
        public List<Course> Courses { get; set; } = new();  // Add this line
    }
}
