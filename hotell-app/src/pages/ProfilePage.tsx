import React from 'react';
import NavBar from '../components/NavBar';
import UserComponent from '../components/ProfileComponent';

const ProfilePage: React.FC = () => {
  // Здесь вы должны иметь доступ к информации о пользователе и логику разлогинивания
  const user = {
    id: 1,
    email: '1111@test.com',
    name: 'John Doe',
    roomBookings: [
      {
        id: 1,
        roomNumber: '101',
        checkInDate: '2023-12-10',
        checkOutDate: '2023-12-15',
      },
      {
        id: 2,
        roomNumber: '202',
        checkInDate: '2023-12-20',
        checkOutDate: '2023-12-25',
      },
    ],
    orders: [
      {
        id: 1,
        service: 'Прокат велосипедов',
        roomNumber: '101',
      },
      {
        id: 2,
        service: 'Ужин в номер',
        roomNumber: '202',
      },
    ],
  };

  const handleLogout = () => {
    // Логика разлогинивания пользователя
    // Например, перенаправление на страницу входа или очистка данных пользователя из состояния приложения
    console.log('Пользователь разлогинился');
  };

  return (
    <div>
        <NavBar/>
      <h1>Страница пользователя</h1>
      <UserComponent user={user}/>
    </div>
  );
};

export default ProfilePage;