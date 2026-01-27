package com.lms.innovation.repository;

import com.lms.innovation.model.LessonQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LessonQuestionRepository extends JpaRepository<LessonQuestion, Long> {
    List<LessonQuestion> findByLessonIdOrderByCreatedAtDesc(Long lessonId);
}
