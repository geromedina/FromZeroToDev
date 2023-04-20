
import { backURL } from '../../main';
import React, { useState } from 'react';
import { ICourse } from '../../store/coursesSlices';
import axios from 'axios';

import { useEffect } from 'react';
const DeleteCourses = () => {
  const [courses, setCourses] = useState<ICourse[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${backURL}/courses/all`);
      setCourses(response.data);
      console.log('courses', response.data);
    };
    fetchData();
  }, []);
  const handleDelete = async (id: string) => {
    let response = (await axios.get(`${backURL}/courses/${id}`)).data;
    console.log('course delete', response);
    await axios.put(`${backURL}/courses/${id}`, { ...response, deleted: 1 });
    setCourses(courses.map(course => course._id === id ? { ...course, deleted: 1 } : course));
  };
  const handleRestore = async (id: string) => {
    let response = (await axios.get(`${backURL}/courses/${id}`)).data
    console.log('course restore', response)
    await axios.put(`${backURL}/courses/${id}`, { ...response, deleted: 0 })
    setCourses(courses.map(course => course._id === id ? { ...course, deleted: 0 } : course));
  }
  return (
    <div className="bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-4">Course List</h2>
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 text-left font-bold">Name</th>
            <th className="p-3 text-left font-bold">Description</th>
            <th className="p-3 text-left font-bold">Price</th>
            <th className="p-3 text-left font-bold">Active</th>
            <th className="p-3 text-left font-bold">Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course: ICourse) => (
            <tr key={course._id} className="border-b border-gray-300">
              <td className="p-3">{course.name}</td>
              <td className="p-3">{course.description}</td>
              <td className="p-3">{course.price}</td>
              <td className="p-3">{course.deleted === 1 ? "No" : "Yes"}</td>
              <td className="p-3">
                {course.deleted === 1 ? (
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => handleRestore(course._id)}>Restore</button>
                ) : (
                  <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => handleDelete(course._id)}>Delete</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeleteCourses; 
