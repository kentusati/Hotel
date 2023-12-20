import NavBar from '../components/NavBar'
import image1 from '../img/Hotel.avif';
import image2 from '../img/HotelRoom.avif';
import image3 from '../img/NightOcean.avif';
import ImageTextComponentSprava from '../components/ImageTextRightComponent';
import ImageTextComponentSleva from '../components/ImageTextLeftComponent';
import { useState } from 'react';
import ListCommentsComponent from '../components/ListCommentsComponent';


const HomePage: React.FC = () => {

  const comments = [
    { id: '1', content: 'Отличный отель!', rating: 5 },
    { id: '2', content: 'Хорошее обслуживание, но номер был немного грязным.', rating: 3 },
    { id: '3', content: 'Прекрасный вид на океан из номера.', rating: 4 },
  ];

    return (
      <div>
        <NavBar></NavBar>
        <ImageTextComponentSleva
            title='Роскошь и удобство в сердце города' 
            imgPath={image1}
            description='Наш отель это вершина роскоши и удобства, расположенная в самом сердце нашего прекрасного города.
             Мы предлагаем непревзойденный уровень комфорта и удовольствия, чтобы сделать ваше пребывание незабываемым.
             В нашем отеле вы будете окружены элегантностью и изысканностью. Вы сразу почувствуете атмосферу роскоши с момента входа в нашу просторную и стильную лобби-зону.
             Наш профессиональный и дружелюбный персонал всегда готов предложить вам высококлассное обслуживание и помощь во всех ваших потребностях.'>
        </ImageTextComponentSleva>
        <ImageTextComponentSprava
            title='Изысканные комнаты и заботливый персонал' 
            imgPath={image2}
            description='Наши комнаты являются настоящими оазисами комфорта.
             Мы создали пространства, где каждая деталь, от мягкой постели до стильного интерьера, способствует вашему расслаблению и уюту.
              Независимо от того, выбираете ли вы стандартный номер, люкс или семейный номер, мы гарантируем, что ваше проживание будет максимально комфортным и приятным.'>
        </ImageTextComponentSprava>
        <ImageTextComponentSleva
            title='Волшебство под звездным небом' 
            imgPath={image3}
            description='Ночной океан - это чудесное и загадочное явление, которое приковывает взоры и заставляет сердце замирать от восторга.
             В отеле мы предлагаем уникальную возможность окунуться в этот мир магии и красоты.
             Когда солнце садится за горизонт, ночной океан оживает своими таинственными светящимися созданиями и мерцающими отблесками.
             В нашем отеле мы создали специальные площадки и панорамные террасы, чтобы наши гости могли насладиться этим удивительным зрелищем.'>
        </ImageTextComponentSleva>
        <h2>Welcome to the Home Page</h2>
        <p>This is the content of the Home Page.</p>

        <ListCommentsComponent comments={comments}/>

      </div>
    );
  };
  
  export default HomePage;