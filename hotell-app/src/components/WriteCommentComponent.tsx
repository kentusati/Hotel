import React, { useState } from 'react';
import { Typography, TextField, Button, Rating } from '@mui/material';

interface CommentFormProps {
  onSubmit: (comment: string, rating: number) => void;
}

export const CommentForm: React.FC<CommentFormProps> = ({ onSubmit }) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState<number | null>(null);

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleRatingChange = (newValue: number | null) => {
    setRating(newValue);
  };

  const handleSubmit = () => {
    if (comment && rating) {
      onSubmit(comment, rating);
      setComment('');
      setRating(null);
    }
  };

  return (
    <div>
      <Typography variant="h6">Leave a Comment</Typography>
      <TextField
        label="Comment"
        multiline
        rows={4}
        value={comment}
        onChange={handleCommentChange}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <Rating
        name="rating"
        value={rating}
        onChange={(_, newValue) => handleRatingChange(newValue)}
        size="large"
        precision={1}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};
