import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { backURL } from "../../main";

export const Succesful: React.FC<any> = (props: any): JSX.Element => {
  const [queryParameters] = useSearchParams();

  const coursesNames = queryParameters.get("external_reference");
  const userId = props._id;
  let coursesArr = coursesNames?.replace(/,/g, "").split(" ");

  console.log(coursesNames, userId);

  useEffect(() => {
    axios.put(`${backURL}/users/addCourses`, {
      id: userId,
      courses: coursesArr,
    });
  }, [coursesArr]);

  return <div>Succcess! you can now view your course</div>;
};
