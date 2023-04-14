import React from 'react'
import ReviewsReported from '../../components/ReviewsReported/ReviewsReported'

const Dashboard : React.FC = ():JSX.Element => {
  return (
    <div>
      <h1>Soy el Dashboard</h1>
      <ReviewsReported />
    </div>
  )
}

export default Dashboard