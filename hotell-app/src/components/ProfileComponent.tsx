import React from 'react';
import { UserProps } from './InterfacesAndProps/Props';
import {Link} from 'react-router-dom';
import { Button, Card, CardContent, Typography, CardActions } from '@mui/material';

const UserComponent: React.FC<UserProps> = ({ user }) => {
  const handleLogout = () => {
    window.location.href = '/';
  };

  const handleCancelBooking = (bookingId:string) => {
    // Ваша логика отмены бронирования
    console.log(`Отмена бронирования номера с ID: ${bookingId}`);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Добро пожаловать, {user.name}!
      </Typography>

      <Typography variant="h5" gutterBottom>
        Забронированные номера:
      </Typography>
      {user.roomBookings.length === 0 ? (
        <Typography variant="body1" gutterBottom>
          У вас нет забронированных номеров.
        </Typography>
      ) : (
        user.roomBookings.map((booking) => (
          <Card key={booking.id} style={{ marginBottom: '10px' }}>
            <CardContent>
              <Typography variant="h6" component="h2">
                Номер: {booking.roomNumber}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                Заезд: {booking.checkInDate?.toString()}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                Выезд: {booking.checkOutDate?.toString()}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleCancelBooking(booking.id)}
              >
                Отменить бронирование
              </Button>
            </CardActions>
          </Card>
        ))
      )}

      <Typography variant="h5" gutterBottom>
        Ваши заказы в номерах:
      </Typography>
      {user.orders.length === 0 ? (
        <Typography variant="body1" gutterBottom>
          У вас нет заказов в номерах.
        </Typography>
      ) : (
        user.orders.map((order) => (
          <Card key={order.id} style={{ marginBottom: '10px' }}>
            <CardContent>
              <Typography variant="h6" component="h2">
                Номер: {order.roomNumber}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                Услуга: {order.service}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}

      <Button variant="contained" color="primary" onClick={handleLogout}>
        Выйти
      </Button>
    </div>
  );
};

export default UserComponent;