import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import { InterfaceItems, UserInterface, CitySearchInterface } from './interfaces';
import './HomePage.css';

const MainPage = (): JSX.Element => {
  const [items, setItems] = useState<InterfaceItems[]>(
  //   [
  //   {
  //     id: 0,
  //     user_id: 0,
  //     image: '',
  //     title: '',
  //     price: 0,
  //     condition: '',
  //   },
  // ]
  []
);

  const [user, setUser] = useState<UserInterface>(
  //   {
  //   name: '',
  //   email: '',
  //   city: '',
  // }
);

  const [citySearch, setCitySearch] = useState<CitySearchInterface | string>(
  
);
//   {
  //   city: '',
  // }
  //! filter cards by city
  const handleSearchInputChange = async (e): Promise<void> => {
    // we use it in order to collect entire string from input, each new letter will be added to the prevoous string
    setCitySearch({ ...citySearch , [e.target.name]: e.target.value } );
    console.log(citySearch);
  };

  const searchByCity = async (e): Promise<void> => {
    e.preventDefault();
    const res = await fetch('http://localhost:3000/search-by-city', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(citySearch),
      credentials: 'include',
    });
    console.log('?11111!: ', JSON.stringify(citySearch));
    const toJson = await res.json();
    setItems(toJson);
  };

  //! to add card to bascket
  const handleAddToBasket = async (e): Promise<void> => {
    // e.preventDefault();
    const user_id = e.target.dataset.userid;
    const card_id = e.target.dataset.cardid;
    console.log('USER ID: ', user_id);
    console.log('CARD ID: ', card_id);
    console.log(
      JSON.stringify({ card_id: Number(card_id), user_id: Number(user_id) })
    );

    const res = await fetch('http://localhost:3000/add-to-basket', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        card_id: Number(card_id),
        user_id: Number(user_id),
      }),
      credentials: 'include',
    });
    // const toJson = await res.json();
    // console.log('?11111: ', toJson);
    if (res.ok) {
      alert('CARD WAS ADDED...PLEASE CHECK YOUR BASKET');
    }
  };

  //! to render all cards
  useEffect(() => {
    (async function (): Promise<void> {
      const userFindBack = await fetch('http://localhost:3000/all-items', {
        method: 'GET',
        credentials: 'include',
      });
      const jsonFromBack = await userFindBack.json();
      // dispatch(getUser(jsonFromBack));
      setItems(jsonFromBack);
    })();
  }, []);

  //! to defin if session exists
  useEffect(() => {
    (async function () : Promise<void> {
      const userFindBack = await fetch('http://localhost:3000/user-session', {
        method: 'GET',
        credentials: 'include',
      });
      const jsonFromBack = await userFindBack.json();
      // dispatch(getUser(jsonFromBack));
      setUser(jsonFromBack);
    })();
  }, []);

  return (
    <div>
      <Header />
      <form name="search" onSubmit={searchByCity} id="search-by-city">
        {/* <div className="mb-3"> */}
        <label htmlFor="exampleInputEmail1" className="form-label">
          <h5>City</h5>
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleInputCity"
          aria-describedby="emailHelp"
          name="city"
          onChange={handleSearchInputChange}
        />
        {/* </div> */}
        <button type="submit" className="btn btn-primary">
          search
        </button>
      </form>

      {user ? (
        <>
          {/* <div>HOME PAGE</div> */}
          <div id="user-name-container">{/* <h6>User: {user.name}</h6> */}</div>
          <section id="main-container" className="py-5 text-center container">
            {items.length > 0 ? (
              items.map((eachCard) => (
                // <div className="each-card-main-page">
                //   <img
                //     src={eachCard.image}
                //     className="card-img-top1"
                //     alt="pic"
                //   />
                //   <div className="card-body ">
                //     <h6>{eachCard.title}</h6>
                //     <h6>{eachCard.price}</h6>
                //     <h6>{eachCard.condition}</h6>
                //     <input
                //       data-cardid={eachCard.id}
                //       data-userid={eachCard.user_id}
                //       className="add-to-cart-btn"
                //       type="button"
                //       value="add to Cart"
                //       onClick={handleAddToBasket}
                //     />
                //   </div>
                // </div>S

                <div className="card">
                  <div className="head">
                    <div className="image">
                      <img src={eachCard.image} alt="pic" />
                    </div>
                  </div>
                  <div className="footer">
                    <div className="title">{eachCard.title}</div>
                    <div className="condition">{eachCard.condition}</div>
                    {/* <div className="city">Город</div> */}
                    <div className="price">{eachCard.price} $</div>
                    <input
                      data-cardid={eachCard.id}
                      data-userid={eachCard.user_id}
                      className="add-to-cart-btn"
                      type="button"
                      value="Add to сart"
                      onClick={handleAddToBasket}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div>No cards</div>
            )}
          </section>
        </>
      ) : (
        <>
          {/* <div>HOME PAGE</div> */}
          <section id="main-container" className="py-5 text-center container">
            {items.length > 0 ? (
              items.map((eachCard) => (
                // <div className="each-card-main-page">
                //   <img
                //     src={eachCard.image}
                //     className="card-img-top1"
                //     alt="pic"
                //   />
                //   <div className="card-body ">
                //     <h6>{eachCard.title}</h6>
                //     <h6>{eachCard.price}</h6>
                //     <h6>{eachCard.condition}</h6>
                //   </div>
                // </div>

                <div className="card">
                  <div className="head">
                    <div className="image">
                      <img src={eachCard.image} alt="pic" />
                    </div>
                  </div>
                  <div className="footer">
                    <div className="title">{eachCard.title}</div>
                    <div className="condition">{eachCard.condition}</div>
                    {/* <div className="city">Город</div> */}
                    <div className="price">{eachCard.price} $</div>
                  </div>
                </div>
              ))
            ) : (
              <div>No cards</div>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default MainPage;
