import React from 'react'
import { useAppSelector } from '../../store/hooks'
import { ICourse } from "../../store/coursesSlices";
import axios from 'axios';

const DeleteCourses = () => {
  let courses = useAppSelector(state => state.courses.courses)
  const handleDelete = async (id:string) => {
    let response =(await axios.get(`https://fromzerotodev-production.up.railway.app/courses/${id}`)).data
    console.log('course delete', response)
    await axios.put(`https://fromzerotodev-production.up.railway.app/courses/${id}`, {...response, deleted:1})
    
    // Implementa la lógica para eliminar el curso con el id especificado
  }
  
const handleRestore= async (id:string) =>{
  let response =(await axios.get(`https://fromzerotodev-production.up.railway.app/courses/${id}`)).data
    console.log('course delete', response)
    await axios.put(`https://fromzerotodev-production.up.railway.app/courses/${id}`, {...response, deleted:0})
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

export default DeleteCourses