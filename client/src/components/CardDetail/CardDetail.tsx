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
  }, [course]);

  return (
    <div>
      <h1>{course.name}</h1>
      <img src={course.image} alt={`Imagen del curso de ${course.name}`}/>
      <h2>{course.description}</h2>
      <video src={course.video} width="640" height="360" controls>
      Tu navegador no soporta la etiqueta de video.
      </video>
      <h3>Duration: {course.duration}</h3>
      <h3>Dificulty: ${course.difficulty}</h3>
      <h2>Price: {course.price}</h2>
      <button>Comprar Curso</button>
    </div>
  )
};

export default CardDetail;