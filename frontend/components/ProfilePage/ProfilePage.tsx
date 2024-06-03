import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import './Profile.css';

import axios from 'axios';

import { JsonFromBackInterface, CardsInterface } from './interface';

export default function ProfilePage() {
  const [title, setTitle] = useState<string>('');
  const [picture, setPicture] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [condition, setCondition] = useState<string>('New');
  const [hasErrorTitle, setHasErrorTitle] = useState<boolean>(false);
  const [cards, setCards] = useState<CardsInterface[]>([]);
  const [newCard, setNewCard] = useState<string>('');
  const [user, setUser] = useState<JsonFromBackInterface>();

  useEffect(() => {
    (async function () {
      const userFindBack: Promise<JsonFromBackInterface | null> = await fetch(
        'http://localhost:3000/user-session',
        {
          method: 'GET',
          credentials: 'include',
        }
      );
      const jsonFromBack: JsonFromBackInterface = await userFindBack.json();
      console.log(jsonFromBack);

      setUser(jsonFromBack);
    })();
  }, []);

  useEffect(() => {
    getCards().then((data) => {
      setCards(data);
      setNewCard(data[0].id);
    });
  }, [newCard]);
  console.log(newCard);

  function getCards(): Promise<CardsInterface[]> {
    return fetch(`http://localhost:3000/cards`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
  }

  function handleTitleChange(event) {
    setTitle(event.target.value);
    setHasErrorTitle(event.target.value.trim().length === 0);
  }

  function handlePictureChange(event) {
    setPicture(event.target.files[0]);
    setHasErrorTitle(!event.target.files);
  }
  function handlePriceChange(event) {
    setPrice(event.target.value);
    setHasErrorTitle(event.target.value.trim().length === 0);
  }
  function handleConditionChange(event) {
    setCondition(event.target.value);
    setHasErrorTitle(event.target.value.trim().length === 0);
  }

  async function sendCard(event): Promise<void> {
    event.preventDefault();

    const formData = new FormData();
    formData.append('picture', picture);
    formData.append('title', title);
    formData.append('price', price);
    formData.append('condition', condition);
    formData.append('user_id', user.id);
    try {
      await axios
        .post('http://localhost:3000/cards', formData, {
          headers: { 'content-type': 'multipart/form-data' },
        })
        .then((res) => setNewCard(res.data));
    } catch (error) {
      console.log({ ERROR_SEND_CARD: error });
    }
  }

  return (
    <div>
      <Header />
      {user ? (
        <div>
          <div className="wrapper">
            <div>
              <h4>Form to adding card</h4>
              <form className="form_add_card" onSubmit={sendCard}>
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Title
                </label>
                <input
                  name="title"
                  type="text"
                  onChange={handleTitleChange}
                  className="form-control"
                  id="exampleFormControlInput1"
                  style={{
                    border: hasErrorTitle ? '1px solid red' : null,
                  }}
                />

                <label className="form-label">Picture</label>

                <div className="input-group mb-3">
                  <input
                    type="file"
                    className="form-control"
                    name="picture"
                    id="inputGroupFile02"
                    onChange={handlePictureChange}
                    style={{
                      border: hasErrorTitle ? '1px solid red' : null,
                    }}
                  />
                  <label
                    className="input-group-text"
                    htmlFor="inputGroupFile02"
                  >
                    Upload
                  </label>
                </div>
                <label className="form-label">Price</label>

                <div className="input-group mb-3">
                  <span className="input-group-text">$</span>
                  <span className="input-group-text">0.00</span>
                  <input
                    onChange={handlePriceChange}
                    name="price"
                    type="integer"
                    className="form-control"
                    style={{
                      border: hasErrorTitle ? '1px solid red' : null,
                    }}
                    aria-label="Dollar amount (with dot and two decimal places)"
                  />
                </div>
                <label className="form-label">Condition</label>

                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="condition"
                  onChange={handleConditionChange}
                  style={{
                    border: hasErrorTitle ? '1px solid red' : null,
                  }}
                >
                  <option value="new">New</option>
                  <option value="good">Good</option>
                  <option value="satisfactory">Satisfactory</option>
                  <option value="frayed">Frayed</option>
                  <option value="bad">Bad</option>
                </select>
                <button
                  type="submit"
                  className="btn btn-primary"
                  id="add-new-card"
                >
                  Add new Card
                </button>
              </form>
            </div>

            <div>
              <h3>Your cards:</h3>
              <div className="cards">
                {cards.length !== 0 ? (
                  cards.map((card) => (
                    <div className="card" key={`${card.id}`}>
                      <div className="picture">
                        <img src={`${card.image}`} alt="" />
                      </div>
                      <div className="title">{card.title}</div>
                      <div className="condition">
                        {' '}
                        Condition: {card.condition}
                      </div>
                      <div className="price">$ {card.price}</div>
                    </div>
                  ))
                ) : (
                  <div>You haven't cards yet</div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
