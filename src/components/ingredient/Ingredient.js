import React from 'react';
import './ingredient.css'

const Ingredient = ({ingredientName, lessBtn, moreBtn, count}) => {
  let name = ingredientName.toLowerCase();
  let check = false;
  for(const ing in count) {
    if(ing === name && count[ing] > 0) {
      check = true;
    } 
  }
  return (
    <div className="wrapper">
      <p className="ingredient__name">{ingredientName}</p>
      <button className={`ingredient__btn ${!check ? 'disabled' : ''}`} onClick={lessBtn} disabled={!check}>Less</button>
      <button className="ingredient__btn" onClick={moreBtn}>More</button>
    </div>
  )
}

export default Ingredient