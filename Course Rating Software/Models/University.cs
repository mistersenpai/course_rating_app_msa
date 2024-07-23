using System.Collections.Generic;

namespace Models
{
    public class University
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Department> Departments { get; set; }
    }
}
