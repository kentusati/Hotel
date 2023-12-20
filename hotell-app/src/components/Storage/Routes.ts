import axios from "axios"
import { BookingInterface, ServiceInterface, RoomInterface, UserInterface } from "../InterfacesAndProps/Interfaces";

await axios.get<ServiceInterface[]>('http://localhost:5139/api/service/GetAllServices');
await axios.post<ServiceInterface>('http://localhost:5139/api/service/AddService');
await axios.put<ServiceInterface>('http://localhost:5139/api/service/UpdateService');
await axios.delete<ServiceInterface>('http://localhost:5139/api/service/DeleteService');

await axios.get<RoomInterface[]>('http://localhost:5139/api/service/GetAllRooms');
await axios.post<RoomInterface>('http://localhost:5139/api/service/AddRoom');
await axios.put<RoomInterface>('http://localhost:5139/api/service/UpdateRoom');
await axios.delete<RoomInterface>('http://localhost:5139/api/service/DeleteRoom');

await axios.get<BookingInterface[]>('http://localhost:5139/api/service/GetAllBookings');
await axios.post<BookingInterface>('http://localhost:5139/api/service/AddBooking');
await axios.put<BookingInterface>('http://localhost:5139/api/service/UpdateBooking');
await axios.delete<BookingInterface>('http://localhost:5139/api/service/DeletBooking');

await axios.get<UserInterface[]>('http://localhost:5139/api/service/GetAllUsers');
await axios.post<BookingInterface>('http://localhost:5139/api/service/AddBooking');
await axios.put<BookingInterface>('http://localhost:5139/api/service/UpdateBooking');
await axios.delete<BookingInterface>('http://localhost:5139/api/service/DeletBooking');

