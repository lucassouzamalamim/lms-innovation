package com.lms.innovation.dto;

public record CreateLessonDTO(
        String titulo,
        String descricao,
        String videoEmbedUrl,
        Integer duracaoSegundos,
        Integer ordem,
        Long moduleId,
        String materialApoioUrl) {
}
