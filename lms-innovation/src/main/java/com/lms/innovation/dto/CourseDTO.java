package com.lms.innovation.dto;

import com.lms.innovation.model.Course;

public record CourseDTO(
        Long id,
        String titulo,
        String slug,
        String descricao,
        String bannerUrl,
        String professorNome // Apenas o nome para exibir no card
) {
    // Construtor auxiliar para converter Entidade -> DTO
    public CourseDTO(Course course) {
        this(
                course.getId(),
                course.getTitulo(),
                course.getSlug(),
                course.getDescricao(),
                course.getBannerUrl(),
                course.getProfessor() != null ? course.getProfessor().getNome() : "Desconhecido");
    }
}
