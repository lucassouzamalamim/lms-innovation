package com.lms.innovation.dto.hotmart;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class HotmartWebhookDTO {
    private String id;
    private long creationDate;
    private String event;
    private String version;
    private HotmartDataDTO data;
}
