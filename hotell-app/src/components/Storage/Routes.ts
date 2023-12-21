import axios from "axios"
import { BookingInterface, ServiceInterface, RoomInterface, UserInterface } from "../InterfacesAndProps/Interfaces";

await axios.get<ServiceInterface[]>('http://localhost:5139/api/Service/GetAllServices');
await axios.post<ServiceInterface>('http://localhost:5139/api/service/AddService');
await axios.put<ServiceInterface>('http://localhost:5139/api/Service/UpdateService');
await axios.delete<ServiceInterface>('http://localhost:5139/api/service/DeleteService');

await axios.get<RoomInterface[]>('http://localhost:5139/api/Room/GetAllRooms');
await axios.post<RoomInterface>('http://localhost:5139/api/Room/AddRoom');
await axios.put<RoomInterface>('http://localhost:5139/api/Room/UpdateRoom');
await axios.delete<RoomInterface>('http://localhost:5139/api/Room/DeleteRoom');

await axios.get<BookingInterface[]>('http://localhost:5139/api/Booking/GetAllBookings');
await axios.post<BookingInterface>('http://localhost:5139/api/Booking/AddBooking');
await axios.put<BookingInterface>('http://localhost:5139/api/Booking/UpdateBooking');
await axios.delete<BookingInterface>('http://localhost:5139/api/Booking/DeletBooking');

await axios.get<UserInterface[]>('http://localhost:5139/api/User/GetAllUsers');
await axios.post<BookingInterface>('http://localhost:5139/api/User/Register');
await axios.put<BookingInterface>('http://localhost:5139/api/User/UpdateBooking');
await axios.patch<BookingInterface>('http://localhost:5139/api/User/BlockUser');

