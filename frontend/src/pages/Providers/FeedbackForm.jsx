import { useState, useContext } from "react"
import { AiFillStar } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../config';
import { authContext } from '../../context/AuthContext';

const FeedbackForm = () => {
    const { id } = useParams();
    const { token } = useContext(authContext);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmitReveiw = async e => {
        e.preventDefault();
        if (!token) {
            toast.error("Please log in to submit a review!");
            return;
        }
        if (!rating || !reviewText) {
            toast.error("Please provide both a rating and a required text review.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`${BASE_URL}/api/v1/services/${id}/reviews`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ rating, reviewText })
            });

            const result = await res.json();
            if (!res.ok) throw new Error(result.message);

            toast.success(result.message);
            setTimeout(() => window.location.reload(), 1500);
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form action="">
            <div>
                <h3 className='text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0'>
                    How would you rate the overall experience?
                </h3>

                <div>
                    {[...Array(5).keys()].map((_, index) => {
                        index += 1;

                        return (
                            <button
                                key={index}
                                type='button'
                                className={`${index <= ((rating && hover) || hover)
                                    ? "text-[#e3ef55]"
                                    : "text-gray-400"
                                    } bg-transparent border-none outline-none text-[22px] cursor-pointer `}
                                onClick={() => setRating(index)}
                                onMouseEnter={() => setHover(index)}
                                onMouseLeave={() => setHover(rating)}
                                onDoubleClick={() => {
                                    setHover(0);
                                    setRating(0);
                                }}
                            >
                                <span>
                                    <AiFillStar className="hover:scale-110 transition-all duration-300" />
                                </span>
                            </button>
                        )
                    })}
                </div>
            </div>

            <div className="mt-[30px]">
                <h3 className='text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0'>
                    Share your feedback or suggestions.
                </h3>

                <textarea className="border border-solid border-[#0066ff34] focus:outline outline-[rgb(59,135,249)] w-full px-6 py-3 rounded-md shadow-panelShadow"
                    placeholder="Write your message..."
                    onChange={e => setReviewText(e.target.value)}
                    name="" id="" cols="30" rows="5"></textarea>
                <button type="submit" className="btn mt-4 w-full" onClick={handleSubmitReveiw} disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit Feedback'}
                </button>
            </div>

        </form>
    )
}

export default FeedbackForm