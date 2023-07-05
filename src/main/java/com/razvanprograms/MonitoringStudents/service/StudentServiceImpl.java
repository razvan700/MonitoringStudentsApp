package com.razvanprograms.MonitoringStudents.service;

import com.razvanprograms.MonitoringStudents.model.Student;
import com.razvanprograms.MonitoringStudents.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentServiceImpl implements StudentService {
    @Autowired
    private StudentRepository studentRepository;

    @Override
    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }
}
