import { Course } from "../model/courses";
import { ICourse } from "../utils/types";

// FUNCION QUE TRAE TODOS LOS CURSOS
export const getCourses = async () => {
  try {
    const courses = await Course.find();
    return courses;
  } catch (error) {
    throw new Error("Error al buscar los cursos en la base de datos");
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
}


// FUNCION QUE CREA UN CURSO
export const createCourse = async (course: ICourse): Promise<ICourse> => {
  try {
    const {
      user_id,
      name,
      description,
      image,
      difficulty,
      duration,
      price,
      video,
    } = course;
    if (
      !user_id ||
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
