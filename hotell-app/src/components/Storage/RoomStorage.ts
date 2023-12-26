import { create } from 'zustand'
import Img from '../img/hotel1.jpg'
import { RoomInterface, RoomTypeInterface } from '../InterfacesAndProps/Interfaces'
import axios, {AxiosResponse} from 'axios'

interface RoomState{
    data: RoomTypeInterface[];
    rooms: RoomInterface[];
    allRooms: RoomInterface[],
    isLoading: boolean;
    error: Error | null;
    fetchRooms: () => void;
    fetchRoomsByTypeId: (id: string | undefined) => void;
    fetchAllRooms: () =>void;
}

export const useStateRooms = create<RoomState>(set => ({
    
    data : [],
    rooms: [],
    allRooms: [],
    isLoading: false,
    error: null,

    fetchRooms: async () => {
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
        console.log(response);
        set({ rooms: response.data, isLoading: false });
      } catch (error) {
        set({ error: new Error('Fail'), isLoading: false });
      }
    },
    fetchAllRooms: async () => {
      try {
        set({ isLoading: true, error: null });
        const response: AxiosResponse = await axios.get<RoomInterface[]>('http://localhost:5139/api/Room/GetAllRooms');
        console.log(response);
        set({ allRooms: response.data, isLoading: false });
      } catch (error) {
        set({ error: new Error('Fail'), isLoading: false });
      } finally { set({isLoading: false}) }
  },
}))