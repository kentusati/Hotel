import React from "react"
import { ServiceInterface } from "./InterfacesAndProps/Interfaces"
import { Button, Typography, Paper } from "@mui/material"
import {styled} from'@mui/system';


  const Container = styled(Paper)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0),
  }));
  
  const ImageContainer = styled('div')(({ theme }) => ({
    marginRight: theme.spacing(0),
  }));
  
  const TextContainer = styled('div')(({ theme }) => ({
    flexGrow: 1,
}));
  
interface ServiceProps{
    service: ServiceInterface;
    onClick: () => void;
}

export const ServicesComponent: React.FC<ServiceProps> = (service) => {
    
    const selectedService = service.service;
    
    return(
        <Container key={selectedService.id}>
            <ImageContainer>
            <img src={selectedService.image} draggable={false} height={200} width={250}/>
            </ImageContainer>
            <TextContainer>
            <Typography variant="h4" textAlign={'left'}>{selectedService.name}</Typography>
            <Typography variant="h6" textAlign={'left'}>{selectedService.description}</Typography>
            </TextContainer>
            <Button variant="contained" color="primary" onClick={service.onClick}>подробнее</Button>
        </Container>
    )
}