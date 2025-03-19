import React, { useState } from "react";

const RatingWidget = ({ productId, onRatingSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (rating > 0) {
      onRatingSubmit(productId, rating);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2000); // Reset message after 2 seconds
      setRating(0);
    } else {
      alert("Please select a rating before submitting!");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "10px" }}>
      <div>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") setRating(star);
            }}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            onClick={() => setRating(star)}
            style={{
              fontSize: "25px",
              cursor: "pointer",
              color: star <= (hoveredRating || rating) ? "gold" : "gray",
              transition: "color 0.2s"
            }}
          >
            ★
          </span>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        style={{
          marginTop: "10px",
          padding: "8px 12px",
          backgroundColor: rating > 0 ? "#28a745" : "#ccc",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: rating > 0 ? "pointer" : "not-allowed",
          transition: "background-color 0.3s"
        }}
        disabled={rating === 0}
      >
        Submit Rating
      </button>
      {submitted && <p style={{ color: "green", marginTop: "8px" }}>✔ Rating submitted!</p>}
    </div>
  );
};

export default RatingWidget;
