import { listDecks, deleteDeck } from "../utils/api";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

function Home() {
  const [decks, setDecks] = useState([]);
  const history = useHistory();

  useEffect(() => {
    async function loadDecks() {
      const abortController = new AbortController();
      const decksResponse = await listDecks(abortController.signal);
      setDecks(decksResponse);
    }
    loadDecks();
  }, []);

  async function handleDelete(id) {
    if (
      window.confirm("Delete this deck? You will not be able to recover it.")
    ) {
      history.go(0);
      return await deleteDeck(id);
    }
  }

  function displayDeckList() {
    return (
      <div className="card-deck">
        {decks.map((deck) => (
          <div className="col-sm-12 col-md-12 col-lg-6">
            <div className="card col my-2">
              <div className="card-body">
                <div className="row">
                  <div className="col-9">
                    <h5 className="card-title">{`${deck.name}`}</h5>
                  </div>
                  <div className="col-3">
                    <p>{`${deck.cards.length} cards`}</p>
                  </div>
                </div>
                <p className="card-text">{`${deck.description}`}</p>
                <Link to={`/decks/${deck.id}`}>
                  <button className="btn btn-secondary">
                    <span className="oi oi-eye mr-2"></span>View
                  </button>
                </Link>
                <Link to={`/decks/${deck.id}/study`}>
                  <button className="btn btn-primary mx-1">
                    <span className="oi oi-book mr-2"></span>Study
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(deck.id)}
                  className="btn btn-danger float-right"
                >
                  <span className="oi oi-trash"></span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <React.Fragment>
      <div>
        <div className="col">
          <Link to="/decks/new">
            <button className="btn btn-secondary my-3">
              <span className="oi oi-plus mr-2"></span>
              Create Deck
            </button>
          </Link>
        </div>
        <div>{displayDeckList()}</div>
      </div>
    </React.Fragment>
  );
}

export default Home;