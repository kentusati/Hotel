import React,{useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {ModalProps} from './ListBookingsComponent'
import Button from '@mui/material/Button';
import { Typography, MenuItem, TextField, Select, SelectChangeEvent, FormControl, InputLabel} from '@mui/material';
import { RoomInterface, RoomTypeInterface, UserInterface } from './InterfacesAndProps/Interfaces';
import {roomStorage} from './Storage/RoomStorage'
import {userStorage} from './Storage/UserStorage'


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
    bookingId: string;
  }

export const ModalBookingComponent: React.FC<BookingModalProps> = (props) => 
    {

        const [startDate, setStartDate] = useState('');
        const [endDate, setEndDate] = useState('');
        const {currentUser, setCurrentUser, updateBooking} = userStorage();

        const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          setStartDate(event.target.value);
        };
      
        const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          setEndDate(event.target.value);
        };

      
        const handleBooking = async() => {
          // Обработка бронирования комнаты
          // Можно выполнить дополнительную логику, например, отправку данных на сервер
            console.log('update');
            await updateBooking(props.bookingId ,'1', '2', startDate, endDate);
        };


  return (
    <div>
      <Modal open={props.open} onClose={props.onClose}>
        <Box sx={{ ...style, width: 500 }}>
        <div>

        <TextField
          label="Начальная дата"
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          label="Конечная дата"
          type="date"
          value={endDate}
          onChange={handleEndDateChange}
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