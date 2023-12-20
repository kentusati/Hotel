import { create } from 'zustand'
import Img from '../img/hotel1.jpg'
import { ServiceInterface } from '../InterfacesAndProps/Interfaces'
import axios from 'axios'

interface ServiceState{
    services: ServiceInterface[];
    loading: boolean;
    error: Error | null;
    addService: (dto : ServiceInterface) => void;
}

export const useState = create<ServiceState>(set => ({
    
    services : [
        { id: '1', name: 'Еда в номер', price: 1, image: Img, description: 'еда еда еда еда еда еда еда еда еда еда еда еда еда еда еда еда еда еда еда еда еда еда еда' },
        { id: '2', name: 'Уборка', price: 2, image: Img, description: 'уборка уборка уборка уборка уборка уборка уборка уборка уборка уборка уборка уборка уборка уборка уборка ' },
        { id: '3', name: 'Доставка багажа', price: 3, image: Img, description: 'багаж багаж багаж багаж багаж багаж багаж багаж багаж багаж багаж багаж багаж багаж багаж багаж багаж ' },
        { id: '4', name: 'Доставка багажа', price: 4, image: Img, description: 'багаж багаж багаж багаж багаж багаж багаж багаж багаж багаж багаж багаж багаж багаж багаж багаж багаж ' },
        { id: '5', name: 'Доставка багажа', price: 5, image: Img, description: 'багаж багаж багаж багаж багаж багаж багаж багаж багаж багаж багаж багаж багаж багаж багаж багаж багаж ' }
        // Другие услуги...
    ],

    loading: false,
    error: null,

    addService : (dtoService : ServiceInterface) => set(state => {
        const newService = {id: dtoService.id , name: dtoService.name, price: dtoService.price, image: Img, description: dtoService.description }

        return {services: [...state.services, newService]}
    }),
    deleteService : (elementToRemove : ServiceInterface) =>set(state =>{
        return {services: state.services.filter((element)=> element !== elementToRemove)}
    }),
    updateService : (elemUpdate: ServiceInterface, dtoUpdate : ServiceInterface) => set(state =>{
        return{ services: state.services.map((service)=>{
                if(service.id==elemUpdate.id){
                    return { ...elemUpdate, name: dtoUpdate.name, image: dtoUpdate.image, price: dtoUpdate.price, description: dtoUpdate.description}
                } return service;
            })
        }
    }),
    getServicesFromServer : async () => {
        set({loading: true})
    
        try{
            const response = await axios.get<ServiceInterface[]>('http://localhost:5139/api/getBlaBlaBla');
            if(response.status!==200) throw new Error('Fail');
            set({services: await response.data, error: null});
        }
        catch(error){ set({error: new Error('ага словил!!!')})  }
        finally{ set({loading: false}) }
    }

}))