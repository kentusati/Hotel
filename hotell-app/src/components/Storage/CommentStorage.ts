import { create } from 'zustand'
import Img from '../img/hotel1.jpg'
import { UserInterface, CommentInterface } from '../InterfacesAndProps/Interfaces'
import axios from 'axios'

interface UserState{
    comments: CommentInterface[];
    loading: boolean;
    error: Error | null;
    getAllComments: () => void;
    updateComment: (id: string) => void;
    writeComment: (comment : CommentInterface) => void;
}

export const useStorage = create<UserState>(set => ({
    
    comments : [],

    loading: false,
    error: null,

    getAllComments : async () => {
        set({loading: true})
    
        try{
            const response = await axios.get<CommentInterface[]>('http://localhost:5139/api/Comment/GetAllComments');
            if(response.status!==200) throw new Error();
            set({comments: await response.data, error: null});
        }
        catch(error){ set({error: new Error('ага словил!!!')})  }
        finally{ set({loading: false}) }
    },
    updateComment: async (comment: CommentInterface) => {
        try {
          set((state) => ({ ...state, loading: true, error: null }));
    
          // Выполнение запроса к серверу для добавления пользователя
          const response = await axios.post<CommentInterface>('http://localhost:5139/api/Comment/UpdateComment', comment);
          
          if (response.status!==200) {
            throw new Error('');
          }
    
          set((state) => ({ ...state, users: [...state.comments, response.data], loading: false }));
        } catch (error) {
          set((state) => ({ ...state, error: new Error('Ошибка'), loading: false }));
        }
      },
    writeComment: async (user: UserInterface) => {
      try {
        set((state) => ({ ...state, loading: true, error: null }));
  
        // Выполнение запроса к серверу для добавления пользователя
        const response = await axios.post<UserInterface>('http://localhost:5139/api/User/Register', user);
        
        if (response.status!==200) {
          throw new Error('Ошибка при добавлении пользователя');
        }
  
        set((state) => ({ ...state, users: [...state.users, response.data], loading: false }));
      } catch (error) {
        set((state) => ({ ...state, error: new Error('Ошибка'), loading: false }));
      }
    },
    
}))