import React from 'react'
import { currentCard } from '../../ejemplo';
import Card from '../Card/Card';

const CardsContainer: React.FC = () : JSX.Element  => {
  return (
    <>
    {currentCard.map((course)=>(
        <Card
        name= {course.name}
        difficults={course.difficulty}
        id= {course._id.$oid}
        image={course.image}
        
        /* description = {course.description} */
        />
    ))}
    </>
  )
}

export default CardsContainer