package com.lms.innovation.service;

import com.lms.innovation.dto.hotmart.HotmartWebhookDTO;
import com.lms.innovation.model.*;
import com.lms.innovation.repository.CourseRepository;
import com.lms.innovation.repository.EnrollmentRepository;
import com.lms.innovation.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class HotmartIntegrationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private EmailService emailService;

    @Value("${hotmart.token}")
    private String hotmartToken;

    public void processWebhook(HotmartWebhookDTO payload, String token) {
        if (!hotmartToken.equals(token)) {
            throw new RuntimeException("Invalid Hotmart Token");
        }

        String event = payload.getEvent();

        if ("PURCHASE_APPROVED".equals(event)) {
            handlePurchaseApproved(payload);
        } else if ("REFUNDED".equals(event) || "CHARGEBACK".equals(event)) {
            handleRefund(payload);
        }
        // Outros eventos podem ser ignorados por enquanto
    }

    private void handlePurchaseApproved(HotmartWebhookDTO payload) {
        String email = payload.getData().getBuyer().getEmail();
        String name = payload.getData().getBuyer().getName();
        Long productId = payload.getData().getProduct().getId();

        User user = userRepository.findUserByEmail(email);
        boolean isNewUser = false;
        String rawPassword = UUID.randomUUID().toString().substring(0, 8);

        if (user == null) {
            isNewUser = true;
            user = User.builder()
                    .nome(name)
                    .email(email)
                    .senha(new BCryptPasswordEncoder().encode(rawPassword))
                    .role(UserRole.ALUNO)
                    .xpTotal(0L)
                    .nivelAtual(1)
                    .build();
            userRepository.save(user);
        }

        // Encontrar curso correspondente (Assumindo ProductID = CourseID)
        Course course = courseRepository.findById(productId).orElse(null);
        if (course != null) {
            Enrollment enrollment = enrollmentRepository.findByUserAndCourse(user, course);
            if (enrollment == null) {
                enrollment = new Enrollment();
                enrollment.setUser(user);
                enrollment.setCourse(course);
                enrollment.setDataInicio(LocalDateTime.now());
                enrollment.setStatus(EnrollmentStatus.ATIVO);
                enrollmentRepository.save(enrollment);

                if (isNewUser) {
                    emailService.sendCredentials(email, rawPassword, name);
                } else {
                    emailService.sendCourseAccess(email, course.getTitulo(), name);
                }
            } else {
                // Reativa se estiver bloqueado
                if (enrollment.getStatus() != EnrollmentStatus.ATIVO) {
                    enrollment.setStatus(EnrollmentStatus.ATIVO);
                    enrollmentRepository.save(enrollment);
                }
            }
        } else {
            System.out.println("Course not found for product ID: " + productId);
        }
    }

    private void handleRefund(HotmartWebhookDTO payload) {
        String email = payload.getData().getBuyer().getEmail();
        Long productId = payload.getData().getProduct().getId();

        User user = userRepository.findUserByEmail(email);
        if (user != null) {
            Course course = courseRepository.findById(productId).orElse(null);
            if (course != null) {
                Enrollment enrollment = enrollmentRepository.findByUserAndCourse(user, course);
                if (enrollment != null) {
                    enrollment.setStatus(EnrollmentStatus.REEMBOLSADO);
                    enrollmentRepository.save(enrollment);
                }
            }
        }
    }
}
