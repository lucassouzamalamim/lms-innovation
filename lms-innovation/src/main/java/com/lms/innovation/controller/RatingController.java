package com.lms.innovation.controller;

import com.lms.innovation.dto.RatingDTO;
import com.lms.innovation.model.Lesson;
import com.lms.innovation.model.LessonRating;
import com.lms.innovation.model.User;
import com.lms.innovation.repository.LessonRatingRepository;
import com.lms.innovation.repository.LessonRepository;
import com.lms.innovation.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.time.LocalDateTime;

@RestController
public class RatingController {

    @Autowired
    private LessonRatingRepository ratingRepository;

    @Autowired
    private LessonRepository lessonRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/lessons/{lessonId}/rating")
    public ResponseEntity<RatingDTO> getRating(@PathVariable Long lessonId, Principal principal) {
        User user = userRepository.findUserByEmail(principal.getName());

        LessonRating userRatingEntry = ratingRepository.findByLessonIdAndUserId(lessonId, user.getId()).orElse(null);
        Integer userStars = userRatingEntry != null ? userRatingEntry.getStars() : 0;

        Double avg = ratingRepository.getAverageRatingByLessonId(lessonId);
        Long total = ratingRepository.countByLessonId(lessonId);

        return ResponseEntity.ok(new RatingDTO(userStars, avg != null ? avg : 0.0, total));
    }

    @PostMapping("/lessons/{lessonId}/rate")
    public ResponseEntity<RatingDTO> rateLesson(@PathVariable Long lessonId, @RequestBody Integer stars,
            Principal principal) {
        if (stars < 1 || stars > 5) {
            return ResponseEntity.badRequest().build();
        }

        User user = userRepository.findUserByEmail(principal.getName());
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new RuntimeException("Lesson not found"));

        LessonRating rating = ratingRepository.findByLessonIdAndUserId(lessonId, user.getId())
                .orElse(new LessonRating());

        if (rating.getId() == null) {
            rating.setUser(user);
            rating.setLesson(lesson);
            rating.setCreatedAt(LocalDateTime.now());
        }

        rating.setStars(stars);
        ratingRepository.save(rating);

        // Return updated stats
        return getRating(lessonId, principal);
    }
}
