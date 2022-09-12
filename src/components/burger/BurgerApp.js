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
      return { ...state, cheese: action.count };
    case "Meat increment":
      return { ...state, meat: state.meat + 1 };
    case "Meat decrement":
      return { ...state, meat: state.meat - 1 };
    case "Meat":
      return { ...state, meat: action.count };
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

  // reducer initial state
let initialState = JSON.parse(localStorage.getItem("ingredients")) || {
  lettuce: 0,
  bacon: 0,
  cheese: 0,
  meat: 0,
};


const getItemJSX = (type, count) => {
    if (!count) return <></>;
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push(<div key={type} className={"burger__"+ type}></div>);
    }
    return <>{data.map((item, index) => <span key={index}>{item}</span>)}</>;
}
  
const getIngredients = (state) => {
  return <>{Object.keys(state).map(key => getItemJSX(key, state[key]))}</>
}  

const BurgerApp = () => {
  // Reducer called
  const [state, dispatch] = useReducer(reducer, initialState);

  const stateChangeHandler = (type) => {
    dispatch({ type });
  };

  useEffect(() => {
    localStorage.setItem("ingredients", JSON.stringify(state));
  }, [state])
  
  useEffect(() => { 
    let ingredients = localStorage.getItem("ingredients");
    debugger;
    if (ingredients) {
      let tempState = JSON.parse(ingredients);
      if(tempState.lettuce) dispatch({ type: "Lettuce", count: tempState.lettuce});
      if (tempState.bacon)
        dispatch({ type: "Bacon", count: tempState.bacon });
      if (tempState.cheese)
        dispatch({ type: "Cheese", count: tempState.cheese });
      if (tempState.meat
      ) dispatch({ type: "Meat", count: tempState.meat });
    }
  },[dispatch]);

  const totalPrice = useMemo(
    () => calculatePrice(state, letPrice, baconPrice, cheesePrice, meatPrice),
    [state]
  );

  const data = useMemo(() => {
    return getIngredients(state);
  }, [state]);

  return (
    <div className="container">
      <div className="burger__wrapper">
        <div className="burger">
          <div className="burger__topbun"></div>
          {data}
          <div className="burger__bottombun"></div>
        </div>
      </div>
      <div className="ingredients__wrapper">
        <h3 className="total__price">Current Price: ${totalPrice}</h3>
        <div className="ingredients">
          {ingredients.map((ingredient) => (
            <Ingredient
              ingredientName={ingredient}
              moreBtn={() => stateChangeHandler(`${ingredient} increment`)}
              lessBtn={() => stateChangeHandler(`${ingredient} decrement`)}
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
