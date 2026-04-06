import { useState } from "react"
import avatar from "../../assets/images/avatar-icon.png"
import { formateDate } from "../../utils/formateDate"
import { AiFillStar } from 'react-icons/ai'
import FeedbackForm from "./FeedbackForm"

const Feedback = ({ reviews, totalRating }) => {

  const [showFeedbackForm, setShowFeedbackForm] = useState(false)

  return (
    <div>
      <div className="mb-[50px]">
        <h4 className="text-[20px] leading-[30px] font-bold text-headingColor mb-[30px]">
          All Reviews ({totalRating})
        </h4>

        {reviews?.map((review, index) => (
          <div key={index} className="flex justify-between gap-10 mb-[30px] border-b pb-5">
            <div className="flex gap-3">
              <figure className="w-10 h-10 rounded-full">
                <img src={review?.user?.photo || avatar} className="w-full h-full object-cover rounded-full" alt="" />
              </figure>

              <div>
                <h5 className="text-[16px] leading-6 text-primaryColor font-bold">{review?.user?.name || "Anonymous"}</h5>
                <p className="text-[14px] leading-6 text-textColor">
                  {formateDate(review?.createdAt || new Date())}
                </p>
                <p className="text__para mt-3 font-medium text-[15px]">{review?.reviewText}</p>
              </div>
            </div>

            <div className="flex gap-1">
              {[...Array(review?.rating).keys()].map((_, index) => <AiFillStar key={index} color="#0067FF" />)}
            </div>
          </div>
        ))}

        {(!reviews || reviews.length === 0) && (
            <p className="text-gray-500 italic">No reviews yet. Be the first to leave one!</p>
        )}

      </div>
      {!showFeedbackForm &&
        <div className="text-center">
          <button className="btn" onClick={() => setShowFeedbackForm(true)}> Give Feedback</button>
        </div>
      }

      {showFeedbackForm && <FeedbackForm />}

    </div>
  )
}

export default Feedback