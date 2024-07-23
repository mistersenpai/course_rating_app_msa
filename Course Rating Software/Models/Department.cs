using System.Collections.Generic;

namespace Models
{
    public class Department
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int UniversityId { get; set; }
        public University University { get; set; }
        public List<Course> Courses { get; set; }
    }
}
