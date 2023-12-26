import { create } from 'zustand'
import Img from '../img/hotel1.jpg'
import { BookingInterface, RoomInterface, RoomTypeInterface } from '../InterfacesAndProps/Interfaces'
import axios, {AxiosResponse} from 'axios'

interface BookingState{
    data: BookingInterface[];
    isLoading: boolean;
    error: Error | null;
    fetchBookings: () => void;
    addBooking: () => void;
}

export const useStateBookings = create<BookingState>(set => ({
    
    data : [],
    isLoading: false,
    error: null,

    fetchBookings: async () => {
        try {
          set({ isLoading: true, error: null });
          const response: AxiosResponse = await axios.get<BookingInterface[]>('http://localhost:5139/api/Booking/GetAllBookings');
          console.log(response);
          set({ data: response.data, isLoading: false });
        } catch (error) {
          set({ error: new Error('Fail'), isLoading: false });
        }
    },
    addBooking: async () =>{
        try{
            set({ isLoading: true, error: null });
          const response: AxiosResponse = await axios.get<BookingInterface>('http://localhost:5139/api/Booking/GetAllRoomsType');
          console.log(response);
          set({ data: response.data, isLoading: false });
        }
        catch (error) {
        set({ error: new Error('Fail'), isLoading: false });
        }
    },
}))