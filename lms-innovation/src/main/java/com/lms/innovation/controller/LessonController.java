package com.lms.innovation.controller;

import com.lms.innovation.dto.CreateLessonDTO;
import com.lms.innovation.dto.LessonDTO;
import com.lms.innovation.model.Lesson;
import com.lms.innovation.repository.LessonRepository;
import com.lms.innovation.repository.ModuleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("lessons")
public class LessonController {

    @Autowired
    private LessonRepository lessonRepository;

    @Autowired
    private ModuleRepository moduleRepository;

    @GetMapping
    public ResponseEntity<List<LessonDTO>> listAll() {
        var lessons = lessonRepository.findAll().stream().map(LessonDTO::new).toList();
        return ResponseEntity.ok(lessons);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')") // Só Admin cria aulas
    public ResponseEntity<LessonDTO> create(@RequestBody CreateLessonDTO data) {
        var module = moduleRepository.findById(data.moduleId())
                .orElseThrow(() -> new RuntimeException("Módulo não encontrado"));

        Lesson newLesson = new Lesson();
        newLesson.setTitulo(data.titulo());
        newLesson.setDescricao(data.descricao());
        newLesson.setVideoEmbedUrl(data.videoEmbedUrl());
        newLesson.setDuracaoSegundos(data.duracaoSegundos());
        newLesson.setOrdem(data.ordem());
        newLesson.setModule(module);
        newLesson.setMaterialApoioUrl(data.materialApoioUrl());

        var savedLesson = lessonRepository.save(newLesson);

        return ResponseEntity.ok(new LessonDTO(savedLesson));
    }
}
