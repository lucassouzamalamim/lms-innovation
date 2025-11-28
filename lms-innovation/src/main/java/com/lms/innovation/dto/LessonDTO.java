package com.lms.innovation.dto;

import com.lms.innovation.model.Lesson;

public record LessonDTO(Long id, String titulo, String videoEmbedUrl, Integer duracaoSegundos) {
    public LessonDTO(Lesson lesson) {
        this(lesson.getId(), lesson.getTitulo(), lesson.getVideoEmbedUrl(), lesson.getDuracaoSegundos());
    }
}
