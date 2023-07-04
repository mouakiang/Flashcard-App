import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createDeck } from "../utils/api";
import { useHistory } from "react-router";

function CreateDeck() {
  const history = useHistory();
  const [newDeck, setNewDeck] = useState({
    name: "",
    description: "",
  });

  async function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    const response = await createDeck({ ...newDeck }, abortController.signal);
    // Handle the response if needed
    history.push("/");
  }

  function handleChange({ target }) {
    setNewDeck({ ...newDeck, [target.name]: target.value });
  }

  function breadCrumb() {
    return (
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">
              <span className="oi oi-home mr-1" />
              Home
            </a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
    );
  }

  return (
    <React.Fragment>
      {breadCrumb()}
      <h1>Create Deck</h1>
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            id="name"
            placeholder="Deck Name"
            onChange={handleChange}
            value={newDeck.name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
            placeholder="Brief description of the deck"
            onChange={handleChange}
            value={newDeck.description}
          />
        </div>
        <Link to="/">
          <button className="btn btn-secondary mr-2">Cancel</button>
        </Link>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </React.Fragment>
  );
}

export default CreateDeck;