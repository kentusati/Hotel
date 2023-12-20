import React, { useState } from 'react';
import { ManagerInterface, RoleInterface, ServiceInterface } from './InterfacesAndProps/Interfaces';
import  ListUsers  from './ListUsers'
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
} from '@mui/material';
import { red } from '@mui/material/colors';

const AdminPanelComponent: React.FC = () => {
  const [managers, setManagers] = useState<ManagerInterface[]>([]);
  const [newManager, setNewManager] = useState<ManagerInterface>({
    id: '0',
    name: '',
    email: '',
    role: null,
  });
  const [catalog, setCatalog] = useState<ServiceInterface[]>([]);
  const [newCatalogItem, setNewCatalogItem] = useState<ServiceInterface>({
    id: '0',
    name: '',
    image: '',
    description: '',
    price: 0,
  });

  const handleAddManager = () => {
    setManagers([...managers, newManager]);
    setNewManager({
      id: '0',
      name: '',
      email: '',
      role: null,
    });
  };

  const handleDeleteManager = (index: number) => {
    const updatedManagers = [...managers];
    updatedManagers.splice(index, 1);
    setManagers(updatedManagers);
  };

  const handleAddCatalogItem = () => {
    setCatalog([...catalog, newCatalogItem]);
    setNewCatalogItem({
      id: '0',
      name: '',
      image:'',
      description: '',
      price: 0,
    });
  };

  const handleEditCatalogItem = (index: number) => {
    // Implement your logic to edit catalog item here
  };

  const handleDeleteCatalogItem = (index: number) => {
    const updatedCatalog = [...catalog];
    updatedCatalog.splice(index, 1);
    setCatalog(updatedCatalog);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setNewManager({ ...newManager, [name]: value });
  };

  const handleCatalogInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setNewCatalogItem({ ...newCatalogItem, [name]: value });
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Панель управления администратора
      </Typography>

      <Typography variant="h5" gutterBottom>
        Менеджеры:
      </Typography>
      {managers.length === 0 ? (
        <Typography variant="body1" gutterBottom>
          Нет менеджеров.
        </Typography>
      ) : (
        managers.map((manager, index) => (
          <Card key={manager.id} style={{ marginBottom: '10px' }}>
            <CardContent>
              <Typography  variant="h6" component="h2">
                Имя: {manager.name}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                Email: {manager.email}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDeleteManager(index)}
              >
                Удалить менеджера
              </Button>
            </CardActions>
          </Card>
        ))
      )}

      {/* Форма добавления менеджера */}
      <Typography variant="h5" gutterBottom>
        Добавить менеджера
      </Typography>
      <TextField
        label="Имя"
        name="name"
        value={newManager.name}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        name="email"
        value={newManager.email}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleAddManager}>
        Добавить менеджера
      </Button>

      <Typography variant="h5" gutterBottom>
        Каталог услуг:
      </Typography>
      {catalog.length === 0 ? (
        <Typography variant="body1" gutterBottom>
          Каталог услуг пуст.
        </Typography>
      ) : (
        catalog.map((item, index) => (
          <Card key={item.id} style={{ marginBottom: '10px' }}>
            <CardContent>
              <Typography variant="h6" component="h2">
                Название: {item.name}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                Описание: {item.description}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                Цена: {item.price}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleEditCatalogItem(index)}
              >
                Редактировать
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDeleteCatalogItem(index)}
              >
                Удалить
              </Button>
            </CardActions>
          </Card>
        ))
      )}

      {/* Форма добавления позиции каталога */}
      <Typography variant="h5" gutterBottom>
        Добавить позицию каталога
      </Typography>
      <TextField
        label="Название"
        name="name"
        value={newCatalogItem.name}
        onChange={handleCatalogInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Описание"
        name="description"
        value={newCatalogItem.description}
        onChange={handleCatalogInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Цена"
        name="price"
        type="number"
        value={newCatalogItem.price}
        onChange={handleCatalogInputChange}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddCatalogItem}
      >
        Добавить позицию каталога
      </Button>

      <ListUsers/>
    </div>
  );
};

export default AdminPanelComponent;