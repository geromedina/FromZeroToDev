import { Course } from "../model/courses"

async function getCourses() {
  try {
    const courses = await Course.find();
    return courses;
  } catch (error) {
    throw new Error('Error al buscar los cursos en la base de datos');
  }
}

export default getCourses;
