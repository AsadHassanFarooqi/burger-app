import React, { useReducer, useMemo, useEffect } from "react";
import Ingredient from "../ingredient/Ingredient";
import "./burger-app.css";

// Ingredients in Burger
const ingredients = ["Lettuce", "Bacon", "Cheese", "Meat"];

// Ingredients Price
const letPrice = 2,
  baconPrice = 3,
  cheesePrice = 0.75,
  meatPrice = 5;

// Reducer function
function reducer(state, action) {
  switch (action.type) {
    case "Lettuce decrement":
      return { ...state, lettuce: state.lettuce - 1 };
    case "Lettuce increment":
      return { ...state, lettuce: state.lettuce + 1 };
    case "Lettuce":
      return { ...state, lettuce: action.count };
    case "Bacon increment":
      return { ...state, bacon: state.bacon + 1 };
    case "Bacon decrement":
      return { ...state, bacon: state.bacon - 1 };
    case "Bacon":
      return { ...state, bacon: action.count };
    case "Cheese increment":
      return { ...state, cheese: state.cheese + 1 };
    case "Cheese decrement":
      return { ...state, cheese: state.cheese - 1 };
    case "Cheese":
      return { ...state, cheese: state.count };
    case "Meat increment":
      return { ...state, meat: state.meat + 1 };
    case "Meat decrement":
      return { ...state, meat: state.meat - 1 };
    case "Meat":
      return { ...state, meat: state.count };
    default:
      throw new Error();
  }
}

const calculatePrice = (
  count,
  priceLettuce,
  priceBacon,
  priceCheese,
  priceMeat
) => {
  let total =
    count.lettuce * priceLettuce +
    count.bacon * priceBacon +
    count.cheese * priceCheese +
    count.meat * priceMeat;
  return total;
};

const BurgerApp = () => {
  // arrays to push ingredients inside burger
  let lettuceArr = [],
    baconArr = [],
    cheeseArr = [],
    meatArr = [];

  // reducer initial state
  let initialState = {
    lettuce: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  };

  // Reducer called
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    return () => {
      localStorage.setItem("ingredients", JSON.stringify(state));
    };
  });

  useEffect(() => { 
    let ingredients = localStorage.getItem("ingredients");
    if (ingredients) {
      let tempState = JSON.parse(ingredients);
      dispatch({ type: "Lettuce", count: tempState.lettuce });
      dispatch({ type: "Bacon", count: tempState.bacon });
      dispatch({ type: "Cheese", count: tempState.cheese });
      dispatch({ type: "Meat", count: tempState.meat });
    }
  },[dispatch]);

  const totalPrice = useMemo(
    () => calculatePrice(state, letPrice, baconPrice, cheesePrice, meatPrice),
    [state]
  );

  // Loop to store ingredients into respective array
  for (let i = 0; i < state.lettuce; i++) {
    lettuceArr.push(<div className="burger__lettuce"></div>);
  }
  for (let i = 0; i < state.bacon; i++) {
    baconArr.push(<div className="burger__bacon"></div>);
  }
  for (let i = 0; i < state.cheese; i++) {
    cheeseArr.push(<div className="burger__cheese"></div>);
  }
  for (let i = 0; i < state.meat; i++) {
    meatArr.push(<div className="burger__meat"></div>);
  }

  return (
    <div className="container">
      <div className="burger__wrapper">
        <div className="burger">
          <div className="burger__topbun"></div>
          {state.lettuce > 0 &&
            lettuceArr.map((item, index) => <span key={index}>{item}</span>)}
          {state.bacon > 0 &&
            baconArr.map((item, index) => <span key={index}>{item}</span>)}
          {state.cheese > 0 &&
            cheeseArr.map((item, index) => <span key={index}>{item}</span>)}
          {state.meat > 0 &&
            meatArr.map((item, index) => <span key={index}>{item}</span>)}
          <div className="burger__bottombun"></div>
        </div>
      </div>
      <div className="ingredients__wrapper">
        <h3 className="total__price">Current Price: ${totalPrice}</h3>
        <div className="ingredients">
          {ingredients.map((ingredient) => (
            <Ingredient
              ingredientName={ingredient}
              moreBtn={() => dispatch({ type: `${ingredient} increment` })}
              lessBtn={() => dispatch({ type: `${ingredient} decrement` })}
              key={ingredient}
              count={state}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BurgerApp;
