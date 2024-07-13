using Models;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;

namespace Services
{
    public class CourseService
    {
        private readonly CourseContext _context;

        public CourseService(CourseContext context)
        {
            _context = context;

            // Populate database with JSON data if empty
            if (!_context.Courses.Any())
            {
                // Load Departments
                var departmentData = File.ReadAllText("services/department_dummy_data.json");
                var departments = JsonSerializer.Deserialize<List<Department>>(departmentData);
                if (departments != null)
                {
                    foreach (var department in departments)
                    {
                        if (!_context.Departments.Any(d => d.Id == department.Id))
                        {
                            _context.Departments.Add(department);
                        }
                    }
                    _context.SaveChanges();
                }

                // Load Courses
                var courseData = File.ReadAllText("services/course_dummy_data.json");
                var courses = JsonSerializer.Deserialize<List<Course>>(courseData);
                if (courses != null)
                {
                    foreach (var course in courses)
                    {
                        // Assign random department to each course
                        var department = _context.Departments.OrderBy(d => EF.Functions.Random()).FirstOrDefault();
                        if (department != null)
                        {
                            course.DepartmentId = department.Id;
                            course.Department = department;
                        }

                        // Detach any existing tracked entity with the same key
                        var trackedEntity = _context.Courses.Local.FirstOrDefault(c => c.Id == course.Id);
                        if (trackedEntity != null)
                        {
                            _context.Entry(trackedEntity).State = EntityState.Detached;
                        }
                        _context.Courses.Add(course);
                    }
                    _context.SaveChanges();
                }
            }
        }

        // gets all courses
        public List<Course> GetAll() => _context.Courses.Include(c => c.Department).ToList();

        // gets single course by Id
        public Course? Get(int id) => _context.Courses.Include(c => c.Department).FirstOrDefault(c => c.Id == id);

        // update existing course
        public void Update(Course course)
        {
            var existingCourse = _context.Courses.Find(course.Id);
            if (existingCourse != null)
            {
                _context.Entry(existingCourse).CurrentValues.SetValues(course);
                _context.SaveChanges();
            }
        }

        // add a new course
        public void Add(Course course)
        {
            course.Id = _context.Courses.Any() ? _context.Courses.Max(c => c.Id) + 1 : 1;
            _context.Courses.Add(course);
            _context.SaveChanges();
        }

        // delete course by id
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
