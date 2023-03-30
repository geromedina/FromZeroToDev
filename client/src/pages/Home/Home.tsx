import React from 'react'
import Card from '../../components/Card/Card'
import { currentCard } from '../../ejemplo'

const Home: React.FC = (): JSX.Element => {
    return <Card 
    name={currentCard.name} 
    difficults={currentCard.difficulty} 
    id={currentCard._id.$oid} />
}

export default Home