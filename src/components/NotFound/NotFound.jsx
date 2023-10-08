import React from 'react';
import Style from './NotFound.module.scss';
import Notfound from '../../Assets/Images/error.svg'
export default function NotFound() {
  return (
    <div className='text-center py-5 mt-5'>
      <img src={Notfound} alt="error img" className='w-50'/>
    </div>
  )
}
