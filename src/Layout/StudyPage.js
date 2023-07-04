import React, { useState, useEffect } from "react";
import { readDeck } from "../utils/api/index";
import { Link, useParams, useHistory } from "react-router-dom";

function StudyPage({ deck, setDeck }) {
  const [card, setCard] = useState([]);
  const [cardNum, setCardNum] = useState(0);
  const [isFront, setIsFront] = useState(true);
  const history = useHistory();
  const { deckId } = useParams();

  useEffect(() => {
    async function getDeck() {
      const abortController = new AbortController();
      const decksResponse = await readDeck(deckId, abortController.signal);
      setDeck(decksResponse);
      setCard(decksResponse.cards);
    }
    getDeck();
  }, [deckId, setDeck]);

  function isEnoughCards() {
    if (card.length < 3) {
      return (
        <React.Fragment>
          <h2>Not enough cards.</h2>
          <p>
            You need at least 3 cards to study. There are {card.length} cards in the deck.
          </p>
          <div className="row">
            <Link to={`/decks/${deckId}/cards/new`}>
              <button className="btn btn-primary my-2 ml-3">
                <span className="oi oi-plus mr-2"></span>
                Add Cards
              </button>
            </Link>
          </div>
        </React.Fragment>
      );
    } else if (card.length >= 3) {
      return (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{`Card ${cardNum + 1} of ${card.length}`}</h5>
            {displayCardFrontBack(isFront, cardNum)}
            <button onClick={handleFlip} className="btn btn-secondary mr-2">
              Flip
            </button>
            {nextButton()}
          </div>
        </div>
      );
    }
  }

  function nextButton() {
    if (!isFront) {
      return (
        <button onClick={handleNext} className="btn btn-primary">
          Next
        </button>
      );
    } else {
      return null;
    }
  }

  function handleFlip() {
    setIsFront(!isFront);
  }

  function handleNext() {
    if (cardNum + 2 <= card.length) {
      setIsFront(true);
      setCardNum(cardNum + 1);
    } else if (
      cardNum + 2 > card.length &&
      window.confirm("Would you like to restart from the beginning? Click 'cancel' to return to the home page.")
    ) {
      setCardNum(0);
      setIsFront(true);
    } else {
      history.push("/");
    }
  }

  function displayCardFrontBack(isFront, cardNum) {
    if (card.length > 1) {
      if (isFront) {
        return <p className="card-text">{card[cardNum].front}</p>;
      } else {
        return <p className="card-text">{card[cardNum].back}</p>;
      }
    }
  }

  function breadCrumb() {
    return (
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">
              <span className="oi oi-home mr-1"></span>
              Home
            </a>
          </li>
          <li className="breadcrumb-item">
            <a href={`/decks/${deckId}`}>{deck.name}</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
    );
  }

  return (
    <React.Fragment>
      {breadCrumb()}
      <div className="col" id="card-display">
        <h1>{`${deck.name}: Study`}</h1>
        {isEnoughCards()}
      </div>
    </React.Fragment>
  );
}

export default StudyPage;