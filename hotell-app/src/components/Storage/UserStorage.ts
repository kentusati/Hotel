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
    newManager: UserInterface | null;
    userBookings: BookingInterface[] | null;
    userOrders : OrderInterface[] | null;
    fetchUsers: () => void;
    blockUser: (id: string) => void;
    register: (userName : string, email: string, password:string) => void;
    AddManager: (userName : string, email: string, password:string) => void;
    logIn: (username: string, password: string) => void;
    makeBooking: (userId: string | undefined, roomId: string, StartTime: string, EndTime: string)=>void;
    makeOrder: (DateOfOrder: string, Status: boolean, UserId: string | undefined, ServiceId:string | undefined) => void;
    fetchUserBookings: (id: string | undefined) => void;
    fetchUserOrders: (id: string | undefined) => void;
    deleteBooking: (id: string)=>void;
    deleteOrder: (id: string)=>void;
    updateBooking: ( bookingId: string | undefined, userId: string | undefined, roomId: string, StartTime: string, EndTime: string)=>void;
    updateOrder: (bookingId: string | undefined, userId: string | undefined, serviceId: string, DateOfOrder: string, Status: boolean)=>void;
    deleteUser: (id: string) => void;

}

const removeOrderById = (id: string) => {
  userStorage.setState((prevState) => ({
    userOrders: prevState.userOrders?.filter((item) => item.id !== id),
  }));
}
const removeBookingById = (id: string) => {
  userStorage.setState((prevState) => ({
    userBookings: prevState.userBookings?.filter((item) => item.id !== id),
  }));
}
const removeUserById = (id: string) => {
  userStorage.setState((prevState) => ({
    users: prevState.users?.filter((item) => item.id !== id),
  }));
}


export const userStorage = create<UserState>(set => ({
    
    users : [],
    currentUser: null,
    setCurrentUser: (value) => set(() => ({ currentUser: value})),
    isLoading: false,
    error: null,
    succes: false,
    newManager: null,
    userBookings: null,
    userOrders: null,


    fetchUsers : async () => {
        set({isLoading: true})
    
        try{
            const response = await axios.get<UserInterface[]>('http://localhost:5139/api/User/GetAllUsers');
            if(response.status!==200) throw new Error('Fail');
            console.log(response.data)
            set({users: response.data, error: null});
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
          set({isLoading: false});
        } catch (error) {
          console.error('Ошибка при авторизации:', error);
        }
        finally{ set({isLoading:false}) }
      },
      makeBooking: async (userId, roomId, StartTime, EndTime) => {
        try {
          const toServ = {StartTime, EndTime, userId, roomId}
          console.log(toServ)
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
      updateBooking: async (bookingId ,userId, roomId, StartTime, EndTime) => {
        try {
          const toServ = {StartTime, EndTime, userId, roomId}
          console.log(toServ)
          set({isLoading: true})
          const response: AxiosResponse = await axios.put('http://localhost:5139/api/Booking/UpdateBooking/' + bookingId ,toServ);
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









      updateOrder: async (Id ,userId, serviceId, DateOfOrder, Status) => {
        try {
          const toServ = {DateOfOrder,Status, userId, serviceId}
          console.log(toServ)
          set({isLoading: true})
          const response: AxiosResponse = await axios.put('http://localhost:5139/api/Order/UpdateOrder/' + Id ,toServ);
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
      makeOrder: async (DateOfOrder, Status, userId, serviceId) => {
        try {
          const toServ = {DateOfOrder, Status, userId, serviceId}
          console.log(toServ)
          set({isLoading: true})
          const response: AxiosResponse = await axios.post('http://localhost:5139/api/Order/AddOrder', toServ);
          if(response.status!=200){
            throw new Error('');
          }
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
          console.log(response.status);
          if(response.status==200 || response.status == 204){
            set({ userBookings: response.data});
            console.log(response.data);
            set({isLoading: false});
          }
          else throw new Error('');

        } catch (error) {
          console.error('Ошибка:', error);
        }
        finally{ set({isLoading:false}) }
      },
      deleteBooking: async (id) => {
        try {
          set({isLoading: true})
          const response: AxiosResponse = await axios.delete('http://localhost:5139/api/Booking/DeleteBooking/'+id);
          if(response.status!==200){
            throw new Error('');
          }
          removeBookingById(id);
          set({isLoading: false});
        } catch (error) {
          console.error('Ошибка:', error);
        }
        finally{ set({isLoading:false}) }
      },
      fetchUserOrders: async (id) => {
        try {
          set({isLoading: true})
          const response: AxiosResponse = await axios.get<OrderInterface[]>('http://localhost:5139/api/Order/GetUserOrders/'+id);
          
         if(response.status==200 || response.status == 204){
            set({ userOrders: response.data});
            console.log(response.data);
            set({isLoading: false});
          }
          else throw new Error('');

        } catch (error) {
          console.error('Ошибка:', error);
        }
        finally{ set({isLoading:false}) }
      },
      deleteOrder: async (id) => {
        try {
          set({isLoading: true})
          const response: AxiosResponse = await axios.delete('http://localhost:5139/api/Order/DeleteOrder/'+id);
          if(response.status!==200){
            throw new Error('');
          }
          removeOrderById(id);
          set({isLoading: false});
        } catch (error) {
          console.error('Ошибка:', error);
        }
        finally{ set({isLoading:false}) }
      },

      AddManager: async (username,email,password) => {
        try {
          set({isLoading: true});
          const toServ={username,email,password} 
          // Выполнение запроса к серверу для добавления пользователя
          const response: AxiosResponse = await axios.post<UserInterface>('http://localhost:5139/api/User/AddManager', toServ);
          
          if (response.status!==200) {
            throw new Error('Ошибка при добавлении пользователя');
          }
    
          set({newManager: response.data ,isLoading: false, succes: true });
        } catch (error) {
          set((state) => ({ ...state, error: new Error('Ошибка'), isLoading: false}));
        }
      },

      deleteUser: async (id: string) => {
        try {
          set({isLoading: true})
          const response: AxiosResponse = await axios.delete('http://localhost:5139/api/User/DeleteUser/'+id);
          if(response.status!==200){
            throw new Error('');
          }
          removeUserById(id);
          set({isLoading: false});
        } catch (error) {
          console.error('Ошибка:', error);
        }
        finally{ set({isLoading:false}) }
      },
}))