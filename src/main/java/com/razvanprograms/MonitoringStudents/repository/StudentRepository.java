package com.razvanprograms.MonitoringStudents.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.razvanprograms.MonitoringStudents.model.Student;
@Repository
public interface StudentRepository extends JpaRepository<Student, Integer> {
}
