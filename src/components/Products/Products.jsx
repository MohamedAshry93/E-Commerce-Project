import React, { useContext, useEffect, useState } from "react";
import Style from "./Products.module.scss";
import axios from "axios";
import { useQuery } from "react-query";
import { Link } from 'react-router-dom';
import { BallTriangle } from "react-loader-spinner";
import { Helmet } from "react-helmet";
import { CartContext } from "../../Context/cartContext";
import toast from "react-hot-toast";
import { WishListContext } from "../../Context/wishListContext";

export default function Products() {
  let { addToCart, setCartNumber } = useContext(CartContext);
  async function addProductToCart(id) {
    let { data } = await addToCart(id);
    setCartNumber(data.numOfCartItems);
    // console.log(data.numOfCartItems);
    if (data.status === 'success') {
      toast.success('Product Added Successfully to your Cart', {
        duration: 4000,
        position: 'top-center',
        className: 'font-sm'
      })
    }
    else {
      toast.error('Error Adding Product')
    }
  }

  let { addToWishList } = useContext(WishListContext);
  async function addProductToWishList(id) {
    let { data } = await addToWishList(id);
    // console.log(data);
    if (data.status === 'success') {
      toast.success('Product Added Successfully to your Wish List', {
        duration: 4000,
        position: 'top-center',
        className: 'font-sm'
      })
      document.querySelector('.icon').classList.toggle('text-danger');
    }
    else {
      toast.error('Error Adding Product')
    }
  }

  let { data, isLoading, isError, isFetching, refetch } = useQuery('featuredProducts', getFeaturedProducts,
    {
      // staleTime: 30000,
      cacheTime: 3000,
      // refetchOnMount: false,
      refetchInterval: 5000,
      // enabled:false,
    }
  );

  function getFeaturedProducts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products');
  }


  // const [products, setProducts] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // async function getFeaturedProducts() {
  //   setIsLoading(true);
  //   let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
  //   setProducts(data.data)
  //   setIsLoading(false);
  // }
  // useEffect(() => {
  //   getFeaturedProducts();
  // }, []);


  return (<>
    {isLoading ? <div className="w-100 py-5 d-flex justify-content-center mt-5 vh-100 align-items-center">
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
    </div> : <div className="container py-5">
      {/* <button onClick={()=>refetch()} className="w-100 btn bg-main text-white">GET PRODUCTS</button> */}
      <Helmet>
        <meta charSet="utf-8" />
        <title>Products</title>
        <meta name="description" content="Products" />
      </Helmet>
      <div className="row mt-5 gy-4">
        {data?.data.data.map((product) =>
          <div key={product.id} className="col-md-2">
            <div className="product py-3 px-2 cursor-pointer">
              <Link to={`/productDetails/${product.id}`}>
                <img className="w-100" src={product.imageCover} alt={product.title} />
                <span className="text-main font-sm fw-bolder">{product.category.name}</span>
                <h3 className="h6">{product.title.split(' ').slice(0, 2).join(' ')}</h3>
                <div className="d-flex justify-content-between mt-3">
                  <span>{product.price} EGP</span>
                  <span><i className="fas fa-star rating-color"></i>{product.ratingsAverage}</span>
                </div>
              </Link>
              <div className="d-flex justify-content-between">
                <button onClick={() => addProductToCart(product.id)} className="btn bg-main text-white w-75 btn-sm mt-2">Add to Cart</button>
                <div onClick={() => addProductToWishList(product.id)} className="icon fs-3 text-center mt-1"><i className="fa-solid fa-heart"></i></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>}
  </>
  )
}
