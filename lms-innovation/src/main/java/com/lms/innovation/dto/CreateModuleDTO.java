package com.lms.innovation.dto;

public record CreateModuleDTO(
        String titulo,
        Integer ordem,
        Long courseId) {
}
