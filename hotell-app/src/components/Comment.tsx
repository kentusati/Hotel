import React,{useState} from "react";
import { TextField, Button, Rating } from '@mui/material';
import { CommentInterface } from "./InterfacesAndProps/Interfaces";
import { FlashOnRounded } from "@mui/icons-material";


export const Comment: React.FC<CommentInterface> = (comment) => {

    const [editMode, setEditMode] = useState(false);
    const [editedContent, setEditedContent] = useState<string>('');

  const handleEdit = (commentId: string, content: string) => {
    setEditMode(true);
    setEditedContent((prevContent) => content);
  };

  const handleSave = (commentId: string) => {
    // Обновление комментария в локальном состоянии

    setEditMode(false);
    setEditedContent('');
    // Дополнительные действия с обновленным массивом комментариев
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditedContent('');
  };

  const handleRatingChange = (commentId: string, newRating: number | null) => {
    // Обновление оценки в локальном состоянии

  };


    return(

        <div key={comment.id}>
          <div>
            <strong>Пользователь:</strong> {comment.content}
          </div>
          <div>
            {editMode ?(
              <div>
                <TextField
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  multiline
                  rows={3}
                />
                <Button onClick={() => handleSave(comment.id)}>Сохранить</Button>
                <Button onClick={handleCancel}>Отмена</Button>
              </div>
            ) : (
              <div>
                <Button onClick={() => handleEdit(comment.id, comment.content)}>Редактировать</Button>
              </div>
            )}
          </div>
          <div>
            <strong>Оценка:</strong>
            <Rating
              value={comment.rating}
              onChange={(event, newRating) => handleRatingChange(comment.id, newRating)}
            />
          </div>
        </div>

    )

}
