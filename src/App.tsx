import React from 'react'
import './App.css'
import Rating from './components/rating-component/Rating'
import StarIcon from '@mui/icons-material/Star'

function App() {
    // @ts-ignore
    const [rating, setRating] = React.useState<Rating>(0)
    return (
        <div className="App">
            <Rating
                icon={<StarIcon />}
                ratingCount={5}
                onRatingChange={setRating}
            />
            <div>money machine {`${rating}`}</div>
        </div>
    )
}

export default App
