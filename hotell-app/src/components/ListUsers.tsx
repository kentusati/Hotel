import React from 'react';
import { Grid, Typography, Button } from '@mui/material';
import { useStorage } from './Storage/StorageUsers';
import { UserInterface } from './InterfacesAndProps/Interfaces';

interface User {
  id: number;
  name: string;
  blocked: boolean;
}

const ListUsers: React.FC = () => {
  const { users, blockUser } = useState();


  const handleBlockUser = (userId: string) => {
    blockUser(userId);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Пользователи</Typography>
      </Grid>
      {users.map((user: UserInterface) => (
        <Grid item xs={12} key={user.id}>
          <Typography>{user.name}</Typography>
          <Typography>{user.isBlocked ? 'Заблокирован' : 'Активен'}</Typography>
          <Button
            variant="contained"
            color={user.isBlocked ? 'secondary' : 'primary'}
            onClick={() => handleBlockUser(user.id)}
          >
            {user.isBlocked ? 'Разблокировать' : 'Заблокировать'}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default ListUsers;