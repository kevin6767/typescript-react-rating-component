import React, { useState, useEffect } from 'react'
import '../rating-component/styles/rating.scss'
interface RatingProps {
    icon: JSX.Element
    ratingCount: number
    initialRating?: number
    allowInteraction?: boolean
    onRatingChange?: (rating: number) => void
    className?: string
    classNameClonedIconContainer?: string
    classNameContainer?: string
}

const Rating: React.FC<RatingProps> = ({
    icon,
    ratingCount,
    initialRating = 0,
    allowInteraction = true,
    onRatingChange,
    className,
    classNameClonedIconContainer,
    classNameContainer,
}) => {
    const [clickedIndex, setClickedIndex] = useState<number | null>(
        initialRating - 1
    )
    const [hoverIndex, setHoverIndex] = useState<number | null>(null)

    useEffect(() => {
        setClickedIndex(initialRating - 1)
    }, [initialRating])

    const handleClick = (index: number) => {
        if (allowInteraction) {
            if (index === clickedIndex) {
                setClickedIndex(null) // If the same icon is clicked again, reset clickedIndex
                if (onRatingChange) {
                    onRatingChange(0)
                }
            } else {
                setClickedIndex(index) // Otherwise, update clickedIndex
                if (onRatingChange) {
                    onRatingChange(index + 1)
                }
            }
        }
    }

    const handleMouseEnter = (index: number) => {
        if (allowInteraction) {
            setHoverIndex(index)
        }
    }

    const handleMouseLeave = () => {
        setHoverIndex(null)
    }

    const renderStars = () => {
        const stars = []
        for (let i = 0; i < ratingCount; i++) {
            stars.push(
                <div
                    key={i}
                    style={{
                        cursor: allowInteraction ? 'pointer' : 'default',
                    }}
                    onMouseEnter={() => handleMouseEnter(i)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick(i)}
                    className={`${classNameClonedIconContainer || `clonedIcon-container`}`}
                >
                    {React.cloneElement(icon, {
                        className:
                            //@ts-ignore
                            i <= clickedIndex ||
                            (i === hoverIndex && hoverIndex !== null) ||
                            //@ts-ignore
                            i <= hoverIndex
                                ? `filled`
                                : ``,
                    })}
                </div>
            )
        }
        return stars
    }

    return (
        <div className={`${classNameContainer || 'rating-container'}`}>
            {renderStars()}
        </div>
    )
}

export default Rating
