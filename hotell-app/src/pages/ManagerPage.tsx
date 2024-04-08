import React,{useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import ManagerPanelComponent from '../components/ManagerPanelComponent';
import { roomStorage } from '../components/Storage/RoomStorage';
import { useStateServices } from '../components/Storage/ServiceStorage'; 
import { userStorage } from '../components/Storage/UserStorage';
import { bookingStorage } from '../components/Storage/BookingStorage';

const ManagerPage: React.FC = () => {


  const {allRooms, fetchRooms} = roomStorage();
  const {bookingData, orderData,  addBooking, fetchBookings, fetchOrders} = bookingStorage();
  const {users, fetchUsers} = userStorage();
  const {data ,fetchServices} = useStateServices();

  const navigate = useNavigate();
  const [isAuth, setAuth] = useState(Boolean)
  useEffect( () => {

    const unparsed = String(localStorage.getItem("isAuth"));
    if(unparsed !== null){
    const parsed = Boolean(JSON.parse(unparsed));
    setAuth(parsed);
    }
    if(localStorage.getItem("isAuth")==="false") navigate("/");


    const GetData = async () =>{
    await fetchBookings();
    await fetchOrders();
    await fetchRooms();
    await fetchUsers();
    await fetchServices();
    }
    GetData();
    console.log(bookingData)
  }, []);

  return (
    <div>
      <h1>Страница менеджера</h1>
      <ManagerPanelComponent orderData={orderData} allRooms={allRooms} bookingData={bookingData} users={users} services={data}/>
    </div>
  );
};

export default ManagerPage;