package com.lms.innovation.controller;

import com.lms.innovation.dto.*;
import com.lms.innovation.model.*;
import com.lms.innovation.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class QuestionController {

    @Autowired
    private LessonQuestionRepository questionRepository;

    @Autowired
    private QuestionReplyRepository replyRepository;

    @Autowired
    private LessonRepository lessonRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/lessons/{lessonId}/questions")
    public ResponseEntity<List<QuestionDTO>> getQuestions(@PathVariable Long lessonId) {
        List<LessonQuestion> questions = questionRepository.findByLessonIdOrderByCreatedAtDesc(lessonId);
        List<QuestionDTO> dtos = questions.stream().map(this::convertToDTO).collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @PostMapping("/lessons/{lessonId}/questions")
    public ResponseEntity<QuestionDTO> createQuestion(@PathVariable Long lessonId, @RequestBody CreateQuestionDTO dto,
            java.security.Principal principal) {
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new RuntimeException("Lesson not found"));

        // Find user by email (username) from Principal
        User user = userRepository.findUserByEmail(principal.getName());
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        LessonQuestion question = new LessonQuestion();
        question.setText(dto.getText());
        question.setLesson(lesson);
        question.setUser(user);
        question.setCreatedAt(LocalDateTime.now());

        LessonQuestion saved = questionRepository.save(question);
        return ResponseEntity.ok(convertToDTO(saved));
    }

    @PostMapping("/questions/{questionId}/replies")
    public ResponseEntity<ReplyDTO> createReply(@PathVariable Long questionId, @RequestBody CreateReplyDTO dto,
            java.security.Principal principal) {
        LessonQuestion question = questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found"));

        User user = userRepository.findUserByEmail(principal.getName());
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        QuestionReply reply = new QuestionReply();
        reply.setText(dto.getText());
        reply.setQuestion(question);
        reply.setUser(user);
        reply.setCreatedAt(LocalDateTime.now());

        QuestionReply saved = replyRepository.save(reply);
        return ResponseEntity.ok(convertToReplyDTO(saved));
    }

    private QuestionDTO convertToDTO(LessonQuestion q) {
        QuestionDTO dto = new QuestionDTO();
        dto.id = q.getId();
        dto.text = q.getText();
        dto.createdAt = q.getCreatedAt();
        dto.userName = q.getUser().getNome(); // Assuming User has 'nome'
        dto.replies = q.getReplies().stream().map(this::convertToReplyDTO).collect(Collectors.toList());
        return dto;
    }

    private ReplyDTO convertToReplyDTO(QuestionReply r) {
        ReplyDTO dto = new ReplyDTO();
        dto.id = r.getId();
        dto.text = r.getText();
        dto.createdAt = r.getCreatedAt();
        dto.userName = r.getUser().getNome(); // Assuming User has 'nome'
        return dto;
    }
}
