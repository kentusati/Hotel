import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, CardActions, CardMedia, Typography } from '@mui/material';
import Img from '../img/hotel1.jpg'
import {RoomTypeInterface, BookingInterface} from './InterfacesAndProps/Interfaces'
import {BookingProps} from './InterfacesAndProps/Props'
import { useStateRooms } from './Storage/RoomStorage';
import {userStorage} from './Storage/UserStorage'
import { ModalBookingComponent } from './ModalBookingComponent'

export interface ModalProps{
  booking: BookingInterface;
  open: boolean;
  roomType: RoomTypeInterface;
  onClose: () => void;
}

const ListBookingsComponent: React.FC<BookingProps> = () => {
  const [selectedRoom, setSelectedRoom] = useState<RoomTypeInterface | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { rooms, data, isLoading, error, fetchRooms, fetchRoomsByTypeId } = useStateRooms();

  const handleOpen = async (room : RoomTypeInterface) => {
    setSelectedRoom(room);
    setModalOpen(true);
    await fetchRoomsByTypeId(room?.id);
    console.log(rooms);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    console.log()
    fetchRooms();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

    return (
      <div style={{maxWidth: 850, margin: '0 auto' }}>
        <Typography variant="h4" gutterBottom>
          Бронирование номеров
        </Typography>

        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {data.map((roomType, index) => (
          <Card key={index} sx={{ maxWidth: 400, flex: '0 0 50%',  margin: '10px' }}>
          <CardMedia
            sx={{ height: 140 }}
            image={roomType.img}
            title="Room"
        />
          <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                Тип:{roomType.type} ; Цена за день:{roomType.price_day}
              </Typography>
            <Typography variant="body2" color="text.secondary">
              {roomType.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => handleOpen(roomType)}>Show More</Button>
          </CardActions>
        </Card>
        ))}
        <ModalBookingComponent
        open={modalOpen}
        onClose={handleCloseModal}
        room = {selectedRoom}
        rooms={rooms}
      />
        </div>
      </div>
    );
};

export default ListBookingsComponent;