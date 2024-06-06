import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Button , MenuItem, Select, FormControl,
 InputLabel, SelectChangeEvent, TextField, Grid
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { BookingInterface, OrderInterface, RoomInterface, ServiceInterface, UserInterface } from './InterfacesAndProps/Interfaces';
import { bookingStorage } from './Storage/BookingStorage';
import { userStorage } from './Storage/UserStorage';
import { roomStorage } from './Storage/RoomStorage';
import { ModalBookingComponent } from './ModalBookingComponent2';
import { ModalBookingComponentt } from './ModalOrderUpdComponent';


interface ManageProps{
  orderData: OrderInterface[],
  allRooms: RoomInterface[],
  bookingData: BookingInterface[],
  users: UserInterface[],
  services: ServiceInterface[],
} 

const ManagerPanelComponent: React.FC<ManageProps> = (props) => {
  const [bookings, setBookings] = useState<BookingInterface[]>([]);
  const [newBooking, setNewBooking] = useState<BookingInterface>();
  const [updateOrder, setUpdateOrder] = useState<Boolean>(false);

  const { roomsByType, data} = roomStorage();

  const navigate = useNavigate();
  const {setCurrentUser} = userStorage();


  useEffect(()=>{
    setBookings(props.bookingData);
    console.log(bookings)
  },[])

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.setItem("CurUser","");
    localStorage.setItem("isAuth", JSON.stringify(false));
    navigate("/");
  };
  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleLogout}>
        Выйти
      </Button>
      <h2>Добавление заказа</h2>
      <AddOrderComponent users={props.users} services={props.services}/>

      <h2>Добавление бронирования</h2>
      <AddBookingComponent users={props.users} rooms={props.allRooms}/>

      <h2>Bookings</h2>
      <BookingsTable bookingData={props.bookingData}/>

      <h2>Orders</h2>
      <OrdersTable orderData={props.orderData} UpdateOrder={setUpdateOrder}/>

      <h2>Rooms</h2>
      <RoomsTable roomsData={props.allRooms}/>
    </div>
  );
};

interface bookingTableProps{
  bookingData: BookingInterface[];
}
const BookingsTable: React.FC<bookingTableProps> = (props) => {
  const [bookings, setBookings] = useState<BookingInterface[]>(props.bookingData);
  const [bookingId, setBookingId] = useState<string>('');
  const {deleteBooking} = userStorage(); 

  const handleDeleteBooking = (id: string) => {
    setBookings(prevBookings => prevBookings.filter(booking => booking.id !== id));
    deleteBooking(id);
  };
  //======================================================

  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = async (booking : BookingInterface) => {
      setModalOpen(true);
      setBookingId(booking.id);
    };
    const handleCloseModal = () => {
      setModalOpen(false);
    };

  // Дополнительные функции для редактирования и создания записей

  return (
    <div>
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: 'white' }}>User Email</TableCell>
            <TableCell sx={{ color: 'white' }}>Date Start</TableCell>
            <TableCell sx={{ color: 'white' }}>Date End</TableCell>
            <TableCell sx={{ color: 'white' }}>Room Number</TableCell>
            <TableCell sx={{ color: 'white' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map((booking,index) => (
            <TableRow key={index}>
              <TableCell sx={{ color: 'white' }}>{booking.user.email}</TableCell>
              <TableCell sx={{ color: 'white' }}>
                {booking.startTime}
              </TableCell>
              <TableCell sx={{ color: 'white' }}>{booking.endTime}</TableCell>
              <TableCell sx={{ color: 'white' }}>{booking.room.roomNumber}</TableCell>
              <TableCell>
                <Button variant="contained" color="error" onClick={() => handleDeleteBooking(booking.id)}>
                  Delete
                </Button>
                <Button variant="contained" color="error" onClick={() => handleOpen(booking)}>
                  Update
                </Button>
                {/* Дополнительные кнопки для редактирования */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <ModalBookingComponent
        open={modalOpen}
        onClose={handleCloseModal}
        bookingId={bookingId}
      />
    </div>
  );
};

interface orderProps{
  users: UserInterface[];
  services: ServiceInterface[];
}
const AddOrderComponent: React.FC<orderProps> = (props) => {

  const { makeOrder } = userStorage();

  const [selectedUserId, setSelectedUserID] = useState("");
  const [selectedServiceId, setSelectedServiceId] = useState("");

  const handleServiceChange = (event: SelectChangeEvent) => {
    setSelectedServiceId(event.target.value as string);
  };
  const handleUserChange = (event: SelectChangeEvent) => {
    setSelectedUserID(event.target.value as string);
  };
  const handleAddOrder = () => {
    makeOrder(Date.now().toString(), true, selectedUserId, selectedServiceId);
  };

    return (
      <div>
        <FormControl>
        <InputLabel id="demo-simple-select-label" sx={{ color: 'white' }}>ServiceName</InputLabel>
        <Select value={selectedServiceId} onChange={handleServiceChange} margin='none' sx={{ minWidth: 120 , 
          color: 'white',
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
          '.MuiSvgIcon-root': {
            color: 'white',
          },
        }}
        label="Select Room">
          {props.services.map((service,index) => (
            <MenuItem key={index} value={service.id}>
              {service.name}
            </MenuItem>
          ))}
          </Select>
        </FormControl>
        <FormControl>
        <InputLabel id="demo-simple-select-label" sx={{ color: 'white' }}>UserEmail</InputLabel>
        <Select value={selectedUserId} onChange={handleUserChange} margin='none' sx={{ minWidth: 120 ,
         color: 'white',
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
          '.MuiSvgIcon-root': {
            color: 'white',
          },}}
        label="Select user">
          {props.users.map((user,index) => (
            <MenuItem key={index} value={user.id}>
              {user.email}
            </MenuItem>
          ))}
          </Select>
        </FormControl>
        <Button variant='contained' onClick={handleAddOrder}>Добавить</Button>
      </div>
    )
}


interface bookingProps{
  users: UserInterface[];
  rooms: RoomInterface[];
}
const AddBookingComponent: React.FC<bookingProps> = (props) => {


  const [rooms, setRooms] = useState<RoomInterface[]>(props.rooms);

  const handleToggleAvailability = (id: string) => {
    setRooms(prevRooms =>
      prevRooms.map(room =>
        room.id === id ? { ...room, available: !room.available } : room
      )
    );
  };

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



  const [selectedUserId, setSelectedUserID] = useState("");
  const [selectedServiceId, setSelectedServiceId] = useState("");

  const handleUserChange = (event: SelectChangeEvent) => {
    setSelectedUserID(event.target.value as string);
  };
  const handleAddBooking = () => {
    makeBooking(selectedUserId, selectedRoomId, startDate, endDate);
    handleToggleAvailability(selectedRoomId);
  };



    return (
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
          sx={{
            '& .MuiInputBase-input': {
              color: 'white',
            },
            '& .MuiInputLabel-root': {
              color: 'white',
            },
            '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',
            },
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
          sx={{
            '& .MuiInputBase-input': {
              color: 'white',
            },
            '& .MuiInputLabel-root': {
              color: 'white',
            },
            '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',
            },
          }}
        />

        <FormControl>
        <InputLabel id="demo-simple-select-label" sx={{ color: 'white' }}>Room number</InputLabel>
        <Select value={selectedRoomId} onChange={handleRoomChange} margin='none' sx={{ minWidth: 120 ,
          color: 'white',
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
          '.MuiSvgIcon-root': {
            color: 'white',
          },
        }}
        label="Select Room">
          {props.rooms.filter(room=>room.available===true).map((room,index) => (
            <MenuItem key={index} value={room.id}>
              {room.roomNumber}
            </MenuItem>
          ))}
          </Select>
        </FormControl>
        <FormControl>
        <InputLabel id="demo-simple-select-label" sx={{ color: 'white' }}>UserEmail</InputLabel>
        <Select value={selectedUserId} onChange={handleUserChange} margin='none' sx={{ minWidth: 120 ,
          color: 'white',
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
          '.MuiSvgIcon-root': {
            color: 'white',
          },
        }}
        label="Select user">
          {props.users.map((user,index) => (
            <MenuItem key={index} value={user.id}>
              {user.email}
            </MenuItem>
          ))}
          </Select>
        </FormControl>


        <Button variant="contained" color="primary" onClick={handleAddBooking}>
          Забронировать
        </Button>
      </div>
    )

}


interface orderTableProps{
  orderData: OrderInterface[];
  UpdateOrder: (zxc: Boolean) => void;
}
const OrdersTable: React.FC<orderTableProps> = (props) => {
  const [orders, setOrders] = useState<OrderInterface[]>(props.orderData);
  const {deleteOrder} = userStorage(); 

  const handleDeleteOrder = (id: string) => {
    setOrders(prevOrders => prevOrders.filter(order => order.id !== id));
    deleteOrder(id);
  };
  const handleUpdateOrder = (id: string) => {
    props.UpdateOrder(true);
  };

  const [orderId, setOrderId] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = async (order : OrderInterface) => {
    setModalOpen(true);
    setOrderId(order.id);
    console.log(orderId);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Дополнительные функции для создания записей

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: 'white' }}>Service Name</TableCell>
            <TableCell sx={{ color: 'white' }}>User Email</TableCell>
            <TableCell sx={{ color: 'white' }}>Price</TableCell>
            <TableCell sx={{ color: 'white' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order,index) => (
            <TableRow key={index}>
              <TableCell sx={{ color: 'white' }}>{order.serviceId}</TableCell>
              <TableCell sx={{ color: 'white' }}>{order.userId}</TableCell>
              <TableCell sx={{ color: 'white' }}>{order.dateOfOrder}</TableCell>
              <TableCell>
                <Button variant="contained" color="error" onClick={() => handleDeleteOrder(order.id)}>
                  Delete
                </Button>
                <Button variant="contained" color="error" onClick={() => handleOpen(order)}>
                  Update
                </Button>
                {/* Дополнительные кнопки для создания */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ModalBookingComponentt
        open={modalOpen}
        onClose={handleCloseModal}
        orderId={orderId}
      />
    </TableContainer>
  );
};

interface roomsTableData{
  roomsData: RoomInterface[];
}
const RoomsTable: React.FC<roomsTableData> = (props) => {
  const {makeRoomAvailable} = roomStorage();
  const [rooms, setRooms] = useState<RoomInterface[]>(props.roomsData);

  const handleToggleAvailability = (id: string) => {
    setRooms(prevRooms =>
      prevRooms.map(room =>
        room.id === id ? { ...room, available: !room.available } : room
      )
    );
    makeRoomAvailable(id);
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: 'white' }}>Room Number</TableCell>
            <TableCell sx={{ color: 'white' }}>Room Type</TableCell>
            <TableCell sx={{ color: 'white' }}>Available</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rooms.map(room => (
            <TableRow key={room.id}>
              <TableCell sx={{ color: 'white' }}>{room.roomNumber}</TableCell>
              <TableCell sx={{ color: 'white' }}>{room.roomTypeId}</TableCell>
              <TableCell sx={{ color: 'white' }}>
                <Checkbox
                  checked={room.available}
                  onChange={() => handleToggleAvailability(room.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ManagerPanelComponent;