package com.lms.innovation.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "tb_enrollments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Enrollment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    private LocalDateTime dataInicio = LocalDateTime.now();
    private LocalDateTime dataConclusao;

    private Double progressoPercentual = 0.0;

    @Enumerated(EnumType.STRING)
    private EnrollmentStatus status; // ATIVO, BLOQUEADO, REEMBOLSADO
}
