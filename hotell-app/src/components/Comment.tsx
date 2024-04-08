import React,{useState} from "react";
import {Button, Rating, TextField, Typography } from '@mui/material';
import { CommentInterface } from "./InterfacesAndProps/Interfaces";
import { FlashOnRounded } from "@mui/icons-material";


export const Comment: React.FC<CommentInterface> = (comment) => {


    return(

        <div key={comment.id}>
          <div>
            <strong>{comment.user.userName}</strong> {comment.text}
          </div>
          <div>
          </div>
          <div>
            <strong>Оценка:</strong>
            <Rating
              value={comment.rating}
            />
          </div>
        </div>

    )

}
