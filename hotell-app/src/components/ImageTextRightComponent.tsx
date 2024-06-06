import React from 'react';
import { Typography, Paper } from '@mui/material';
import { styled } from '@mui/system';
import {ImageTextComponentProps} from './InterfacesAndProps/Props'

const Container = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0),
  background: '0,0,0,0',
  color: 'white',
}));

const ImageContainer = styled('div')(({ theme }) => ({
  marginLeft: theme.spacing(2), // Измените отступ, если нужно
}));

const TextContainer = styled('div')(({ theme }) => ({
  flexGrow: 1,
}));


const ImageTextComponentSprava: React.FC<ImageTextComponentProps> = ({ title, description, imgPath }) => {
  return (
    <Container>
      <TextContainer>
        <Typography variant="h4" textAlign={'right'}>{title}</Typography>
        <Typography variant="h6" textAlign={'right'}>{description}</Typography>
      </TextContainer>
      <ImageContainer>
        <img src={imgPath}  height={300} width={450}/>
      </ImageContainer>
    </Container>
  );
};

export default ImageTextComponentSprava;