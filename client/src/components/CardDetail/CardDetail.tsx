import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 

interface Course {
  name: string;
  difficulty: string;
  id: string;
  description: string,
  duration:number,
  image: string;
  price: number;
  video: string;
}

const CardDetail: React.FC = (): JSX.Element  => {
  const courseId = useParams().id ;
  
  const [course, setCourse] = useState<Course>({
    name: '',
    difficulty: '',
    id: '',
    description: '',
    duration:0,
    image: '',
    price:0,
    video: '',
  });
/*   const [course, setCourse] = useState<Course>({
    name: "Introduction to JavaScript",
    difficulty: "Easy",
    id: "6424dd601d4b9f6a3de0554b",
    description: "First course",
    duration:4,
    image: "asdasd",
    price:500,
    video: "asd",
  }); */



  useEffect(() => {
    fetch(`http://localhost:3001/courses/${courseId}`)
      .then((response) => response.json())
      .then((c: Course) => {
        setCourse(c);
      }
      )
      .catch((err) => {
        window.alert(err);
      });

    /* return setCourse({
    name: '',
    difficulty: '',
    id: '',
    description: '',
    duration:0,
    image: '',
    price:0,
    video: '',}); */
  }, []);

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
      <h2 className="text-2xl font-bold mr-4 text-white">Price: ${course.price}</h2>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center">
        {/* <AiOutlineShoppingCart className="mr-2" /> */}
        Comprar Curso
      </button>
    </div>
  </div>
</div>
  )
};

export default CardDetail;