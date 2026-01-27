package com.lms.innovation.dto.hotmart;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class HotmartBuyerDTO {
    private String email;
    private String name;
}
