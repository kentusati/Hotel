import React, { useEffect } from 'react';
import AdminPanelComponent from '../components/AdminPanelComponent';
import { userStorage } from '../components/Storage/UserStorage';
import { roomStorage } from '../components/Storage/RoomStorage';
import { bookingStorage } from '../components/Storage/BookingStorage';
import { commentStorage } from '../components/Storage/CommentStorage';
import { useStateServices } from '../components/Storage/ServiceStorage';

const AdminPage: React.FC = () => {

  const {data, deleteService, fetchServices} = useStateServices();
  const {comments, getAllComments, deleteComment} = commentStorage();
  const {users, fetchUsers} = userStorage();

   useEffect( () => {
    const GetData = async () =>{
    await getAllComments();
    await fetchServices();
    await fetchUsers();
    }
    GetData();
  }, []);



  return (
    <div>
      <h1>Страница администратора</h1>
      <AdminPanelComponent comments={comments} services={data} users={users} deleteComment={deleteComment} deleteService={deleteService} />
    </div>
  );
};

export default AdminPage;