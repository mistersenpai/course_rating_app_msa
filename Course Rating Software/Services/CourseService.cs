using Models;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;

namespace Services
{
    public class CourseService
    {
        static int availableId = 3;
        // dummy database
        static List<Course> CourseDB;

        static CourseService()
        {
            // Reads data from the JSON file
            var jsonData = File.ReadAllText("services/course_dummy_data.json");
            CourseDB = JsonSerializer.Deserialize<List<Course>>(jsonData);
        }
        //gets all courses
        public static List<Course> GetAll() => CourseDB;

        //gets single course by Id
        public static Course? Get(int id) => CourseDB
        .FirstOrDefault(course => course.Id == id);

        //update existing course
        public static void Update(Course course){
            //get index of course that matches givn c.id
            var index = CourseDB.FindIndex(c => c.Id == course.Id);

            // not found
            if(index == -1) return;

            //update by index
            CourseDB[index] = course;
        }

    }
}