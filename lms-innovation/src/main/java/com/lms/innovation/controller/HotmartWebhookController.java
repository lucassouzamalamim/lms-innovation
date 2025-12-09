package com.lms.innovation.controller;

import com.lms.innovation.dto.hotmart.HotmartWebhookDTO;
import com.lms.innovation.service.HotmartIntegrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/webhook/hotmart")
public class HotmartWebhookController {

    @Autowired
    private HotmartIntegrationService hotmartService;

    @PostMapping
    public ResponseEntity<Void> handleWebhook(@RequestBody HotmartWebhookDTO payload,
            @RequestHeader(value = "X-Hotmart-Hottok", required = false) String token) {
        // Fallback or specific validation logic can be added here if token is null
        // But service expects it.
        hotmartService.processWebhook(payload, token);
        return ResponseEntity.ok().build();
    }
}
