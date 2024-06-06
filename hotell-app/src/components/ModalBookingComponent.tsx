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
  color: 'black',
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
    room: RoomTypeInterface | null;
    rooms: RoomInterface[];
  }

export const ModalBookingComponent: React.FC<BookingModalProps> = 
    ({open,
    onClose,
    room,
    rooms,
    }) => 
    {

        const [startDate, setStartDate] = useState('');
        const [endDate, setEndDate] = useState('');
        const [selectedRoomId, setSelectedRoomId] = useState('');
        const {currentUser, setCurrentUser, makeBooking} = userStorage();

        const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          setStartDate(event.target.value);
        };
      
        const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          setEndDate(event.target.value);
        };
      
        const handleRoomChange = (event: SelectChangeEvent) => {
          setSelectedRoomId(event.target.value as string);
        };
      
        const handleBooking = async() => {
          // Обработка бронирования комнаты
          // Можно выполнить дополнительную логику, например, отправку данных на сервер
            console.log('Начальная дата:', startDate);
            console.log('Конечная дата:', endDate);
            console.log('Выбранная комната:', selectedRoomId);
            console.log(currentUser);
            await makeBooking(currentUser?.id, selectedRoomId, startDate, endDate);
        };


  return (
    <div>
      <Modal open={open} onClose={onClose}>
        <Box sx={{ ...style, width: 500 }}>
        <div>
        <Typography variant="h6">{room?.type}</Typography>
        <Typography variant="body1">Стоимость: {room?.price_day}</Typography>
        <Typography variant="body1">Описание: {room?.description}</Typography>

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

        <FormControl>
        <InputLabel id="demo-simple-select-label">Room number</InputLabel>
        <Select value={selectedRoomId} onChange={handleRoomChange} margin='none' sx={{ minWidth: 120 }}
        label="Select Room">
          {rooms.filter(room=>room.available===true).map((room,index) => (
            <MenuItem key={index} value={room.id}>
              {room.roomNumber}
            </MenuItem>
          ))}
          </Select>
        </FormControl>


        <Button variant="contained" color="primary" onClick={handleBooking}>
          Забронировать
        </Button>
      </div>
        </Box>
      </Modal>
    </div>
  );
}