import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import axios from "axios";
import { useAppDispatch } from "../../store/hooks";
import { addToCart } from "../../store/coursesSlices";


interface Review {
    username: string | undefined;
    comment:string;
}

interface Course {
  name: string;
  difficulty: string;
  id: string;
  description: string;
  duration: number;
  image: string;
  price: number;
  video: string;
  reviews: Review[];
}

interface CardProps {
  name: string;
  id: string;
  image: string;
  price: number;
}

const CardDetail: React.FC<CardProps> = ({ id, name, image, price}) => {

  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ id, name, image, price}))
  }

  const courseId = useParams().id;
  const {user}=useAuth0()
  const [course, setCourse] = useState<Course>({
    name: "",
    difficulty: "",
    id: "",
    description: "",
    duration: 0,
    image: "",
    price: 0,
    video: "",
    reviews: []
  });

  const [review, setReview] = useState<Review>({
    username:'',
    comment:''
  })

  useEffect(() => {
    fetch(`http://localhost:3001/courses/${courseId}`)
      .then((response) => response.json())
      .then((c: Course) => {
        setCourse(c);
      })
      .catch((err) => {
        window.alert(err);
      });
  }, []);

  const changeHandler = (e: any) => {
    const value = e.target.value;

    
    //Acá en realidad el username viene del name de auth-0
    setReview({...review, username: user?.name, [e.target.name]: value });
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(course.reviews.length)
    setCourse(prevCourse => ({
        ...prevCourse,
        reviews: prevCourse.reviews.length > 0
          ? [...prevCourse.reviews, review]
          : [review]
      }));
      if(course.reviews.length>0){
        await axios.put(`http://localhost:3001/courses/${courseId}`, {...course, reviews:[...course.reviews, review]});
      }
      else {
        console.log('Entre al else')
        await axios.put(`http://localhost:3001/courses/${courseId}`, {...course, reviews: [review]});
      }  
          
  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-10 text-center">
        <h1 className="text-4xl font-bold mb-4 text-white">{course.name}</h1>
        <img
          src={course.image}
          alt={`Imagen del curso de ${course.name}`}
          className="w-1/2 mx-auto mb-6"
        />
        <h2 className="text-lg mb-4 text-white">{course.description}</h2>
        <video
          src={course.video}
          width="640"
          height="360"
          controls
          className="mb-6"
        >
          Tu navegador no soporta la etiqueta de video.
        </video>
        <div className="flex flex-row mb-4">
          <h3 className="text-lg font-bold mr-2 text-white">Duration:</h3>
          <h3 className="text-lg text-white">{course.duration} hours</h3>
        </div>
        <div className="flex flex-row mb-4">
          <h3 className="text-lg font-bold mr-2 text-white">Difficulty:</h3>
          <h3 className="text-lg text-white">{course.difficulty}</h3>
        </div>
        <div className="flex flex-row items-center mb-4">
          <h2 className="text-2xl font-bold mr-4 text-white">
            Price: ${course.price}
          </h2>
          <button
            className="flex items-center justify-center align-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleAddToCart}
            >
            Add to cart
            <svg className="ml-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11 17h2v-4h4v-2h-4V7h-2v4H7v2h4v4Zm1 5q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z"/></svg>
          </button>
        </div>
        <div className="flex flex-col items-center mb-4">
          <form onSubmit={submitHandler} className="w-full max-w-sm">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <textarea
                  className="border rounded-lg py-2 px-3 bg-gray-200 resize-none"
                  
                  name="comment"
                  value={review.comment}
                  onChange={changeHandler}
                ></textarea>
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Review
            </button>
          </form>
          {course.reviews.length > 0 && (
            <div className="w-full max-w-sm mt-4">
              {course.reviews.map((r, i) => (
                <div key={i} className="border-b border-gray-200 mb-4 pb-4">
                  <p className="text-lg font-bold mb-2 text-white">
                    {r.username}
                  </p>
                  <p className="text-lg text-white">{r.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
