using Models;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Services
{
    public class CourseService
    {
        private readonly CourseContext _context;
        private readonly ILogger<CourseService> _logger;

        public CourseService(CourseContext context, ILogger<CourseService> logger)
        {
            _context = context;
            _logger = logger;

            InitializeCourses();
        }

        private void InitializeCourses()
        {
            if (!_context.Courses.Any())
            {
                _logger.LogInformation("Initializing courses from JSON file.");
                var jsonData = File.ReadAllText("services/course_dummy_data.json");
                var courses = JsonSerializer.Deserialize<List<Course>>(jsonData);
                if (courses != null)
                {
                    _logger.LogInformation($"Read JSON data: {jsonData}");
                    foreach (var course in courses)
                    {
                        var department = _context.Departments.Find(course.DepartmentId);
                        if (department != null)
                        {
                            var existingCourse = _context.Courses.Local.FirstOrDefault(c => c.Id == course.Id);
                            if (existingCourse == null)
                            {
                                _context.Courses.Add(course);
                            }
                        }
                        else
                        {
                            _logger.LogWarning($"Department with ID {course.DepartmentId} not found for course: {course.Name}");
                        }
                    }
                    _context.SaveChanges();
                }
            }
        }

        public List<Course> GetAll() => _context.Courses.Include(c => c.Department).ToList();
        public Course? Get(int id) => _context.Courses.Include(c => c.Department).FirstOrDefault(c => c.Id == id);

        public void Update(Course course)
        {
            var existingCourse = _context.Courses.Find(course.Id);
            if (existingCourse != null)
            {
                _context.Entry(existingCourse).CurrentValues.SetValues(course);
                _context.SaveChanges();
            }
        }

        public void Add(Course course)
        {
            course.Id = _context.Courses.Any() ? _context.Courses.Max(c => c.Id) + 1 : 1;
            _context.Courses.Add(course);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var course = _context.Courses.Find(id);
            if (course != null)
            {
                _context.Courses.Remove(course);
                _context.SaveChanges();
            }
        }
    }
}
