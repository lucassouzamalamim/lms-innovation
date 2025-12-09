package com.lms.innovation.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendCredentials(String email, String password, String name) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Acesso liberado - LMS Innovation");
        message.setText("Olá " + name + ",\n\n" +
                "Seu acesso ao LMS Innovation foi liberado com sucesso!\n\n" +
                "Login: " + email + "\n" +
                "Senha: " + password + "\n\n" +
                "Acesse em: http://localhost:5173\n\n" +
                "Bons estudos!");

        mailSender.send(message);
    }

    public void sendCourseAccess(String email, String courseName, String name) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Novo Curso Liberado - " + courseName);
        message.setText("Olá " + name + ",\n\n" +
                "Você acaba de receber acesso ao curso: " + courseName + ".\n\n" +
                "Acesse sua plataforma para conferir o novo conteúdo.\n\n" +
                "Bons estudos!");

        mailSender.send(message);
    }
}
