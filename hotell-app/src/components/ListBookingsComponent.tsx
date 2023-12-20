import React, { useState } from 'react';
import { Button, Card, CardContent, CardActions, CardMedia, Typography } from '@mui/material';
import {RoomInterface} from './InterfacesAndProps/Interfaces'
import {BookingProps} from './InterfacesAndProps/Props'



const ListBookingsComponent: React.FC<BookingProps> = ({ rooms }) => {
  const [selectedRoom, setSelectedRoom] = useState<RoomInterface | null>(null);

  const handleRoomSelect = (room: RoomInterface) => {
    setSelectedRoom(room);
  };

  const handleBooking = () => {
    if (selectedRoom) {
      // Process room booking here
      console.log(`Забронирован номер ${selectedRoom.number}`);
    }
  };

  return (
    <div style={{maxWidth: 850, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>
        Бронирование номеров
      </Typography>

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {rooms.map((room) => (
        <Card sx={{ maxWidth: 400, flex: '0 0 50%',  margin: '10px' }}>
        <CardMedia
          sx={{ height: 140 }}
          image={room.image}
          title="Room"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            StandartRoom
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Номер стандарт в отеле представляет собой комфортное пространство,
           созданное для обеспечения базовых потребностей гостей. Этот тип номера обычно предлагает удобства,
            которые отражают стандарты и предпочтения большинства посетителей.Номер стандарт - это просторное и уютное помещение,
             созданное для обеспечения комфорта и удобства гостей.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
      ))}
      </div>

      {selectedRoom && (
        <Card style={{ marginTop: '20px' }}>
          <CardContent>
            <Typography variant="h6" component="h2">
              Выбранный номер: {selectedRoom.number}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              Тип: {selectedRoom.type}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              Описание: {selectedRoom.description}
            </Typography>
            <Button variant="contained" color="primary" onClick={handleBooking}>
              Забронировать
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ListBookingsComponent;