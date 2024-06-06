import React from "react"
import { ServiceInterface } from "./InterfacesAndProps/Interfaces"
import { Button, Typography, Paper } from "@mui/material"
import {styled} from'@mui/system';
import { userStorage } from "./Storage/UserStorage"; 


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
    index: number;
}

export const ServicesComponent: React.FC<ServiceProps> = (service) => {
    
    const selectedService = service.service;
    const {currentUser, makeOrder} = userStorage();
    
    const handleAddOrder = () => {
      makeOrder(Date.now().toString(), true, currentUser?.id, selectedService?.id);
    };

    return(
        <Container>
            <ImageContainer>
            <img src={"http://localhost:5139/uploads/"+service.index+".jpg"} draggable={false} height={200} width={250}/>
            </ImageContainer>
            <TextContainer>
            <Typography variant="h4" textAlign={'left'}>{selectedService.name}</Typography>
            <Typography variant="h5" textAlign={'left'}>{selectedService.price}BYN</Typography>
            <Typography variant="h6" textAlign={'left'}>{selectedService.description}</Typography>
            </TextContainer>
            <Button variant="contained" color="primary" onClick={handleAddOrder}>Заказ</Button>
        </Container>
    )
}