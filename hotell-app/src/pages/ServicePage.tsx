import React from 'react';
import NavBar from '../components/NavBar';
import ListServicesComponentComponent from '../components/ListServicesComponent';
import Img from '../img/hotel1.jpg'
import { ServiceInterface } from '../components/InterfacesAndProps/Interfaces';


const OrderPage: React.FC = () => {
  // Предполагаем, что у вас есть массив доступных услуг
  const services  = [
    { id: '1', name: 'Еда в номер', price: 1, image: Img, description: 'еда еда еда еда еда еда еда еда еда еда еда еда еда еда еда еда еда еда еда еда еда еда еда' },
    { id: '2', name: 'Уборка', price: 2, image: Img, description: 'уборка уборка уборка уборка уборка уборка уборка уборка уборка уборка уборка уборка уборка уборка уборка ' },
    { id: '3', name: 'Доставка багажа', price: 3, image: Img, description: 'багаж багаж багаж багаж багаж багаж багаж багаж багаж багаж багаж багаж багаж багаж багаж багаж багаж ' },
    { id: '4', name: 'Доставка багажа', price: 4, image: Img, description: 'багаж багаж багаж багаж багаж багаж багаж багаж багаж багаж багаж багаж багаж багаж багаж багаж багаж ' },
    { id: '5', name: 'Доставка багажа', price: 5, image: Img, description: 'багаж багаж багаж багаж багаж багаж багаж багаж багаж багаж багаж багаж багаж багаж багаж багаж багаж ' }
    // Другие услуги...
  ];

  return (
    <div>
        <NavBar/>
      <h1>Страница заказа услуг</h1>
      <ListServicesComponentComponent services={services} />
    </div>
  );
};

export default OrderPage;