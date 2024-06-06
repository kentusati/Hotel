import { create } from 'zustand'
import Img from '../img/hotel1.jpg'
import { ServiceInterface } from '../InterfacesAndProps/Interfaces'
import axios, {AxiosResponse} from 'axios'

interface ServiceState{
    data: ServiceInterface[];
    newService: ServiceInterface | null;
    isLoading: boolean;
    error: Error | null;
    fetchServices: () => void;
    deleteService: (id : string) => void;
    updateService: (id: string, name: string, price: number, description: string)=>void;
    AddService: (formData: any) => void;
}

export const useStateServices = create<ServiceState>(set => ({
    
    data : [],
    newService: null,
    isLoading: false,
    error: null,

    
    fetchServices : async () =>{
        try {
            set({ isLoading: true, error: null });
            const response: AxiosResponse = await axios.get<ServiceInterface[]>('http://localhost:5139/api/Service/GetAllServices');
            console.log(response);
            set({ data: response.data, isLoading: false });
          } catch (error) {
            set({ error: new Error('Fail'), isLoading: false });
          }
    },
    deleteService : async (id) =>{
      try {
          set({ isLoading: true, error: null });
          const response: AxiosResponse = await axios.delete('http://localhost:5139/api/Service/DeleteService/'+id);
          console.log(response);
          set({ data: response.data, isLoading: false });
        } catch (error) {
          set({ error: new Error('Fail'), isLoading: false });
        }
  },
  AddService: async (formData) => {
    try {
      set({isLoading: true});
      //const toServ={name,price,description} 
      // Выполнение запроса к серверу для добавления пользователя
      const response = await axios.post('http://localhost:5139/api/Service/AddService', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      if (response.status!==200) {
        throw new Error('Ошибка при добавлении пользователя');
      }

      set({isLoading: false});
    } catch (error) {
      set((state) => ({ ...state, error: new Error('Ошибка'), isLoading: false}));
    }
  },
  updateService: async (id ,name,price,description) => {
    try {
      set({isLoading: true});
      const toServ={name,price,description} 
      // Выполнение запроса к серверу для добавления пользователя
      const response: AxiosResponse = await axios.put<ServiceInterface>('http://localhost:5139/api/Service/UpdateService/'+id, toServ);
      
      if (response.status!==200) {
        throw new Error('Ошибка при добавлении пользователя');
      }

      set({isLoading: false});
    } catch (error) {
      set((state) => ({ ...state, error: new Error('Ошибка'), isLoading: false}));
    }
  },

}))