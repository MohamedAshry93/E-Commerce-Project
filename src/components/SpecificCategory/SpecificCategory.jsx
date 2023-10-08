import React, { useContext } from 'react';
import Style from './SpecificCategory.module.scss';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { BallTriangle } from "react-loader-spinner";

export default function SpecificCategory() {

  let params = useParams();
  // console.log(params);
  function getCategoryDetails(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
  }
  let { data } = useQuery('categoryDetails', () => getCategoryDetails(params.id));
  // console.log(data);



  return (<>
    {data?.data.data ? (<>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{data?.data.data.name}</title>
        <meta name="description" content="Product Details" />
      </Helmet>
      <div className='row justify-content-center py-5 mt-5 align-items-center'>
        <h3 className='mb-4 fw-bold'>Category Details</h3>
        <div className="col-md-6">
          <div className='rounded rounded-3 border overflow-auto box-shadow cursor-pointer pb-2 category-hover'>
            <figure>
              <img src={data?.data.data.image} alt="specificCategoryImg" className='w-100 border' />
            </figure>
            <div className='text-center text-main'>
              <h5 className='h3 fw-bold'>{data?.data.data.name}</h5>
            </div>
          </div>
        </div>
      </div>
    </>) : (<>
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
    </>)}
  </>
  )
}
