import { create } from 'zustand'
import Img from '../img/hotel1.jpg'
import { UserInterface, RoleInterface, BookingInterface, OrderInterface } from '../InterfacesAndProps/Interfaces'
import axios from 'axios'

interface UserState{
    users: UserInterface[];
    loading: boolean;
    error: Error | null;
    getAllUsers: () => void;
    blockUser: (id: string) => void;
    addUser: (user : UserInterface) => void;
}

export const useStorage = create<UserState>(set => ({
    
    users : [],

    loading: false,
    error: null,

    getAllUsers : async () => {
        set({loading: true})
    
        try{
            const response = await axios.get<UserInterface[]>('http://localhost:5139/api/User/GetAllUsers');
            if(response.status!==200) throw new Error('Fail');
            set({users: await response.data, error: null});
        }
        catch(error){ set({error: new Error('ага словил!!!')})  }
        finally{ set({loading: false}) }
    },
    blockUser: (userId: string) => {
        set((state) => ({
          users: state.users.map((user) =>
            user.id === userId ? { ...user, blocked: !user.isBlocked } : user
          ),
        }));
    },
    addUser: async (user: UserInterface) => {
      try {
        set((state) => ({ ...state, loading: true, error: null }));
  
        // Выполнение запроса к серверу для добавления пользователя
        const response = await axios.post<UserInterface>('http://localhost:5139/api/User/Register', user);
        
        if (response.status!==200) {
          throw new Error('Ошибка при добавлении пользователя');
        }
  
        set((state) => ({ ...state, users: [...state.users, response.data], loading: false }));
      } catch (error) {
        set((state) => ({ ...state, error: new Error('Ошибка'), loading: false }));
      }
    },
    
}))