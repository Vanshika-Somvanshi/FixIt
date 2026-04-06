import { useState } from 'react'
import ProviderCard from '../../components/Providers/ProviderCard'
import Testimonial from '../../components/Testimonial/Testimonial'
import useFetchData from '../../hooks/useFetchData.jsx'
import { BASE_URL } from '../../config.js'

const Providers = () => {
  const [query, setQuery] = useState('')
  const [debounceQuery, setDebounceQuery] = useState('')

  const handleSearch = () => {
    setQuery(query.trim())
  }

  const { data: providers, loading, error } = useFetchData(`${BASE_URL}/api/v1/services?query=${query}`)

  return <>
    <section className='bg-[#fff9ea] p-10'>
      <div className="container text-center">
        <h2 className='heading'>Find a Home Service/Repair near you</h2>
        <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
          <input 
            type="search" 
            className='py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor' 
            placeholder='Search Provider' 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className='btn mt-0 rounded-[0px] rounded-r-md' onClick={handleSearch}>Search</button>
        </div>
      </div>
    </section>

    <section>
      <div className="container">
        {loading && <p className="text-center font-bold">Loading Providers...</p>}
        {error && <p className="text-center text-red-500 font-bold">{error}</p>}
        {!loading && !error && (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 '>
            {providers?.map((provider) => <ProviderCard key={provider._id} provider={provider} />)}
          </div>
        )}
      </div>
    </section>

    <section>
      <div className="container">
        <div className="xl:w-[470px] mx-auto">
          <h2 className='heading text-center m-5'> What our customer say</h2>
          <p className='text__para text-center mb-4'>
          World class service for everyone. Our Home Service System Offers unmatched, expert and skilled people. 
          From your home to the repair.
          </p>
        </div>
        <Testimonial />
      </div>
    </section>
  </>
}

export default Providers
