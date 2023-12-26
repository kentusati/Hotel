import { create } from 'zustand'
import Img from '../img/hotel1.jpg'
import { ServiceInterface } from '../InterfacesAndProps/Interfaces'
import axios, {AxiosResponse} from 'axios'

interface ServiceState{
    data: ServiceInterface[];
    isLoading: boolean;
    error: Error | null;
    fetchServices: () => void;
}

export const useStateServices = create<ServiceState>(set => ({
    
    data : [],

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
    }

}))