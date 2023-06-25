import { useDispatch } from "react-redux";
import { uiActions } from "./uiSlice";
import { cartActions } from "./cartSlice";

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch(
                "https://redux-first-project-backend-default-rtdb.firebaseio.com/cart.json"
            );

            if(!response.ok){
                throw new Error('could not fetch cart data!');
            }
            
            const data = await response.json();

            return data;
        }

        try{
            const cartData = await fetchData();
            dispatch(cartActions.replaceCart(cartData))
        }catch(error){
            dispatch(
                uiActions.showNotification({
                  status: "error",
                  title: "Error...",
                  message: "Fetching cart data failed!",
                })
              );
        }

    }
}

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "sending cart data!",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://redux-first-project-backend-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error("sending cart data failed!");
      }
    };
    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success...",
          message: "sent cart data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error...",
          message: "sending cart data failed!",
        })
      );
    }
  };
};
