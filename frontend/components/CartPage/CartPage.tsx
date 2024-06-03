// import React, { useState, useEffect } from 'react';
// import Header from '../Header/Header';
// import './CartPage.css';
// const CartPage = () => {
//   const [items, setItems] = useState([
//     {
//       id: 0,
//       user_id: 0,
//       image: '',
//       title: '',
//       price: 0,
//       condition: '',
//     },
//   ]);
//   const [user, setUser] = useState({});

//   useEffect(() => {
//     (async function () {
//       const userFindBack = await fetch('http://localhost:3000/user-session', {
//         method: 'GET',
//         credentials: 'include',
//       });
//       const jsonFromBack = await userFindBack.json();
//       // dispatch(getUser(jsonFromBack));
//       setUser(jsonFromBack);
//     })();
//   }, []);

//   const handleRemoveFromBasket = async (e) => {
//     e.preventDefault();
//     const user_id = e.target.dataset.userid;
//     const card_id = e.target.dataset.cardid;
//     console.log('CARD ID: ', card_id);
//     console.log('USER ID: ', user_id);
//     console.log(
//       JSON.stringify({ card_id: Number(card_id), user_id: Number(user_id) })
//     );

//     const res = await fetch('http://localhost:3000/remove-from-basket', {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         card_id: Number(card_id),
//         user_id: Number(user_id),
//       }),
//       credentials: 'include',
//     });
//     const toJson = await res.json();
//     console.log('99999: ', toJson);

//     setItems(toJson);
//   };

//   //! Отправка письма при заказке
  
//   const sendEmail = async () => {

//     //! Удаление карточек при заказе
//     const res = await fetch('http://localhost:3000/remove-card-order', {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       // body: JSON.stringify({
//       //   buyer_id: Number(),
//       // }),
//       credentials: 'include',
//     });

//     const arrayEmails = await res.json();

//     const emails = arrayEmails.map((each) => each.User.email);

//     console.log("EMAILS:", emails);
//     // console.log(typeof(res));
    

//     (function () {
//       emailjs.init('lInXZqIRsKdYmy32M');
//     })();

//     console.log("ITEMS: ", items);

//     const params = {
//       sendername: 'Magic the Gathering',
//       to: emails,
//       subject: 'Order',
//       replyto: 'romanlemeshcko@mail.ru',
//       message: 'You have a new order',
//     };

//     const serviceID = 'service_lw55zio';
//     const templateID = 'template_6rfi07o';

//     emailjs.send(serviceID, templateID, params).then((res) => {
//       alert('Email sent successfully');
//     });

//     setItems([]);
//   };

//   useEffect(() => {
//     (async function () {
//       const userFindBack = await fetch('http://localhost:3000/cart-items', {
//         method: 'GET',
//         credentials: 'include',
//       });
//       const jsonFromBack = await userFindBack.json();
//       // dispatch(getUser(jsonFromBack));
//       setItems(jsonFromBack);
//     })();
//   }, []);

//   return (
//     <div className='cart-page-wrap'>
//       <Header />
//       {user ? (
//         <div>
//           <p></p>
//           <h3>Would like to buy :</h3>
//           <section id="main-container">
//             {' '}
//             {/* className="py-5 text-center container" */}
            
//             {items.length > 0 ? (
//               <div>
//                 <div className='card-wrap'>
//                 {
//                 items.map((eachCard) => (
//                   <div className="card">
//                     <div className="head">
//                       <div className="image">
//                         <img src={eachCard.image} alt="pic" />
//                       </div>
//                     </div>
//                     <div className="footer">
//                       <div className="title">{eachCard.title}</div>
//                       <div className="condition">{eachCard.condition}</div>
//                       {/* <div className="city">Город</div> */}
//                       <div className="price">{eachCard.price} $</div>
//                       <button
//                         className="btn-return-card"
//                         onClick={handleRemoveFromBasket}
//                         data-cardid={eachCard.id}
//                         data-userid={eachCard.user_id}
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   </div>                
//                 ))
//                 }
//                 </div>
//                 <button className="add-to-cart" onClick={sendEmail}>
//                   Checkout
//                 </button>
//               </div>
//             ) : (
//               <div className='no-cards'>No cards</div>
//             )}
//           </section>
//         </div>
//       ) : (
//         <div></div>
//       )}
//     </div>
//   );
// };

// export default CartPage;



//! ==================== Type Script ====================
import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import './CartPage.css';

interface Item {
  id: number;
  user_id: number;
  image: string;
  title: string;
  price: number;
  condition: string;
}

interface User {
  [key: string]: any;
}

const CartPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([
    {
      id: 0,
      user_id: 0,
      image: '',
      title: '',
      price: 0,
      condition: '',
    },
  ]);
  const [user, setUser] = useState<User>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userFindBack = await fetch('http://localhost:3000/user-session', {
          method: 'GET',
          credentials: 'include',
        });
        const jsonFromBack = await userFindBack.json();
        setUser(jsonFromBack);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const handleRemoveFromBasket = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const user_id = e.currentTarget.dataset.userid;
    const card_id = e.currentTarget.dataset.cardid;

    if (card_id && user_id) {
      try {
        const res = await fetch('http://localhost:3000/remove-from-basket', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            card_id: Number(card_id),
            user_id: Number(user_id),
          }),
          credentials: 'include',
        });
        const toJson = await res.json();
        setItems(toJson);
      } catch (error) {
        console.error('Error removing item from basket:', error);
      }
    }
  };

  const sendEmail = async () => {
    try {
      const res = await fetch('http://localhost:3000/remove-card-order', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const arrayEmails = await res.json();
      const emails = arrayEmails.map((each: any) => each.User.email);

      emailjs.init('lInXZqIRsKdYmy32M');

      const params = {
        sendername: 'Magic the Gathering',
        to: emails,
        subject: 'Order',
        replyto: 'romanlemeshcko@mail.ru',
        message: 'You have a new order',
      };

      const serviceID = 'service_lw55zio';
      const templateID = 'template_6rfi07o';

      emailjs.send(serviceID, templateID, params).then((res) => {
        alert('Email sent successfully');
      });

      setItems([]);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userFindBack = await fetch('http://localhost:3000/cart-items', {
          method: 'GET',
          credentials: 'include',
        });
        const jsonFromBack = await userFindBack.json();
        setItems(jsonFromBack);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='cart-page-wrap'>
      <Header />
      {user ? (
        <div>
          <p></p>
          <h3>Would like to buy :</h3>
          <section id="main-container">
            {items.length > 0 ? (
              <div>
                <div className='card-wrap'>
                  {items.map((eachCard) => (
                    <div className="card" key={eachCard.id}>
                      <div className="head">
                        <div className="image">
                          <img src={eachCard.image} alt="pic" />
                        </div>
                      </div>
                      <div className="footer">
                        <div className="title">{eachCard.title}</div>
                        <div className="condition">{eachCard.condition}</div>
                        <div className="price">{eachCard.price} $</div>
                        <button
                          className="btn-return-card"
                          onClick={handleRemoveFromBasket}
                          data-cardid={eachCard.id}
                          data-userid={eachCard.user_id}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="add-to-cart" onClick={sendEmail}>
                  Checkout
                </button>
              </div>
            ) : (
              <div className='no-cards'>No cards</div>
            )}
          </section>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default CartPage;