package com.lms.innovation.controller;

import com.lms.innovation.dto.CreateModuleDTO;
import com.lms.innovation.dto.ModuleDTO;
import com.lms.innovation.model.Module;
import com.lms.innovation.repository.CourseRepository;
import com.lms.innovation.repository.ModuleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("modules")
public class ModuleController {

    @Autowired
    private ModuleRepository moduleRepository;

    @Autowired
    private CourseRepository courseRepository;

    @GetMapping
    public ResponseEntity<List<ModuleDTO>> listAll() {
        var modules = moduleRepository.findAll().stream().map(ModuleDTO::new).toList();
        return ResponseEntity.ok(modules);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')") // Só Admin cria módulos
    public ResponseEntity<ModuleDTO> create(@RequestBody CreateModuleDTO data) {
        var course = courseRepository.findById(data.courseId())
                .orElseThrow(() -> new RuntimeException("Curso não encontrado"));

        Module newModule = new Module();
        newModule.setTitulo(data.titulo());
        newModule.setOrdem(data.ordem());
        newModule.setCourse(course);

        var savedModule = moduleRepository.save(newModule);

        return ResponseEntity.ok(new ModuleDTO(savedModule));
    }
}
