import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
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
import { DisplaySettings, Logout } from '@mui/icons-material';
import { userStorage } from './Storage/UserStorage';
import { useStateServices } from './Storage/ServiceStorage';
import UploadButton from '../components/UploadButton';


interface Props {
  comments: CommentInterface[];
  services: ServiceInterface[];
  users: UserInterface[];
  deleteComment: (id: string)=>void;
  deleteService: (id : string)=>void;
}


const AdminPanelComponent: React.FC<Props> = (props) => {
  
  const formData = new FormData();
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file); // сохраняем выбранный файл
  };

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

  const handleAddService = async () =>{
    
    if (selectedFile) {
      setLoading(true);
      formData.append('image', selectedFile);
      formData.append('name', newServiceName);
      formData.append('price', newServicePrice.toString());
      formData.append('description', newServiceDescription);

      try {
        const response = await axios.post('http://localhost:5139/api/Service/AddService', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Success:', response.data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
        setSelectedFile(null);
      }
    }

    
    const newTableService: ServiceInterface = {
      id: String(newService?.id),
      name: newServiceName,
      price: newServicePrice,
      description: newServiceDescription,
      image: '123',
    };
    //AddService(formData);

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
      <div style={{display: "flex", alignItems: "center"}}>
      <UploadButton loading={loading} onFileSelect={handleFileSelect}/>
      <TextField
        label="Название услуги"
        value={newServiceName}
        onChange={(e) => setNewServiceName(e.target.value)}
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
        label="Стоимость услуги"
        value={newServicePrice}
        onChange={(e) => setNewServicePrice(Number(e.target.value))}
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
        label="Описание услуги"
        value={newServiceDescription}
        onChange={(e) => setNewServiceDescription(e.target.value)}
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
      <Button variant="contained" color="primary" onClick={handleAddService}>
        Добавить услугу
      </Button>
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: 'white' }}>ID</TableCell>
            <TableCell sx={{ color: 'white' }}>Название услуги</TableCell>
            <TableCell sx={{ color: 'white' }}>стоимость</TableCell>
            <TableCell sx={{ color: 'white' }}>Действия</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {services.map((service,index) => (
            <TableRow key={index}>
              <TableCell sx={{ color: 'white' }}>{service.id}</TableCell>
              <TableCell sx={{ color: 'white' }}>{service.name}</TableCell>
              <TableCell sx={{ color: 'white' }}>{service.price}</TableCell>
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
        label="Почта менеджера"
        value={newManagerEmail}
        onChange={(e) => setNewManagerEmail(e.target.value)}
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
          label="Пароль"  type="password"
          autoComplete="current-password"
          value={newManagerPassword}
          onChange={(e) => setNewManagerPassword(e.target.value)}
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
          }}/>
      <Button variant="contained" color="primary" onClick={handleAddManager}>
        Добавить менеджера
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: 'white' }}>ID</TableCell>
            <TableCell sx={{ color: 'white' }}>Имя менеджера</TableCell>
            <TableCell sx={{ color: 'white' }}>Email</TableCell>
            <TableCell sx={{ color: 'white' }}>Действия</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {managers.map((manager, index) => (
            <TableRow key={index}>
              <TableCell sx={{ color: 'white' }}>{manager.id}</TableCell>
              <TableCell sx={{ color: 'white' }}>{manager.userName}</TableCell>
              <TableCell sx={{ color: 'white' }}>{manager.email}</TableCell>
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
            <TableCell sx={{ color: 'white' }}>ID</TableCell>
            <TableCell sx={{ color: 'white' }}>Текст комментария</TableCell>
            <TableCell sx={{ color: 'white' }}>Оценка</TableCell>
            <TableCell sx={{ color: 'white' }}>Действия</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.comments.map((comment) => (
            <TableRow key={comment.id}>
              <TableCell sx={{ color: 'white' }}>{comment.id}</TableCell>
              <TableCell sx={{ color: 'white' }}>{comment.text}</TableCell>
              <TableCell sx={{ color: 'white' }}>{comment.rating}</TableCell>
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