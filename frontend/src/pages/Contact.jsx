//import React from 'react'

import { toast } from 'react-toastify';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Your message has been sent successfully! Our team will get back to you shortly.");
    e.target.reset();
  }
  return (
    <section>
      <div className="px-4 mx-auto max-w-screen-md">
        <h2 className='heading text-center'>Contact Us</h2>
        <p className='mb-8 lg:mb-16 font-light text-center text__para'>
          Got a technical issue? Want to send feedback about a beta feature? let us know.
        </p>
        <form onSubmit={handleSubmit} className='space-y-8'>
          <div>
            <label htmlFor="email" className='form__label'>
              Your Email
            </label>
            <input 
              type="email" 
              id='email'
              placeholder='example@gmail.com'
              className='form__input mt-1'
            />
          </div>
          <div>
            <label htmlFor="submit" className='form__label'>
              Subject
            </label>
            <input 
              type="text" 
              id='submit'
              placeholder='Let us know how we can help you'
              className='form__input mt-1'
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="Message" className='form__label'>
              Your Message
            </label>
            <textarea
              rows='6'
              id='message'
              placeholder='Leave a comment ....'
              className='form__input mt-1'
            />
          </div>
          <button type="submit" className="btn rounded sm:w-fit">Submit</button>
        </form>
      </div>
    </section>
  )
}

export default Contact