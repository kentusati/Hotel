import { RoomInterface, UserInterface, CommentInterface } from './Interfaces';


export  interface BookingProps {
    rooms: RoomInterface[];
  }
export interface CommentProps {
    comments: CommentInterface[];
  }

export interface UserProps {
    user: UserInterface;
  }
export interface ImageTextComponentProps {
    title: string;
    description: string;
    imgPath: string;
  }
export interface VisibleProps{
    onChange: () => void;
    }