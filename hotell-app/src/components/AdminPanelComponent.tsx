import React from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { BookingInterface, RoomInterface, UserInterface } from './InterfacesAndProps/Interfaces';

interface AdminPanelComponentProps {
  users: UserInterface[];
  rooms: RoomInterface[];
  orders: BookingInterface[];
  onBlockUser: (userId: string) => void;
  onDeleteOrder: (orderId: string) => void;
}

const AdminPanelComponent: React.FC<AdminPanelComponentProps> = ({
  users,
  rooms,
  orders,
  onBlockUser,
  onDeleteOrder,
}) => {
  const handleUserBlock = (userId:string) => {
    onBlockUser(userId);
  };

  const handleOrderDelete = (orderId: string) => {
    onDeleteOrder(orderId);
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <h3>Users</h3>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Blocked</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.isBlocked ? 'Yes' : 'No'}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color={user.isBlocked ? 'primary' : 'secondary'}
                    onClick={() => handleUserBlock(user.id)}
                  >
                    {user.isBlocked ? 'Unblock' : 'Block'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <h3>Rooms</h3>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms.map((room, index) => (
              <TableRow key={index}>
                <TableCell>{room.id}</TableCell>
                <TableCell>{room.roomNumber}</TableCell>
                <TableCell>{room.roomTypeId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <h3>Orders</h3>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow key={index}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.roomId}</TableCell>
                <TableCell>{order.userId}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleOrderDelete(order.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminPanelComponent;