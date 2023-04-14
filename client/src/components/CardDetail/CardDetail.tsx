import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import { useAppDispatch } from "../../store/hooks";
import axios from "axios";
import { reportReview } from "../../store/coursesSlices";

interface Review {
    username: string | undefined;
    comment:string;
    courseId: string | undefined;
    courseName: string;
}

export interface Course {
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



const CardDetail: React.FC = (): JSX.Element => {
  const courseId = useParams().id;
  const {user}=useAuth0()
  const dispatch = useAppDispatch();
  /* console.log(user) */
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
    comment:'',
    courseId:courseId,
    courseName:''
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
  const body: any = {
    title: course.name,
    description: course.description,
    price: course.price,
  };
  const purchaseHandler = async () => {
    console.log(body);
    const rawData: any = await axios.get("http://localhost:3001/payments", {
      params: body,
    });
    const url = rawData.data.init_point;
    console.log(url);
    window.location.href = url;
  };

  const changeHandler = (e: any) => {
    const value = e.target.value;

    
    //Acá en realidad el username viene del name de auth-0
    setReview({...review, username: user?.name, [e.target.name]: value });
    
  };

  const handleReview = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    let comment = (e.target as HTMLButtonElement).getAttribute('data-comment');
    comment===null? comment='' : comment=comment
   /*  const courseId = (e.target as HTMLButtonElement).value; */
   
   let username = (e.target as HTMLButtonElement).getAttribute('data-username')
   username===null?  username='' : username=username
  
   const reviewReported = {
    username,
    comment,
    courseId,
    courseName: course.name
  } 
  console.log(reviewReported)
    dispatch(reportReview(reviewReported))
  }
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
      setReview({ ...review, comment: "" });   
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
            onClick={purchaseHandler}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            Add to cart
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
                  
                  <button 
                    data-comment={r.comment}
                    data-username= {r.username}
                   
                   onClick={handleReview}>Report Review</button>
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
