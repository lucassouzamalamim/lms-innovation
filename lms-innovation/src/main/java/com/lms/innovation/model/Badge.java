package com.lms.innovation.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tb_badges")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Badge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome; // Ex: "Maratonista"
    private String iconeUrl;

    @Column(unique = true)
    private String codigoRegra; // Ex: "10_AULAS_SEGUIDAS" (Usaremos isso no Service)

    private String descricao;
}
