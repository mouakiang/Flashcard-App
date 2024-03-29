import React from "react";
import { Link } from "react-router-dom";

function FormCard({ handleSubmit, handleChange, cardInput, deckId }) {
  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <div className="form-group">
        <label htmlFor="front">Front</label>
        <textarea
          className="form-control"
          id="front"
          name="front"
          rows="3"
          placeholder="Front side of the card"
          type="text"
          onChange={handleChange}
          value={cardInput.front}
        />
      </div>
      <div className="form-group">
        <label htmlFor="back">Back</label>
        <textarea
          className="form-control"
          id="back"
          name="back"
          rows="3"
          placeholder="Back side of the card"
          type="text"
          onChange={handleChange}
          value={cardInput.back}
        />
      </div>
      <div>
        <Link to={`/decks/${deckId}`}>
          <button className="btn btn-secondary mr-2">Done</button>
        </Link>
        <button className="btn btn-primary mr-2">Save</button>
      </div>
    </form>
  );
}

export default FormCard;