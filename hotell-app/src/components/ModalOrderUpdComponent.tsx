import React,{useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {ModalProps} from './ListBookingsComponent'
import Button from '@mui/material/Button';
import { Typography, MenuItem, TextField, Select, SelectChangeEvent, FormControl, InputLabel} from '@mui/material';
import { RoomInterface, RoomTypeInterface, UserInterface } from './InterfacesAndProps/Interfaces';
import {roomStorage} from './Storage/RoomStorage'
import {userStorage} from './Storage/UserStorage'
import { useStateServices } from './Storage/ServiceStorage';


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

interface BookingModalProps {
    open: boolean;
    onClose: () => void;
    orderId: string;
  }

export const ModalBookingComponentt: React.FC<BookingModalProps> = (props) => 
    {

        const [time, setTime] = useState('');
        const [newServiceName, setNewServiceName] = useState('');
        const [newServicePrice, setNewServicePrice] = useState(0);
        const [newServiceDescription, setNewServiceDescription] = useState('');
        const {updateOrder} = userStorage();
        const {updateService} = useStateServices(); 

        const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          setTime(event.target.value);
        };

        useEffect(()=>{
          
        },[])
        const setDateTime = (event: React.ChangeEvent<HTMLInputElement>) => {
          setTime(event.target.value);
        };
        const handleBooking = async() => {
          // Обработка бронирования комнаты
          // Можно выполнить дополнительную логику, например, отправку данных на сервер
            console.log('update');
            updateOrder(props.orderId, '1', '2', time, true);
        };


  return (
    <div>
      <Modal open={props.open} onClose={props.onClose}>
        <Box sx={{ ...style, width: 500 }}>
        <div>
        <TextField
          label="Начальная дата"
          type="date"
          value={time}
          onChange={setDateTime}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <Button variant="contained" color="primary" onClick={handleBooking}>
          update
        </Button>
      </div>
        </Box>
      </Modal>
    </div>
  );
}