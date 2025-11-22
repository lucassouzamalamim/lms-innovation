package com.lms.innovation.dto;

import com.lms.innovation.model.Course;
import java.util.List;

public record CourseDetailsDTO(Long id, String titulo, String descricao, List<ModuleDTO> modules) {
    public CourseDetailsDTO(Course course) {
        this(
                course.getId(),
                course.getTitulo(),
                course.getDescricao(),
                course.getModules().stream().map(ModuleDTO::new).toList());
    }
}
