package com.lms.innovation.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tb_lessons")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Lesson {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;
    private String descricao;

    // Ex: <iframe src="vimeo..."></iframe> ou apenas a URL
    private String videoEmbedUrl;

    private Integer duracaoSegundos;
    private Integer ordem; // Aula 1, Aula 2...

    @ManyToOne
    @JoinColumn(name = "module_id")
    private Module module;

    // Para a "Innovation": Material de apoio e Quiz atrelado
    private String materialApoioUrl;

    @OneToOne(mappedBy = "lesson", cascade = CascadeType.ALL)
    private Quiz quiz;
}
