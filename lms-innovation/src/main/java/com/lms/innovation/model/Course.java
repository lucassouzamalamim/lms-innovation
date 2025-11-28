package com.lms.innovation.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.HashSet;

@Entity
@Table(name = "tb_courses")
@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@AllArgsConstructor
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
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
    @OrderBy("ordem ASC")
    private Set<Module> modules = new HashSet<>();

    private LocalDateTime dataCriacao = LocalDateTime.now();
}
