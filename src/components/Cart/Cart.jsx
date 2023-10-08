import React, { useContext, useEffect, useState } from "react";
import Style from "./Cart.module.scss";
import { Helmet } from "react-helmet";
import { CartContext } from "../../Context/cartContext";
import { useQuery } from "react-query";
import { BallTriangle } from "react-loader-spinner";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import emptyCart from '../../Assets/Images/empty-cart.webp';


export default function Cart() {

  let {
    getLoggedUserCart,
    removeCartItem,
    updateProductQuantity,
    setCartNumber,
    cartNumber,
    clearUserCart,
    cartDetails,
    setCartDetails,
    totalCartPrice,
    setTotalCartPrice,
    setCartId,
    isLoading,
    setIsLoading,
  } = useContext(CartContext);

  // const [mainDetails, setMainDetails] = useState('');

  async function getCartItems() {
    setIsLoading(true);
    let { data } = await getLoggedUserCart();
    setIsLoading(false)
    // console.log(data);
    // setMainDetails(data?.data.products)
    setCartDetails(data);
    setCartNumber(data?.numOfCartItems);
    setTotalCartPrice(data?.data.totalCartPrice);
    setCartId(data?.data._id);
  }

  // cartDetails?.data.products.map((product)=>{
  //   if(product.count > product.product.quantity)
  //   {
  //     toast.error('max. quantity')
  //   }
  // })

  async function removeItem(id) {
    let { data } = await removeCartItem(id);
    // console.log(data);
    setCartDetails(data);
    setCartNumber(data.numOfCartItems);
    setTotalCartPrice(data?.data.totalCartPrice);
    if (data.status === 'success') {
      toast.success('Product Removed Successfully', {
        duration: 4000,
        position: 'top-center',
        className: 'font-sm'
      });
    }
    else {
      toast.error('Error occurred');
    }
  }

  // for (let i = 0; i < cartDetails?.data.products.length; i++) {
  //   if (cartDetails?.data.products[i].count > cartDetails?.data.products[i].product.quantity) {
  //     toast.error('max. quantity')
  //   }
  // }

  async function updateCount(id, count, quantity) {
    let { data } = await updateProductQuantity(id, count, quantity);
    if (count <= quantity || count >= 1) {
      setCartDetails(data);
      setTotalCartPrice(data?.data.totalCartPrice);
    }
    else if(count <=0){
      removeItem(id);
    }
    else
    {
      toast.error('max. quantity')
    }
    if (data.status === 'success') {
      toast.success('Product Updated Successfully', {
        duration: 4000,
        position: 'top-center',
        className: 'font-sm'
      });
    }
    else {
      toast.error('Error Occurred');
    }
  }

  async function clearCartItems() {
    setCartDetails([]);
    setCartNumber(0);
    setTotalCartPrice(0);
    let { data } = await clearUserCart();
    if (data.message === 'success') {
      toast.success('Cart Items are Deleted');
    }
    else {
      toast.error('Error Occurred');
    }
  }

  useEffect(() => {
    getCartItems();
  }, []);


  // if (cartDetails == null) {
  //   return (
  //     <section className="d-flex vh-100 justify-content-center align-items-center mt-5 pt-5">
  //       <BallTriangle
  //         height={100}
  //         width={100}
  //         radius={5}
  //         color="#4fa94d"
  //         ariaLabel="ball-triangle-loading"
  //         wrapperClass={{}}
  //         wrapperStyle=""
  //         visible={true}
  //       />
  //     </section>
  //   )
  // }

  // let { data, isLoading, isError, isFetched } = useQuery('cartItems', getLoggedUserCart,
  //   {
  //     // staleTime: 0,
  //     // cacheTime: 0,
  //     refetchInterval: 1000,
  //   }
  // );

  if (isLoading === true) {
    return (
      <section className="d-flex vh-100 justify-content-center align-items-center mt-5 pt-5">
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#4fa94d"
          ariaLabel="ball-triangle-loading"
          wrapperClass={{}}
          wrapperStyle=""
          visible={true}
        />
      </section>
    )
  }

  return (<>
    <div className="w-75 mx-auto my-5 pt-5 px-3 bg-main-light">
      <h3>Shopping Cart</h3>
      {cartDetails?.numOfCartItems > 0 ? (<>
        <h4 className="h6 text-main fw-bolder">Cart Items: {cartNumber}</h4>
        <h4 className="h6 text-main fw-bolder">Total Cart Price: {totalCartPrice} EGP</h4>
        <div className="text-end">
          <button onClick={() => clearCartItems()} className="btn btn-outline-danger">Clear all Cart</button>
        </div>
        {cartDetails?.data.products.map((product) => <div key={product._id} className="row border-bottom py-2">
          <div className="col-md-1">
            <Link to={`/productDetails/${product.product.id}`}>
              <img className="w-100" src={product.product.imageCover} alt={product.product.title} />
            </Link>
          </div>
          <div className="col-md-11">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h3 className="h6">{product.product.title.split(' ').slice(0, 10).join(' ')}</h3>
                <h6 className="text-main">Price: {product.price} EGP</h6>
              </div>
              <div>
                <button onClick={() => updateCount(product.product.id, product.count + 1, product.product.quantity)} className="btn btn-outline-success border-main p-2">+</button>
                <span className="mx-2">{product.count}</span>
                <button onClick={() => updateCount(product.product.id, product.count - 1, product.product.quantity)} className="btn btn-outline-success border-main p-2">-</button>
              </div>
            </div>
            <button onClick={() => removeItem(product.product.id)} className="btn p-0"><i className="fas fa-trash-can font-sm text-danger"></i> Remove</button>
          </div>
        </div>)}
        <div className="d-flex justify-content-center align-items-center p-3">
          <Link to={'/payment'} className="btn bg-main text-white">Online Payment</Link>
          <button className="btn bg-main text-white ms-3">Cash On Delivery</button>
        </div>
      </>) : (<>
        <div className="d-flex justify-content-center align-items-center flex-column mt-5 py-5">
          <img src={emptyCart} alt="emptyCartImg" className="w-75"/>
          <h4 className="text-main text-center">Your Cart is Empty !!</h4>
          <Link to={'/'} className="pt-3">
            <button className="btn btn-outline-success fw-bold">Fill your Cart</button>
          </Link>
        </div>
      </>)}
    </div>
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cart</title>
        <meta name="description" content="CartItems" />
      </Helmet>
    </div>
  </>
  );
}
