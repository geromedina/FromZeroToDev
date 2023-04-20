import React from 'react';
import { useAppSelector } from "../../store/hooks";
import { Course } from '../CardDetail/CardDetail';
import { useAppDispatch } from "../../store/hooks";
import axios from 'axios';
import { deleteReport } from '../../store/coursesSlices';
import { backURL } from '../../main';

const ReviewsReported: React.FC = (): JSX.Element => {
  const reports = useAppSelector(state => state.courses.reviewsReported);
  const dispatch = useAppDispatch();

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const courseId = (e.target as HTMLButtonElement).value;
    let comment = (e.target as HTMLButtonElement).getAttribute('data-comment');
    comment === null ? comment = '' : comment = comment
    const url = `${backURL}/courses/${courseId}`
    fetch(url)
      .then((response) => response.json())
      .then((c: Course) =>
        axios.put(`${backURL}/courses/${courseId}`, { ...c, reviews: c.reviews.filter(r => r.comment !== comment) }
        ))
      .catch((err) => {
        window.alert(err);
      });
    dispatch(deleteReport(comment))
    alert('Review Deleted Successfully')
  }

  const handleReject = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    let comment = (e.target as HTMLButtonElement).getAttribute('data-comment');
    comment === null ? comment = '' : comment = comment
    dispatch(deleteReport(comment))
  }

  return (
    <div className="flex flex-col items-center justify-center mt-4">
      <h2 className="text-2xl font-bold mb-4">Reviews reports</h2>
      {reports?.map((review, i) => (
        <li key={i} className="p-4 border rounded-lg shadow-lg my-4 w-full max-w-md">
          <h3 className="text-lg font-bold mb-2">Review: {review.comment}</h3>
          <h3 className="text-lg font-bold mb-2">By User: {review.username}</h3>
          <h3 className="text-lg font-bold mb-2">On Course: {review.courseName}</h3>
          <div className="flex justify-center my-4">
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={handleReject}
              data-comment={review.comment}
            >
              Reject Report
            </button>
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
              value={review.courseId}
              data-comment={review.comment}
              onClick={handleDelete}
            >
              Delete Review
            </button>
          </div>
        </li>
      ))}
    </div>
  );
};

export default ReviewsReported;