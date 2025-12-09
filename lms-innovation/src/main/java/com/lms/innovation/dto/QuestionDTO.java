package com.lms.innovation.dto;

import java.time.LocalDateTime;
import java.util.List;

public class QuestionDTO {
    public Long id;
    public String text;
    public LocalDateTime createdAt;
    public String userName;
    public List<ReplyDTO> replies;
}
