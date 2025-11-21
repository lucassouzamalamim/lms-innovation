package com.lms.innovation.dto;

import com.lms.innovation.model.UserRole;

public record RegisterDTO(String nome, String email, String password, UserRole role) {
}
