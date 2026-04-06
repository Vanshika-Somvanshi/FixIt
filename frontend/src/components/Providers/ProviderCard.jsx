import React from 'react'
import starIcon from '../../assets/images/Star.png'
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';

const ProviderCard = ({ provider }) => {

  const {
    _id,
    name,
    averageRating,
    totalRating,
    photo,
    specialization,
  } = provider;

  return (
    <div className='p-3 lg:p-5 shadow-panelShadow rounded-[20px] transition-all duration-300 hover:scale-[1.02] bg-white cursor-pointer group'>
      <div className='rounded-[15px] overflow-hidden bg-gray-100 flex justify-center'>
        <img src={photo || starIcon} className='w-full object-cover h-[250px]' alt="Provider" />
      </div>

      <h2 className='text-[18px] leading-[30px] lg:text-[26px] lg:leading-9 text-black font-[700] mt-3 lg:mt-5'>
        {name}
      </h2>

      <div className="mt-2 lg:mt-4 flex items-center justify-between">
        <span className='bg-[#CCF0F3] text-[#246BCE] py-1 px-2 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px]
        lg:leading-7 font-semibold rounded'>
          {specialization}
        </span>

        <div className='flex items-center gap-[6px]'>
          <span className='flex items-center gap-[6px] text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-semibold
          text-black'>
            <img src={starIcon} alt="" /> {averageRating}
          </span>
          <span className='text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-semibold text-[#696969]'>({totalRating})</span>
        </div>
      </div>

      <div className="mt-[a8px] lg:mt-5 flex items-center justify-between">
        <div>
        </div>

        <Link to={`/providers/${_id}`} className='w-[44px] h-[44px] rounded-full border border-solid boder-[#181A1E] mt-[30px] 
              mx-auto flex items-center justify-center group hover:bg-blue-500 hover:border-none'>
          <BsArrowRight className='group-hover:text-white w-6 h-5' />
        </Link>

      </div>

    </div>
  )
}

export default ProviderCard