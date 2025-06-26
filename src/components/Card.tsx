import React from "react";

function Card() {
  const handleCardClick = () => {
    console.log("Card clicked");
  };
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log("Delete card");
  };
  return (
    <div onClick={handleCardClick}>
      Card content
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default Card;
