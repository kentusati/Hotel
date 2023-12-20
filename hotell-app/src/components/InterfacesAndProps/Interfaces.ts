
  export interface RoomInterface {
    id: string;
    number: string;
    type: string;
    price: number;
    available: boolean;
    image: string;
    description: string;
  }

  export interface CommentInterface {
    id: string;
    content: string;
    rating: number ;
  }

  export interface ServiceInterface {
    id: string;
    name: string;
    image: string;
    price: number;
    description: string;
  }

  export interface BookingInterface {
    id: string;
    checkInDate: Date | null;
    checkOutDate: Date| null;
    user: UserInterface;
    room: RoomInterface;
  }

  export interface RoleInterface{
    id:string;
    name: string;
  }

  export interface OrderInterface {
    id: string;
    service: string;
    price: string;
    roomNumber: string;
  }

  export interface ManagerInterface{
    id: string;
    name: string;
    email: string;
    role: RoleInterface | null;
  }
  
  export interface UserInterface {
    id: string;
    name: string;
    email: string;
    isBlocked: boolean,
    role: RoleInterface;
    comments: CommentInterface[];
    roomBookings: BookingInterface[];
    orders: OrderInterface[];
  }