import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import linkedin from "../../assets/pictures/logo-linkedin.svg";
import facebook from "../../assets/pictures/logo-facebook.svg";
import microsoft from "../../assets/pictures/logo-microsoft.svg";
import amazon from "../../assets/pictures/logo-amazon.svg";
import google from "../../assets/pictures/logo-google.svg";
import { addToCart } from "../../store/coursesSlices";
import { useAppSelector } from "../../store/hooks";

import { useAppDispatch } from "../../store/hooks";
import axios from "axios";
import { reportReview } from "../../store/coursesSlices";
import { backURL } from "../../main";
import Footer from "../Footer/Footer";

interface Review {
  username: string | undefined;
  comment: string;
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
  const { user } = useAuth0();

  const cart = useAppSelector(state=>state.courses.cartItems)

  const dispatch = useAppDispatch();
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
    username: '',
    comment: '',
    courseId: courseId,
    courseName: ''
  })

  const { isAuthenticated } = useAuth0();

  const handleAddToCart = () => {
    const isItemAlreadyInCart = cart.some((item) => item.id === course.id);
    if (!isItemAlreadyInCart) {
      dispatch(addToCart({id: course.id, name: course.name, image: course.image, price:course.price}));
    }
  };
  
  useEffect(() => {
    fetch(`${backURL}/courses/${courseId}`)
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

    const rawData: any = await axios.get(`${backURL}/payments`, {
      params: body,
    });

    const url = rawData.data.init_point;
    console.log(url);
    window.location.href = url;
  };

  const changeHandler = (e: any) => {
    const value = e.target.value;


    //Acá en realidad el username viene del name de auth-0
    setReview({ ...review, username: user?.name, [e.target.name]: value });

  };

  const handleReview = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    let comment = (e.target as HTMLButtonElement).getAttribute("data-comment");
    comment === null ? (comment = "") : (comment = comment);
    /*  const courseId = (e.target as HTMLButtonElement).value; */

    let username = (e.target as HTMLButtonElement).getAttribute(
      "data-username"
    );
    username === null ? (username = "") : (username = username);

    const reviewReported = {
      username,
      comment,
      courseId,
      courseName: course.name,
    };
    console.log(reviewReported);
    dispatch(reportReview(reviewReported));
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
    if (course.reviews.length > 0) {
      await axios.put(`${backURL}/courses/${courseId}`, { ...course, reviews: [...course.reviews, review] });
    }
    else {
      console.log('Entre al else')
      await axios.put(`${backURL}/courses/${courseId}`, { ...course, reviews: [review] });
    }
    setReview({ ...review, comment: "" });
  }
  return (
    <div className="bg-white">

      <section className="py-0 bg-neutral-900 flex justify-center">
        <div className="justify-left py-4">
          <h1 className="text-4xl font-black mb-4 text-white">{course.name}</h1>
          <h4 className="text-lg mb-4 text-white font-bold">{course.description}</h4>
          <h3 className="text-lg font-bold mr-2 text-white">Duration: {course.duration} hours</h3>
          <p className="font-medium text-white">Created by Gero Medina</p>
        </div>
      </section>

      <section className="flex justify-center py-2">
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <img className="w-full" src={course.image} alt="img" />
          <div className="px-6 py-3 flex flex-col justify-center items-center">
            <div className="font-bold text-xl mb-2">Price: ${course.price}</div>
            <p>83% discount</p>
            <p className="text-rose-700">This offer ends in 2 days!</p>
          </div>
          <div className="flex justify-center px-6 py-4">
            {isAuthenticated && <button  onClick={(e) => {e.preventDefault(); handleAddToCart()}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded">
              Add to Cart
            </button>}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-5">
        <section className="py-8 border border-gray-500">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">What you will learn</h2>
            <ul className="list-disc pl-4 grid grid-cols-2 gap-4">
              <li className="mb-1">Increase and improve Programming Logic</li>
              <li className="mb-1">Practice with many programming challenges</li>
              <li className="mb-1">Solve algorithms using JavaScript</li>
              <li className="mb-1">Technical tests for programming, web development and software engineering positions</li>
              <li className="mb-1">Programming exercises explained and solved</li>
              <li className="mb-1">+70 programming exercises and technical tests solved</li>
              <li className="mb-1">Pass technical code tests</li>
              <li className="mb-1">Prepare for technical interviews with code tests</li>
              <li className="mb-1">Exercises to better program and increase your skills</li>
            </ul>
          </div>
        </section>
      </div>


      {isAuthenticated &&  <section>
        <div className="flex flex-col items-center mb-4 justify-center">
          <form onSubmit={submitHandler} className="w-full max-w-sm">
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full px-3">
                <textarea
                  className="border rounded-lg py-2 px-3 bg-gray-200 resize-none mb-2 w-full"
                  name="comment"
                  value={review.comment}
                  onChange={changeHandler}
                ></textarea>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
                  >
                    Add comment
                  </button>
                </div>
              </div>
            </div>
          </form>
          {course.reviews.length > 0 && (
            <div className="w-full max-w-sm mt-4 grid grid-cols-2 gap-4">
              {course.reviews.map((r, i) => (
                <div
                  key={i}
                  className={`border-t pt-4 mt-4${i === 0 ? ' col-span-2' : ''}`}
                >
                  <p className="text-lg font-bold mb-2 text-black">{r.username}</p>
                  <p className="text-lg text-black">{r.comment}</p>
                  <button
                    data-comment={r.comment}
                    data-username={r.username}
                    onClick={handleReview}
                    className="bg-white hover:bg-gray-100 text-gray-800 font-normal py-1 px-2 border border-gray-400 rounded shadow"
                  >
                    Report comment
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
}

      <section className="py-0">
        <div className="container mx-auto px-8">
          <p className="text-lg text-gray-400 mb-10 text-center">
            Companies that trust us to train their team
          </p>
          <div className="flex flex-wrap justify-center">
            <img src={linkedin} alt="" />
            <img src={facebook} alt="" />
            <img src={microsoft} alt="" />
            <img src={amazon} alt="" />
            <img src={google} alt="" />
          </div>
        </div>
      </section>

      <Footer />

    </div>
  );
};


export default CardDetail;

