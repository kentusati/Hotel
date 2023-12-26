import { create} from 'zustand'
import Img from '../img/hotel1.jpg'
import { UserInterface, RoleInterface, BookingInterface, OrderInterface, RoomInterface } from '../InterfacesAndProps/Interfaces'
import axios,{AxiosResponse} from 'axios'

interface UserState{
    users: UserInterface[];
    currentUser: UserInterface | null;
    setCurrentUser: (value : UserInterface | null) => void;
    isLoading: boolean;
    succes: boolean;
    error: Error | null;
    userBookings: BookingInterface[] | null;
    fetchUsers: () => void;
    blockUser: (id: string) => void;
    register: (userName : string, email: string, password:string) => void;
    logIn: (username: string, password: string) => void;
    makeBooking: (userId: string | undefined, roomId: string, StartTime: string, EndTime: string)=>void;
    makeOrder: (dateOrder: string, status: boolean, description:string, roomId:string, serviceId:string) => void;
    fetchUserBookings: (id: string | undefined) => void;
    deleteBooking: (id: string)=>void;
}

export const userStorage = create<UserState>(set => ({
    
    users : [],
    currentUser: null,
    setCurrentUser: (value) => set(() => ({ currentUser: value })),
    isLoading: false,
    error: null,
    succes: false,
    userBookings: null,

    fetchUsers : async () => {
        set({isLoading: true})
    
        try{
            const response = await axios.get<UserInterface[]>('http://localhost:5139/api/User/GetAllUsers');
            if(response.status!==200) throw new Error('Fail');
            set({users: await response.data, error: null});
        }
        catch(error){ set({error: new Error('ага словил!!!')})  }
        finally{ set({isLoading: false}) }
    },
    blockUser: (userId: string) => {
        set((state) => ({
          users: state.users.map((user) =>
            user.id === userId ? { ...user, blocked: !user.isBlocked } : user
          ),
        }));
    },
    register: async (username,email,password) => {
      try {
        set({isLoading: true});
        const toServ={username,email,password} 
        // Выполнение запроса к серверу для добавления пользователя
        const response: AxiosResponse = await axios.post<UserInterface>('http://localhost:5139/api/User/Register', toServ);
        
        if (response.status!==200) {
          throw new Error('Ошибка при добавлении пользователя');
        }
  
        set({isLoading: false, succes: true });
      } catch (error) {
        set((state) => ({ ...state, error: new Error('Ошибка'), isLoading: false}));
      }
    },
      logIn: async (email, password) => {
        try {
          const toServ = {email, password}
          set({isLoading: true})
          const response: AxiosResponse = await axios.post('http://localhost:5139/api/User/SignIn',toServ);
          if(response.status!=200){
            throw new Error('');
          }
          set({ currentUser: response.data});
          console.log('store');
          set({isLoading: false});
        } catch (error) {
          console.error('Ошибка при авторизации:', error);
        }
        finally{ set({isLoading:false}) }
      },
      makeBooking: async (userId, roomId, StartTime, EndTime) => {
        try {
          const toServ = {StartTime, EndTime, userId, roomId}
          set({isLoading: true})
          const response: AxiosResponse = await axios.post('http://localhost:5139/api/Booking/AddBooking',toServ);
          if(response.status!=200){
            throw new Error('');
          }
          console.log('store');
          set({isLoading: false});
        } catch (error) {
          console.error('Ошибка:', error);
        }
        finally{ set({isLoading:false}) }
      },
      makeOrder: async (dateOrder, status, description, roomId, serviceId) => {
        try {
          const toServ = {dateOrder, status, description, roomId, serviceId}
          set({isLoading: true})
          const response: AxiosResponse = await axios.post('http://localhost:5139/api/Order/AddOrder',toServ);
          if(response.status!=200){
            throw new Error('');
          }
          set({ currentUser: response.data});
          console.log('store');
          set({isLoading: false});
        } catch (error) {
          console.error('Ошибка:', error);
        }
        finally{ set({isLoading:false}) }
      },
      fetchUserBookings: async (id) => {
        try {
          set({isLoading: true})
          const response: AxiosResponse = await axios.get<BookingInterface[]>('http://localhost:5139/api/Booking/GetAllUserBookings/'+id);
          
          console.log(response.data);
          
          if(response.status!==200){
            throw new Error('');
          }
          set({ userBookings: response.data});
          console.log(response.data);
          set({isLoading: false});
        } catch (error) {
          console.error('Ошибка:', error);
        }
        finally{ set({isLoading:false}) }
      },
      deleteBooking: async (id) => {
        try {
          set({isLoading: true})
          const response: AxiosResponse = await axios.delete('http://localhost:5139/api/Booking/DeleteBooking/'+id);
          
          console.log(response.data);
          
          if(response.status!==200){
            throw new Error('');
          }
          console.log(response.data);
          set({isLoading: false});
        } catch (error) {
          console.error('Ошибка:', error);
        }
        finally{ set({isLoading:false}) }
      },
}))