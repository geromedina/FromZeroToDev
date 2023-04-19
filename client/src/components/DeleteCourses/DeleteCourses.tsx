/* Como estaba el develop antes de cambios
import React from 'react'
import { useAppSelector } from '../../store/hooks'
import { ICourse } from "../../store/coursesSlices";
import axios from 'axios';
import { backURL } from '../../main';

const DeleteCourses = () => {
  let courses = useAppSelector(state => state.courses.courses)
  
  const handleDelete = async (id:string) => {
    let response =(await axios.get(`${backURL}/courses/${id}`)).data
    console.log('course delete', response)
    await axios.put(`${backURL}/courses/${id}`, {...response, deleted:1})
    
    // Implementa la lógica para eliminar el curso con el id especificado
  }
  
const handleRestore= async (id:string) =>{
  let response =(await axios.get(`${backURL}/courses/${id}`)).data
    console.log('course delete', response)
    await axios.put(`${backURL}/courses/${id}`, {...response, deleted:0})
}
  return (
    <div>
      <h2>Lista de cursos</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Active</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course: ICourse) => (
            <tr key={course._id}>
              <td>{course.name}</td>
              <td>{course.description}</td>
              <td>{course.price}</td>
              <td>{course.deleted === 1 ? "No" : "Yes"}</td>
              
              <td>
                {course.deleted === 1? <button onClick={() => handleRestore(course._id)}>Restore</button> : <button onClick={() => handleDelete(course._id)}>Eliminar</button>}
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

 
}

export default DeleteCourses */

import { backURL } from '../../main';
import React, { useState } from 'react';
import { ICourse } from '../../store/coursesSlices';
import axios from 'axios';

import { useEffect } from 'react';
const DeleteCourses = () => {
  const [courses, setCourses] = useState<ICourse[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3001/courses/all');
      setCourses(response.data);
      console.log('courses', response.data);
    };
    fetchData();
  }, []);
  const handleDelete = async (id: string) => {
    let response = (await axios.get(`${backURL}/courses/${id}`)).data;
    console.log('course delete', response);
    await axios.put(`{backURL}/courses/${id}`, { ...response, deleted: 1 });
    setCourses(courses.map(course => course._id === id ? { ...course, deleted: 1 } : course));
  };
  const handleRestore= async (id:string) =>{
    let response =(await axios.get(`{backURL}/courses/${id}`)).data
    console.log('course restore', response)
    await axios.put(`${backURL}/courses/${id}`, {...response, deleted:0})
    setCourses(courses.map(course => course._id === id ? { ...course, deleted: 0 } : course));
  }
  return (
    <div>
      <h2>Lista de cursos</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Active</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course: ICourse) => (
            <tr key={course._id}>
              <td>{course.name}</td>
              <td>{course.description}</td>
              <td>{course.price}</td>
              <td>{course.deleted === 1 ? "No" : "Yes"}</td>
              
              <td>
                {course.deleted === 1? <button onClick={() => handleRestore(course._id)}>Restore</button> : <button onClick={() => handleDelete(course._id)}>Eliminar</button>}
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};

export default DeleteCourses; 

/* import React from 'react'
import { useAppSelector } from '../../store/hooks'
import { ICourse } from "../../store/coursesSlices";
import axios from 'axios';
import { backURL } from '../../main';

const DeleteCourses = () => {
  let courses = useAppSelector(state => state.courses.courses)
  
  const handleDelete = async (id:string) => {
    let response =(await axios.get(`${backURL}/courses/${id}`)).data
    console.log('course delete', response)
    await axios.put(`${backURL}/courses/${id}`, {...response, deleted:1})
    courses= courses.filter(course=>course._id!==id)
    // Implementa la lógica para eliminar el curso con el id especificado
  }
  
const handleRestore= async (id:string) =>{
  let response =(await axios.get(`${backURL}/courses/${id}`)).data
    console.log('course delete', response)
    await axios.put(`${backURL}/courses/${id}`, {...response, deleted:0})
}
  return (
    <div>
      <h2>Lista de cursos</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Active</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course: ICourse) => (
            <tr key={course._id}>
              <td>{course.name}</td>
              <td>{course.description}</td>
              <td>{course.price}</td>
              <td>{course.deleted === 1 ? "No" : "Yes"}</td>
              
              <td>
                {course.deleted === 1? <button onClick={() => handleRestore(course._id)}>Restore</button> : <button onClick={() => handleDelete(course._id)}>Eliminar</button>}
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

 
}

export default DeleteCourses */

/* 





CoursesController
import { Course } from "../model/courses";
import { ICourse } from "../utils/types";

// FUNCION QUE TRAE TODOS LOS CURSOS
export const getCourses = async () => {
  try {
    const courses = await Course.find({
      $or: [
        { deleted: {$ne: 1} },
        { deleted: {$exists: false} }
      ]
    });
    return courses;
  } catch (error) {
    throw new Error("Error al buscar los cursos en la base de datos");
  }
};

export const getAllCourses= async () => {
  try {
    const courses = await Course.find();
    return courses;
  } catch (error) {
    throw new Error("Error al buscar los cursos en la base de datos");
  }
};

//FUNCION QUE TRAE CURSOS POR NOMBRE

export const getCoursesByName = async (name: string) => {
  try {
    const courses = await Course.find({
      name: { $regex: name, $options: "i" },
    });
    return courses;
  } catch (error) {
    throw new Error("Error al buscar los cursos por nombre");
  }
};

// FUNCION QUE TRAE INFO DE UN CURSO POR ID

export const getCourseById = async (id: any) => {
  try {
    const infoDB = await Course.findById(id).exec();
    if (infoDB === null) {
      console.log(`No se encontró ningún curso con ID ${id}`);
    }
    return infoDB;
  } catch (error) {
    console.error(error);
    throw new Error(`Error al buscar el curso con ID ${id}`);
  }
};

// FUNCION QUE ACTUALIZA UN CURSO POR ID
export const updateCourseById = async (id: any, courseUpdates: ICourse) => {
  try {
    const infoDB = await Course.findByIdAndUpdate(id, courseUpdates, {
      new: true,
    }).exec();
    if (infoDB === null) {
      console.log(`No se encontró ningún curso con ID ${id}`);
    }
    return infoDB;
  } catch (error) {
    console.error(error);
    throw new Error(`Error al actualizar el curso con ID ${id}`);
  }
};

// FUNCION QUE CREA UN CURSO
export const createCourse = async (course: ICourse): Promise<ICourse> => {
  try {
    const { name, description, image, difficulty, duration, price, video } =
      course;
    if (
      !name ||
      !description ||
      !image ||
      !difficulty ||
      !duration ||
      !price ||
      !video
    ) {
      throw new Error("Faltan datos requeridos para crear un curso");
    }
    const createdCourse = await Course.create(course);
    return createdCourse.toJSON() as ICourse;
  } catch (error) {
    throw new Error(`Ocurrió un error al crear el curso: ${error}`);
  }
};

export const deleteById = async (id: any) => {
  try {
    const infoDB = await Course.findByIdAndDelete(id);
    if (!infoDB) {
      console.log(`No se encontró ningún curso con ID ${id}`);
    }
    return infoDB;
  } catch (error) {
    throw new Error(`Ocurrió un error al eliminar el curso: ${error}`);
  }
};

*/
