import React from 'react';
import { Typography, Paper } from '@mui/material';
import { styled } from '@mui/system';
import {ImageTextComponentProps} from './InterfacesAndProps/Props'

const Container = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0),
}));

const ImageContainer = styled('div')(({ theme }) => ({
  marginRight: theme.spacing(2),
}));

const TextContainer = styled('div')(({ theme }) => ({
  flexGrow: 1,
}));

const ImageTextComponentSleva: React.FC<ImageTextComponentProps> = ({ title, description, imgPath }) => {
  return (
    <Container>
      <ImageContainer>
        <img src={imgPath} draggable={false} height={350} width={550}/>
      </ImageContainer>
      <TextContainer>
        <Typography variant="h4" textAlign={'left'}>{title}</Typography>
        <Typography variant="h6" textAlign={'left'}>{description}</Typography>
      </TextContainer>
    </Container>
  );
};

export default ImageTextComponentSleva;