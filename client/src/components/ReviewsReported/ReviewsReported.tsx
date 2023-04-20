import React from 'react';
import { useAppSelector } from "../../store/hooks";
import { Course } from '../CardDetail/CardDetail';
import { useAppDispatch } from "../../store/hooks";
import axios from 'axios';
import { deleteReport } from '../../store/coursesSlices';
import { backURL } from '../../main';

const ReviewsReported: React.FC = (): JSX.Element => {
  const reports = useAppSelector(state => state.courses.reviewsReported);
  const dispatch= useAppDispatch();
 
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const courseId = (e.target as HTMLButtonElement).value;
    let comment = (e.target as HTMLButtonElement).getAttribute('data-comment');
    comment === null? comment='' : comment=comment
    const url= `${backURL}/courses/${courseId}`
    fetch(url)
      .then((response) => response.json())
      .then((c: Course) => 
      axios.put(`${backURL}/courses/${courseId}`,{...c, reviews: c.reviews.filter(r=>r.comment!==comment) }
      ))
      .catch((err) => {
        window.alert(err);
      });
    dispatch(deleteReport(comment))
    alert('Review Deleted Successfully')
  }

  const handleReject = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    let comment = (e.target as HTMLButtonElement).getAttribute('data-comment');
    comment === null? comment='' : comment=comment
    dispatch(deleteReport(comment))
  }

  return (
    <div>
      {reports?.map((review, i) => (     
        <li key={i}>       
          <h3>Review:{review.comment}</h3>
          <h3>By User: {review.username}</h3>
          <h3>On Course: {review.courseName}</h3>
          <button onClick={handleReject} data-comment={review.comment}>Reject report</button>
          <button value={review.courseId} data-comment={review.comment} onClick={handleDelete}>Delete Review</button>
        </li>
      ))}
    </div>
  );
};

export default ReviewsReported;