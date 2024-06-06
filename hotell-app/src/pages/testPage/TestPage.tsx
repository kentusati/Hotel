import React from 'react';
import './styles.css';
import UploadButton from '../../components/UploadButton';

const TestPage: React.FC = () => {
    // Дополнительные данные для отправки на сервер
  const additionalData = {
    name: 'John',
    age: 30,
    // Добавьте нужные вам поля
  };

  return (
    <div>
      <h1>Загрузка изображений</h1>
      <div>
      <UploadButton additionalData={additionalData} />
      </div>
      <div>
        <img src="http://localhost:5139/uploads/123123.jpg"/>
      </div>
    </div>
  );
}
    
    export default TestPage;