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
import { DateCalendar } from '@mui/x-date-pickers';

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

  useEffect(() =>  {
    fetchServices();
  }, []);

 

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
      {data.map((service : ServiceInterface, index) => (
        <ServicesComponent key={index} index={index} service={service}/>
      ))}
    </div>
  );
};

export default ListServicesComponent;