import { create } from 'zustand'
import Img from '../img/hotel1.jpg'
import { RoomInterface, RoomTypeInterface } from '../InterfacesAndProps/Interfaces'
import axios, {AxiosResponse} from 'axios'

interface RoomState{
    data: RoomTypeInterface[];
    roomsByType: RoomInterface[];
    allRooms: RoomInterface[],
    isLoading: boolean;
    error: Error | null;
    fetchRoomsTypes: () => void;
    fetchRoomsByTypeId: (id: string | undefined) => void;
    fetchRooms: () =>void;
    makeRoomAvailable: (id : string) => void;
}

export const roomStorage = create<RoomState>(set => ({
    
    data : [],
    roomsByType: [],
    allRooms: [],
    isLoading: false,
    error: null,

    fetchRoomsTypes: async () => {
        try {
          set({ isLoading: true, error: null });
          const response: AxiosResponse = await axios.get<RoomTypeInterface[]>('http://localhost:5139/api/Room/GetAllRoomsType');
          console.log(response);
          set({ data: response.data, isLoading: false });
        } catch (error) {
          set({ error: new Error('Fail'), isLoading: false });
        }
    },
    fetchRoomsByTypeId: async (id) => {
      try {
        set({ isLoading: true, error: null });
        const response: AxiosResponse = await axios.get<RoomTypeInterface[]>('http://localhost:5139/api/Room/GetAllRooms/'+id);
        console.log(response.data);
        set({ roomsByType: response.data, isLoading: false });
      } catch (error) {
        set({ error: new Error('Fail'), isLoading: false });
      }
    },
    fetchRooms: async () => {
      try {
        set({ isLoading: true, error: null });  
        const response: AxiosResponse = await axios.get<RoomInterface[]>('http://localhost:5139/api/Room/GetAllRooms');
        set({ allRooms: response.data, isLoading: false });
      } catch (error) {
        set({ error: new Error('Fail'), isLoading: false });
      } finally { set({isLoading: false}) }
    },
    makeRoomAvailable: async (id) => {
      try {
        set({ isLoading: true, error: null });  
        const response: AxiosResponse = await axios.put<RoomInterface[]>('http://localhost:5139/api/Room/UpdateAvailableRoom/'+id);
      } catch (error) {
        set({ error: new Error('Fail'), isLoading: false });
      } finally { set({isLoading: false}) }
    },
}))