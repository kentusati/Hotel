import React, { useState } from 'react';
import { OrderInterface, ServiceInterface } from './InterfacesAndProps/Interfaces';
import  ServiceProps  from '../pages/ServicePage';
import {styled} from'@mui/system';
import { ModalComponent } from './ModalComponent'
import {
  Typography,
} from '@mui/material';
import { ServicesComponent } from './SerivceComponent';

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
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = (service : ServiceInterface | undefined) => {
    setSelectedServices(selectedServices);
    setModalOpen(true);
    console.log(service);
  };
  const handleClose = () => {
    setModalOpen(false);
  };
  function handleClick() {
    handleOpen(selectedServices);
  }

  /*const handleServiceToggle = (serviceId: string) => {
    setSelectedServices((prevSelectedServices) => {
      if (prevSelectedServices.includes(serviceId)) {
        return prevSelectedServices.filter((id) => id !== serviceId);
      } else {
        return [...prevSelectedServices, serviceId];
      }
    });
  };*/

  const handleOrder = () => {
    // Обработка заказа услуг
    setModalOpen(true);
    console.log(modalOpen);
  };

  return (
    <div style={{ margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>
        Бронирование номеров
      </Typography>
      <div>
      {services.services.map((service : ServiceInterface) => (
        <ServicesComponent service ={service} onClick={handleClick}/>
      ))}
            {modalOpen && <ModalComponent open={modalOpen} onClose={handleClose}>
      <div/>
      </ModalComponent>}
      </div>
    </div>
  );
};

export default ListServicesComponent;