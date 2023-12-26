import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserProps } from './InterfacesAndProps/Props';
import {Link} from 'react-router-dom';
import { userStorage } from './Storage/UserStorage';
import { Button, Card, CardContent, Typography, CardActions } from '@mui/material';

const UserComponent: React.FC<UserProps> = () => {

  const navigate = useNavigate();
  const {userBookings, isLoading, error, currentUser, deleteBooking, fetchUserBookings, setCurrentUser} = userStorage();

  useEffect( () => {
    console.log(currentUser?.id);
    fetchUserBookings(currentUser?.id);
  }, []);

  const handleLogout = () => {
    setCurrentUser(null);
    navigate("/");
  };

  const handleCancelBooking = (bookingId:string) => {
    // Ваша логика отмены бронирования
    deleteBooking(bookingId);
    fetchUserBookings(currentUser?.id);
    console.log(`Отмена бронирования номера с ID: ${bookingId}`);
  };

  if(isLoading){
    return( <div> Loading... </div> )
  }
  if(error){
    return( <div> {error.message} </div> )
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Добро пожаловать, {currentUser?.email}!
      </Typography>

      <Typography variant="h5" gutterBottom>
        Забронированные номера:
      </Typography> 
      {userBookings == null  ? (
        <Typography variant="body1" gutterBottom>
          У вас нет забронированных номеров.
        </Typography>
      ) : (
        userBookings.map((booking, index) => (
          <Card key={index} style={{ marginBottom: '10px' }}>
            <CardContent>
              <Typography variant="h6" component="h2">
                Номер: {booking.room.roomNumber}
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
      <Button variant="contained" color="primary" onClick={handleLogout}>
        Выйти
      </Button>
    </div>
  );
};

export default UserComponent;