package com.lms.innovation.dto.hotmart;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class HotmartPurchaseDTO {
    private String transaction;
    private String status;
    private long orderDate;
}
