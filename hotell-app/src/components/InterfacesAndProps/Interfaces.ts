
  export interface RoomTypeInterface {
    img: string;
    type: string;
    price_day: number;
    description: string;
    id: string;
  }
  export interface RoomInterface{
    id: string;
    roomNumber: number;
    available: boolean;
    roomTypeId: string;
  }

  export interface CommentInterface {
    id: string;
    text: string;
    rating: number ;
    userId : string;
    user: UserInterface;
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
    startTime: string;
    endTime: string;
    userId: string;
    roomId: string;
    user: UserInterface;
    room: RoomInterface;
  }

  export interface RoleInterface{
    id:string;
    name: string;
  }

  export interface OrderInterface {
    id: string;
    dateOfOrder: string | null;
    userId: string;
    serviceId: string;

  }

  export interface ManagerInterface{
    id: string;
    name: string;
    email: string;
    role: RoleInterface | null;
  }
  
  export interface UserInterface {
    id: string;
    userName: string;
    email: string;
    isBlocked: boolean,
    roleId: string,
    role: RoleInterface | undefined;
  }