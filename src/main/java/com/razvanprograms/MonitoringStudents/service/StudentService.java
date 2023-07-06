package com.razvanprograms.MonitoringStudents.service;
import com.razvanprograms.MonitoringStudents.model.Student;
import java.util.List;
public interface StudentService {
    public Student saveStudent(Student student);
    public List <Student> getAllStudents();
}
