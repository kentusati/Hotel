import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
} from '@mui/material';
import { CommentInterface, OrderInterface, RoleInterface, ServiceInterface, UserInterface } from './InterfacesAndProps/Interfaces';
import { ModalBookingComponent } from './ModalServiceUpdComponent';
import { Logout } from '@mui/icons-material';
import { userStorage } from './Storage/UserStorage';
import { useStateServices } from './Storage/ServiceStorage';


interface Props {
  comments: CommentInterface[];
  services: ServiceInterface[];
  users: UserInterface[];
  deleteComment: (id: string)=>void;
  deleteService: (id : string)=>void;
}


const AdminPanelComponent: React.FC<Props> = (props) => {
  const [managers, setManagers] = useState<UserInterface[]>([]);
  const [services, setServices] = useState<ServiceInterface[]>([]);

  const [newServiceName, setNewServiceName] = useState('');
  const [newServicePrice, setNewServicePrice] = useState(0);
  const [newServiceDescription, setNewServiceDescription] = useState('');
  
  const [newManagerName, setNewManagerName] = useState('');
  const [newManagerEmail, setNewManagerEmail] = useState('');
  const [newManagerPassword, setNewManagerPassword] = useState('');


  const {currentUser ,setCurrentUser, newManager, AddManager, deleteUser} = userStorage();
  const {updateService} = useStateServices();
  const { newService ,AddService, deleteService} = useStateServices();
  const navigate = useNavigate();



  useEffect(()=>{
    setManagers(props.users.filter(user=>user.role?.name==="Manager"));
    setServices(props.services);
  },[]);

  const handleAddService = () =>{
    AddService(newServiceName, newServicePrice, newServiceDescription);
    const newTableService: ServiceInterface = {
      id: String(newService?.id),
      name: newServiceName,
      price: newServicePrice,
      description: newServiceDescription,
      image: "123",
    };
    setServices([...services, newTableService]);
  }
  const handleDeleteService = (id: string) => {
    const updatedManagers = services.filter((service) => service.id !== id);
    setServices(updatedManagers);
    deleteService(id);
  };
  const handleUpdateService = (id: string) => {
    const updatedManagers = services.filter((service) => service.id !== id);
    setServices(updatedManagers);

  };

  const handleAddManager = () => {
    AddManager(newManagerName, newManagerEmail, newManagerPassword);
    const newTableManager: UserInterface = {
      id: String(newManager?.id),
      userName: newManagerName,
      email: newManagerEmail,
      isBlocked: false,
      roleId: String(newManager?.roleId),
      role: newManager?.role,
      // Дополнительные поля для менеджера
    };

    setManagers([...managers, newTableManager]);
    setNewManagerName('');
  };
  const handleDeleteManager = (id: string) => {
    const updatedManagers = managers.filter((manager) => manager.id !== id);
    setManagers(updatedManagers);
    deleteUser(id);
  };

  const handleDeleteComment = (id: string) => {
    props.deleteComment(id);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    navigate("/");
  };


  const [orderId, setServiceId] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = async (service : ServiceInterface) => {
    setModalOpen(true);
    setServiceId(service.id);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };


  return (
    <Container>
      <Button onClick={handleLogout} variant='contained'>Выход</Button>
      <Typography variant="h4">Каталог услуг</Typography>
      <TextField
        label="Название услуги"
        value={newServiceName}
        onChange={(e) => setNewServiceName(e.target.value)}
      />
      <TextField
        label="Стоимость услуги"
        value={newServicePrice}
        onChange={(e) => setNewServicePrice(Number(e.target.value))}
      />
      <TextField
        label="Описание услуги"
        value={newServiceDescription}
        onChange={(e) => setNewServiceDescription(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleAddService}>
        Добавить услугу
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Название услуги</TableCell>
            <TableCell>стоимость</TableCell>
            <TableCell>Действия</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {services.map((service,index) => (
            <TableRow key={index}>
              <TableCell>{service.id}</TableCell>
              <TableCell>{service.name}</TableCell>
              <TableCell>{service.price}</TableCell>
              <TableCell>
                <Button onClick={() => handleDeleteService(service.id)}>
                  Удалить
                </Button>
                <Button onClick={() => handleOpen(service)}>
                  Изменить
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ModalBookingComponent
        open={modalOpen}
        onClose={handleCloseModal}
        serviceId={orderId}
      />
      <Typography variant="h4">Менеджеры</Typography>
      <TextField
        label="Имя менеджера"
        value={newManagerName}
        onChange={(e) => setNewManagerName(e.target.value)}
      />
      <TextField
        label="Почта менеджера"
        value={newManagerEmail}
        onChange={(e) => setNewManagerEmail(e.target.value)}
      />
      <TextField
          label="Пароль"  type="password"
          autoComplete="current-password"
          value={newManagerPassword}
          onChange={(e) => setNewManagerPassword(e.target.value)}/>
      <Button variant="contained" color="primary" onClick={handleAddManager}>
        Добавить менеджера
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Имя менеджера</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Действия</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {managers.map((manager, index) => (
            <TableRow key={index}>
              <TableCell>{manager.id}</TableCell>
              <TableCell>{manager.userName}</TableCell>
              <TableCell>{manager.email}</TableCell>
              <TableCell>
                <Button variant='contained' onClick={() => handleDeleteManager(String(manager.id))}>
                  Удалить
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Typography variant="h4">Комментарии пользователей</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Текст комментария</TableCell>
            <TableCell>Оценка</TableCell>
            <TableCell>Действия</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.comments.map((comment) => (
            <TableRow key={comment.id}>
              <TableCell>{comment.id}</TableCell>
              <TableCell>{comment.text}</TableCell>
              <TableCell>{comment.rating}</TableCell>
              <TableCell>
                <Button variant='contained' onClick={() => handleDeleteComment(comment.id)}>
                  Удалить
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default AdminPanelComponent;