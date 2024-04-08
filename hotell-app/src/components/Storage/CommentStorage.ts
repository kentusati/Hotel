import { create } from 'zustand'
import Img from '../img/hotel1.jpg'
import { UserInterface, CommentInterface } from '../InterfacesAndProps/Interfaces'
import axios from 'axios'

interface UserState{
    comments: CommentInterface[];
    loading: boolean;
    error: Error | null;
    getAllComments: () => void;
    updateComment: (id: string, text : string, rating: number) => void;
    writeComment: (text : string, rating: number, id: string) => void;
    deleteComment: (id: string)=>void;
}

export const commentStorage = create<UserState>(set => ({
    
    comments : [],

    loading: false,
    error: null,

    getAllComments : async () => {
        set({loading: true})
    
        try{
            const response = await axios.get<CommentInterface[]>('http://localhost:5139/api/Comment/GetAllComments');
            if(response.status!==200) throw new Error();
            set({comments: response.data, error: null});
            console.log(response.data);
        }   
        catch(error){ set({error: new Error('ага словил!!!')})  }
        finally{ set({loading: false}) }
    },
    updateComment: async (id ,text, rating) => {
        try {
          set((state) => ({ ...state, loading: true, error: null }));
    
          const toServ ={text,rating};

          // Выполнение запроса к серверу для добавления пользователя
          const response = await axios.post('http://localhost:5139/api/Comment/UpdateComment/{id}', toServ);
          
          if (response.status!==200) {
            throw new Error('');
          }
    
          set((state) => ({ ...state, users: [...state.comments, response.data], loading: false }));
        } catch (error) {
          set((state) => ({ ...state, error: new Error('Ошибка'), loading: false }));
        }
      },
    writeComment: async (text, rating, UserId) => {
      try {
        set((state) => ({ ...state, loading: true, error: null }));
  
        const toServ ={text,rating, UserId};
        // Выполнение запроса к серверу для добавления пользователя
        const response = await axios.post<CommentInterface>('http://localhost:5139/api/Comment/AddComment', toServ);
        if (response.status!==200) {
          throw new Error('Ошибка при добавлении пользователя');
        }
  
        set((state) => ({ ...state, users: [...state.comments, response.data], loading: false }));
      } catch (error) {
        set((state) => ({ ...state, error: new Error('Ошибка'), loading: false }));
      }
    },
    deleteComment : async (id) =>{
      try {
          set({loading: true});
          const response = await axios.delete('http://localhost:5139/api/Comment/DeleteComment/'+id);
          console.log(response);
          set({ comments: response.data, loading: false });
        } catch (error) {
          set({ error: new Error('Fail'), loading: false });
        }
  },
}))