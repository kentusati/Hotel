import React, { useState } from 'react';
import { TextField, Button, Rating } from '@mui/material';
import api from '../API/api'
import {CommentProps} from './InterfacesAndProps/Props'
import  {Comment}  from './Comment';

const ListCommentsComponent: React.FC<CommentProps> = ({ comments }) => {
  
  return (
    <div>
      <h2>Комментарии</h2>
      {comments.map((comment) => (
        <Comment id={comment.id} content={comment.content} rating={comment.rating}></Comment>
      ))}
    </div>
  );
};

export default ListCommentsComponent;