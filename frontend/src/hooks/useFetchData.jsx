import {useEffect, useState} from 'react'

const useFetchData = (url) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await fetch(url, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })

                const result = await res.json()

                if(!res.ok){
                    throw new Error(result.message + ' ⚠')
                }

                // If result.data exists, use it, else use full result
                setData(result.data)
                setLoading(false)

            } catch (err) {
                setLoading(false)
                setError(err.message)
            }
        }
        fetchData()
    }, [url])

    return {
        data, loading, error
    }
}

export default useFetchData
