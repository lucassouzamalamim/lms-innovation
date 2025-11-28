package com.lms.innovation.dto;

import com.lms.innovation.model.Module;
import java.util.List;

public record ModuleDTO(Long id, String titulo, List<LessonDTO> lessons) {
    public ModuleDTO(Module module) {
        this(
                module.getId(),
                module.getTitulo(),
                module.getLessons().stream().map(LessonDTO::new).toList());
    }
}
