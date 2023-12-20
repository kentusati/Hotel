import { create } from 'zustand'
import Img from '../img/hotel1.jpg'
import { UserInterface, RoleInterface, BookingInterface, OrderInterface } from '../InterfacesAndProps/Interfaces'
import axios from 'axios'

interface UserState{
    users: UserInterface[];
    loading: boolean;
    error: Error | null;
    getAllUsers: () => void;
    blockUser: (id: string) => void;
    //addUser: (dto : UserInterface) => void;
}

export const useStorage = create<UserState>(set => ({
    
    users : [] as UserInterface[],

    loading: false,
    error: null,

    getAllUsers : async () => {
        set({loading: true})
    
        try{
            const response = await axios.get<UserInterface[]>('http://localhost:5139/api/User/GetAllUsers');;
            if(response.status!==200) throw new Error('Fail');
            set({users: await response.data, error: null});
        }
        catch(error){ set({error: new Error('ага словил!!!')})  }
        finally{ set({loading: false}) }
    },
    blockUser: (userId: string) => {
        set((state) => ({
          users: state.users.map((user) =>
            user.id === userId ? { ...user, blocked: !user.isBlocked } : user
          ),
        }));
      },

}))