package com.lms.innovation.controller;

import com.lms.innovation.dto.CourseDTO;
import com.lms.innovation.model.Course;
import com.lms.innovation.model.User;
import com.lms.innovation.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("courses")
public class CourseController {

    @Autowired
    private CourseRepository courseRepository;

    @GetMapping
    public ResponseEntity<List<CourseDTO>> listAll() {
        var courses = courseRepository.findAll().stream().map(CourseDTO::new).toList();
        return ResponseEntity.ok(courses);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')") // Só Admin cria curso
    public ResponseEntity<Void> create(@RequestBody CourseDTO data) {
        // Pega o usuário logado do contexto de segurança
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Course newCourse = new Course();
        newCourse.setTitulo(data.titulo());
        newCourse.setSlug(data.slug());
        newCourse.setDescricao(data.descricao());
        newCourse.setBannerUrl(data.bannerUrl());
        newCourse.setProfessor(user); // O criador é o professor (simplificação inicial)
        newCourse.setDataCriacao(java.time.LocalDateTime.now());

        courseRepository.save(newCourse);

        return ResponseEntity.ok().build();
    }
}
