
const cartReducer = (state = { items: [], restaurantName: "" }, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      let newState = { ...state };

      if (action.payload.checkboxValue) {
        console.log("ADD TO CART");
        
        newState = {
          items: [...newState.items, action.payload],
        };
      } 
      else {
        console.log("REMOVE FROM CART");
        
        newState = {
          items: [
            ...newState.items.filter(
              (item) => item.name !== action.payload.name
            ),
          ],
        };
      }
      console.log(newState, "👉");
      return newState;
    }

    default:
      return state;
  }
};

export default cartReducer;
