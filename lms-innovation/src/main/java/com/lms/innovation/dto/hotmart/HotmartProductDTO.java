package com.lms.innovation.dto.hotmart;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class HotmartProductDTO {
    private long id;
    private String name;
}
