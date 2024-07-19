namespace Models
{
    public class Course
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string CourseId { get; set; }
        public string Body { get; set; }
        public double Rating { get; set; }
        public int DepartmentId { get; set; }
        public Department Department { get; set; }
    }
}
