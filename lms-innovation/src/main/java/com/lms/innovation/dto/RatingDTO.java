package com.lms.innovation.dto;

public class RatingDTO {
    public Integer userRating; // 0 if not rated
    public Double averageRating;
    public Long totalRatings;

    public RatingDTO(Integer userRating, Double averageRating, Long totalRatings) {
        this.userRating = userRating;
        this.averageRating = averageRating;
        this.totalRatings = totalRatings;
    }
}
