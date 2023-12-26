import React, { useEffect } from 'react';
import AdminPanelComponent from '../components/AdminPanelComponent';
import { userStorage } from '../components/Storage/UserStorage';
import { useStateRooms } from '../components/Storage/RoomStorage';
import { useStateBookings } from '../components/Storage/BookingStorage';

const AdminPage: React.FC = () => {

  const {users, fetchUsers, blockUser,deleteBooking} = userStorage();
  const {rooms, fetchAllRooms} = useStateRooms();
  const {data, fetchBookings} = useStateBookings();

  useEffect(() => {
    console.log();
    fetchUsers();
    fetchBookings();
    fetchAllRooms();
  }, []);

  const handleBlockUser = (id: string) => {
    blockUser(id);
  }
  const handleOrderDelete = (id: string) => {
    deleteBooking(id);
  }


  return (
    <div>
      <h1>Страница администратора</h1>
      <AdminPanelComponent users={users} rooms={rooms} orders={data} onBlockUser={handleBlockUser} onDeleteOrder={handleOrderDelete}/>
    </div>
  );
};

export default AdminPage;