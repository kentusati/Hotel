import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrderInterface, BookingInterface, UserInterface } from './InterfacesAndProps/Interfaces';
import { UserProps } from './InterfacesAndProps/Props';
import { userStorage } from './Storage/UserStorage';
import { Button, Card, CardContent, Typography, CardActions } from '@mui/material';

interface Props{
  orders: OrderInterface[] | null;
  bookings: BookingInterface[] | null;
  loading_orders: boolean;
  loading_bookings: boolean;
}

const UserComponent: React.FC<Props> = (props) => {

  const [orders, setOrders] = useState<OrderInterface[]>([]);
  const [bookings, setBookings] = useState<BookingInterface[]>([]);

  const navigate = useNavigate();
  const { isLoading, error, currentUser, deleteBooking, deleteOrder, setCurrentUser} = userStorage();

  const removeOrder = (id: string) => {
    setOrders((prevItems) => prevItems.filter((item) => item.id !== id));
  };
  const removeBooking = (id: string) => {
    setBookings((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  useEffect(() => {
    if(currentUser===null){
      const unparsedUser = localStorage.getItem("CurUser");
      if (unparsedUser !== null){
        const parsedUser: UserInterface = JSON.parse(unparsedUser);
        setCurrentUser(parsedUser);
      }
    }
  
    if( props.orders!==null && props.orders.length>0){
    setOrders(props.orders.filter(o=>o.userId==currentUser?.id));
    }
    if( props.bookings!==null && props.bookings.length>0){
    setBookings(props.bookings.filter(b=>b.userId==currentUser?.id));
    }
  }, [currentUser]);

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.setItem("CurUser","");
    localStorage.setItem("isAuth", JSON.stringify(false));
    navigate("/");
  };

  const handleCancelBooking = (bookingId:string) => {
    // Ваша логика отмены бронирования
    deleteBooking(bookingId);
    removeBooking(bookingId);
    console.log(`Отмена бронирования номера с ID: ${bookingId}`);
  };
  const handleCancelOrder = (orderId:string) => {
    // Ваша логика отмены бронирования
    deleteOrder(orderId);
    removeOrder(orderId);
    console.log(`Отмена бронирования номера с ID: ${orderId}`);
  };

  if(props.loading_bookings || props.loading_orders){
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
      {bookings.length == 0  ? (
        <Typography variant="body1" gutterBottom>
          У вас нет забронированных номеров.
        </Typography>
      ) : (
        bookings.map((booking, index) => (
          <Card key={index} style={{ marginBottom: '10px' }}>
            <CardContent>
              <Typography variant="h6" component="h2">
                Номер: {booking.room.roomNumber}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                Заезд: {booking.startTime.replace(/ 00:00:00$/, '')}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                Выезд: {booking.endTime.replace(/ 00:00:00$/, '')}
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
        Заказы:
      </Typography> 
      {orders.length == 0  ? (
        <Typography variant="body1" gutterBottom>
          У вас нет заказов.
        </Typography>
      ) : (
        orders.map((order, index) => (
          <Card key={index} style={{ marginBottom: '10px' }}>
            <CardContent>
              <Typography variant="h6" component="h2">
                Дата: {order.dateOfOrder}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                Заезд: {order.serviceId}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                Выезд: {order.id}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleCancelOrder(order.id)}
              >
                Отменить заказ
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