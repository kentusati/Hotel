import React, { useState, useEffect } from 'react';
import { OrderInterface, ServiceInterface } from './InterfacesAndProps/Interfaces';
import  ServiceProps  from '../pages/ServicePage';
import {styled} from'@mui/system';
import { ModalComponent } from './ModalComponent'
import {
  Typography,
} from '@mui/material';
import { ServicesComponent } from './SerivceComponent';
import { useStateServices } from './Storage/ServiceStorage';
import { userStorage } from './Storage/UserStorage';

export interface ModalProps{
  order: OrderInterface;
  open: boolean;
  onClose: () => void;
}

export interface ListServicesProps{
  services: ServiceInterface[];
  //onClick: () => void;
}

const ListServicesComponent: React.FC<ListServicesProps> = ( services ) => {
  const [selectedServices, setSelectedServices] = useState<ServiceInterface>();
  const {data,isLoading,error,fetchServices} = useStateServices(); 
  const {currentUser, makeOrder} = userStorage();

  useEffect(() =>  {
    fetchServices();
  }, []);

  const handleOrder = (service : ServiceInterface | undefined) => {
    setSelectedServices(selectedServices);

    console.log(service);
  };
  function handleClick() {
    handleOrder(selectedServices);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div style={{ margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>
        Бронирование номеров
      </Typography>
      <div>
      {data.map((service : ServiceInterface, index) => (
        <ServicesComponent key={index} index={index} service ={service} onClick={handleClick}/>
      ))}
      </div>
    </div>
  );
};

export default ListServicesComponent;