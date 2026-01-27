package com.lms.innovation.dto.hotmart;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class HotmartDataDTO {
    private HotmartProductDTO product;
    private HotmartBuyerDTO buyer;
    private HotmartPurchaseDTO purchase;
}
