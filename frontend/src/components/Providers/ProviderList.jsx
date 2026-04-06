//import React from 'react'
import {providers} from '../../assets/data/providers'
import ProviderCard from './ProviderCard'

const ProviderList = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]'>
      {providers.map((provider) => <ProviderCard key={provider.id} provider={provider}/>)}
    </div>
  )
}

export default ProviderList