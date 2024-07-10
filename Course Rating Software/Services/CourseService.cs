using Models;

namespace Services;

public class CourseService {
    
    //each and every course added will be given available id
    static int availableId = 3;

    //temporary database -- cache
    static List<Course> CourseDB;

    //this class must not be instiated anymore --- "singleton"
    static CourseService(){
        //populate datavase
        CourseDB = new List<Course>(){
            new Course{
                Id = 0, 
                Name = "Introduction to Programming", 
                CourseId = "CS101",
                Body = "BLANK", 
                Rating = 4.5},

            new Course{
                Id = 1, 
                Name = "Math for Computer Science", 
                CourseId = "CS120",
                Body = "BLANK", 
                Rating = 4.3},

            new Course{
                Id = 2, 
                Name = "Advanced Programming Principals", 
                CourseId = "CS130",
                Body = "BLANK", 
                Rating = 3.9},
        };
    }

    //gets all courses
    public static List<Course> GetAll() => CourseDB;
}