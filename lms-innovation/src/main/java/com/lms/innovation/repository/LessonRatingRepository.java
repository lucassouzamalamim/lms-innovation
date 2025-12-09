package com.lms.innovation.repository;

import com.lms.innovation.model.LessonRating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface LessonRatingRepository extends JpaRepository<LessonRating, Long> {

    Optional<LessonRating> findByLessonIdAndUserId(Long lessonId, Long userId);

    @Query("SELECT AVG(r.stars) FROM LessonRating r WHERE r.lesson.id = :lessonId")
    Double getAverageRatingByLessonId(@Param("lessonId") Long lessonId);

    @Query("SELECT COUNT(r) FROM LessonRating r WHERE r.lesson.id = :lessonId")
    Long countByLessonId(@Param("lessonId") Long lessonId);
}
