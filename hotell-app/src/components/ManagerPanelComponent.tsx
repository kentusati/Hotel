import React, { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

interface Booking {
  id: number;
  checkInDate: Date | null;
  checkOutDate: Date | null;
  isAvailable: boolean;
}

const ManagerPanelComponent: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [newBooking, setNewBooking] = useState<Booking>({
    id: 0,
    checkInDate: null,
    checkOutDate: null,
    isAvailable: true,
  });

  const handleAddBooking = () => {
    setBookings([...bookings, newBooking]);
    setNewBooking({
      id: 0,
      checkInDate: null,
      checkOutDate: null,
      isAvailable: true,
    });
  };

  const handleDeleteBooking = (index: number) => {
    const updatedBookings = [...bookings];
    updatedBookings.splice(index, 1);
    setBookings(updatedBookings);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewBooking({ ...newBooking, [name]: value });
  };

  const handleCheckInDateChange = (date: Date | null) => {
    setNewBooking({ ...newBooking, checkInDate: date });
  };

  const handleCheckOutDateChange = (date: Date | null) => {
    setNewBooking({ ...newBooking, checkOutDate: date });
  };

  const handleAvailabilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewBooking({ ...newBooking, isAvailable: event.target.checked });
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Панель управления менеджера
      </Typography>

      <Typography variant="h5" gutterBottom>
        Бронирования:
      </Typography>
      {bookings.length === 0 ? (
        <Typography variant="body1" gutterBottom>
          Нет бронирований.
        </Typography>
      ) : (
        bookings.map((booking, index) => (
          <Card key={booking.id} style={{ marginBottom: '10px' }}>
            <CardContent>
              <Typography variant="h6" component="h2">
                Бронь #{booking.id}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                Дата заезда: {booking.checkInDate?.toLocaleDateString()}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                Дата выезда: {booking.checkOutDate?.toLocaleDateString()}
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={booking.isAvailable}
                    onChange={handleAvailabilityChange}
                    name="isAvailable"
                  />
                }
                label="Доступен"
              />
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDeleteBooking(index)}
              >
                Отменить бронь
              </Button>
            </CardActions>
          </Card>
        ))
      )}

      {/* Форма добавления брони */}
      <Typography variant="h5" gutterBottom>
        Добавить бронь
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Дата заезда"
        name="checkInDate"
        value={newBooking.checkInDate}
        onChange={handleCheckInDateChange}
      />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Дата выезда"
          name="checkOutDate"
          value={newBooking.checkOutDate}
          onChange={handleCheckOutDateChange}
        />
      </LocalizationProvider>
      <FormControlLabel
        control={
          <Checkbox checked={newBooking.isAvailable} onChange={handleAvailabilityChange} />
        }
        label="Доступен"
      />
      <Button variant="contained" color="primary" onClick={handleAddBooking}>
        Добавить бронь
      </Button>
    </div>
  );
};

export default ManagerPanelComponent;