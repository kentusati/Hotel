import React, { ChangeEvent } from 'react';
import { Box, CircularProgress, IconButton } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

interface UploadButtonProps {
  loading: boolean;
  onFileSelect: (file: File | null) => void; // функция для передачи выбранного файла родителю
}

const UploadButton: React.FC<UploadButtonProps> = ({ loading, onFileSelect }) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onFileSelect(file); // передаем выбранный файл родителю
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '2px dashed gray',
        padding: 1,
        borderRadius: 1,
        width: 100,
        height: 100,
        cursor: 'pointer',
      }}
    >
      <input
        accept="image/*"
        type="file"
        style={{ display: 'none' }}
        id="upload-button-file"
        onChange={handleFileChange}
      />
      <label htmlFor="upload-button-file">
        <IconButton component="span" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : <AddPhotoAlternateIcon />}
        </IconButton>
      </label>
    </Box>
  );
};

export default UploadButton;