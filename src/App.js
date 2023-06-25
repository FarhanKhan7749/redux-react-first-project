import { Fragment } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";

import { sendCartData, fetchCartData } from "./store/cartAction.";
let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);

  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(()=>{
    dispatch(fetchCartData());
  },[dispatch]);

  useEffect(() => {
    // const sendCartData = async () => {
    //   dispatch(
    //     uiActions.showNotification({
    //       status: "pending",
    //       title: "Sending...",
    //       message: "sending cart data!",
    //     })
    //   );
    //   const response = await fetch(
    //     "https://redux-first-project-backend-default-rtdb.firebaseio.com/cart.json",
    //     {
    //       method: "PUT",
    //       body: JSON.stringify(cart),
    //     }
    //   );

    //   if (!response.ok) {
    //     throw new Error("sending cart data failed!");
    //   }

    //   dispatch(
    //     uiActions.showNotification({
    //       status: "success",
    //       title: "Success...",
    //       message: "sent cart data successfully!",
    //     })
    //   );
    // };

    if (isInitial) {
      isInitial = false;
      return;
    }

    dispatch(sendCartData(cart));

    // sendCartData().catch((error) => {
    //   dispatch(
    //     uiActions.showNotification({
    //       status: "error",
    //       title: "Error...",
    //       message: "sending cart data failed!",
    //     })
    //   );
    // });
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
