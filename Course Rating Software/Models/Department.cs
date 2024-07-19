namespace Models
{
    public class Department
    {
        public int Id { get; set; }
        public string University { get; set; }
        public string Name { get; set; }
        public List<Course> Courses { get; set; } = new List<Course>();
    }
}
