import React, { useEffect, useState } from 'react';
import { TextField, Button, Rating } from '@mui/material';
import api from '../API/api'
import {CommentProps} from './InterfacesAndProps/Props'
import  {Comment}  from './Comment';
import { commentStorage } from './Storage/CommentStorage';

const ListCommentsComponent: React.FC = () => {
  
  const {comments, getAllComments} = commentStorage();

  useEffect(() => {
    const Get = async()=>{
    getAllComments();}
    Get();
  },[])

  return (
    <div>
      <h2>Комментарии</h2>
      {comments.map((item, index) => (
        <Comment key={index} id={item.id} text={item.text} rating={item.rating} userId={item.userId} user={item.user}></Comment>
      ))}
    </div>
  );
};

export default ListCommentsComponent;