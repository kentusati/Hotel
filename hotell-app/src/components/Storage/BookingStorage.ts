import { create } from 'zustand'
import Img from '../img/hotel1.jpg'
import { BookingInterface, OrderInterface, RoomInterface, RoomTypeInterface } from '../InterfacesAndProps/Interfaces'
import axios, {AxiosResponse} from 'axios'

interface BookingState{
    bookingData: BookingInterface[];
    orderData: OrderInterface[];
    newBooking: BookingInterface | null;
    isLoadingBookings: boolean;
    isLoadingOrders: boolean;
    error: Error | null;
    fetchBookings: () => void;
    addBooking: () => void;
    fetchOrders: () => void;
}

export const bookingStorage = create<BookingState>(set => ({
    
    bookingData : [],
    orderData : [],
    newBooking: null,
    isLoadingBookings: true,
    isLoadingOrders: true,
    error: null,

    fetchBookings: async () => {
        try {
          set({ isLoadingBookings: true, error: null });
          const response: AxiosResponse = await axios.get<BookingInterface[]>('http://localhost:5139/api/Booking/GetAllBookings');
          set({ bookingData: response.data, isLoadingBookings: false });
          console.log(response.data)
        } catch (error) {
          set({ error: new Error('Fail'), isLoadingBookings: false });
        }
    },
    addBooking: async () =>{
        try{
            set({ isLoadingBookings: true, error: null });
          const response: AxiosResponse = await axios.get<BookingInterface>('http://localhost:5139/api/Booking/GetAllRoomsType');
          console.log(response);
          set({ newBooking: response.data, isLoadingBookings: false });
        }
        catch (error) {
        set({ error: new Error('Fail'), isLoadingBookings: false });
        }
    },
    fetchOrders: async () => {
      try {
        set({ isLoadingOrders: true, error: null });
        const response: AxiosResponse = await axios.get<OrderInterface[]>('http://localhost:5139/api/Order/GetlAllOrders');
        set({ orderData: response.data, isLoadingOrders: false });
        console.log(response.data)
      } catch (error) {
        set({ error: new Error('Fail'), isLoadingOrders: false });
      }
    },
}))