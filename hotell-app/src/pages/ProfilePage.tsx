import React, {useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import UserComponent from '../components/ProfileComponent';
import { userStorage } from '../components/Storage/UserStorage';
import { UserInterface } from '../components/InterfacesAndProps/Interfaces';
import { bookingStorage } from '../components/Storage/BookingStorage';

const ProfilePage: React.FC = () => {
  // Здесь вы должны иметь доступ к информации о пользователе и логику разлогинивания
  //const {currentUser, setCurrentUser} = userStorage(); 
  const navigate = useNavigate();
  const {currentUser ,userBookings, fetchUserOrders, userOrders, fetchUserBookings} = userStorage();
  const { bookingData, orderData, isLoadingBookings, isLoadingOrders, fetchOrders ,fetchBookings} = bookingStorage(); 
  const [isAuth, setAuth] = useState(Boolean);


  const handleLogout = () => {
    // Логика разлогинивания пользователя
    // Например, перенаправление на страницу входа или очистка данных пользователя из состояния приложения
    console.log('Пользователь разлогинился');
  };

  useEffect(()=>{
    const Get = async() =>{
      //await fetchUserOrders(currentUser?.id);
      //await fetchUserBookings(currentUser?.id);
      await fetchBookings();
      await fetchOrders();
    }
    Get();
    
    const unparsed = String(localStorage.getItem("isAuth"));
    if(unparsed !== null){
    const parsed = Boolean(JSON.parse(unparsed));
    setAuth(parsed);
    }
    if(localStorage.getItem("isAuth")==="false") navigate("/");
  },[])

  return (
    <div>
      <NavBar/>
      <h1>Страница пользователя</h1>
      {isAuth && <UserComponent orders={orderData} bookings={bookingData} loading_bookings={isLoadingBookings} loading_orders={isLoadingOrders}/>}
    </div>
  );
};

export default ProfilePage;