package com.lms.innovation.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "tb_courses")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;

    @Column(unique = true)
    private String slug; // ex: curso-java-spring

    @Column(columnDefinition = "TEXT")
    private String descricao;

    private String bannerUrl;

    @ManyToOne
    @JoinColumn(name = "professor_id")
    private User professor;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
    private List<Module> modules;

    private LocalDateTime dataCriacao = LocalDateTime.now();
}
