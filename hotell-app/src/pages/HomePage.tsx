import NavBar from '../components/NavBar'
import image1 from '../img/Hotel.avif';
import image2 from '../img/HotelRoom.avif';
import image3 from '../img/NightOcean.avif';
import ImageTextComponentSprava from '../components/ImageTextRightComponent';
import ImageTextComponentSleva from '../components/ImageTextLeftComponent';
import { useEffect, useState } from 'react';
import ListCommentsComponent from '../components/ListCommentsComponent';
import {CommentForm} from '../components/WriteCommentComponent'
import { commentStorage } from '../components/Storage/CommentStorage';
import { userStorage } from '../components/Storage/UserStorage';
import EmailForm from '../components/SendEmailComponent';


const HomePage: React.FC = () => {

  const {writeComment} = commentStorage(); 
  const {currentUser, setCurrentUser} = userStorage();

  useEffect(() => {
    if(currentUser===null){
      const unparsedUser = localStorage.getItem("CurUser");
      if (unparsedUser !== null){
        const parsedUser = JSON.parse(unparsedUser);
        setCurrentUser(parsedUser);
      }
    }
  },[])

  const handleSubmit = async (text : string, rating: number) =>{
    await writeComment(text, rating, String(currentUser?.id));
    console.log(text,rating, currentUser?.id);
  }

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
        <EmailForm/>
        <CommentForm onSubmit={handleSubmit}/>
        <ListCommentsComponent/>

      </div>
    );
  };
  
  export default HomePage;