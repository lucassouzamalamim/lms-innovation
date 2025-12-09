package com.lms.innovation.repository;

import com.lms.innovation.model.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    Enrollment findByUserAndCourse(com.lms.innovation.model.User user, com.lms.innovation.model.Course course);
}
