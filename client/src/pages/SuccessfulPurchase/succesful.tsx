import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export const Succesful: React.FC = (): JSX.Element => {
  const [queryParameters] = useSearchParams();
  const status = queryParameters.get("status");
  const courses_id = queryParameters.get("external_reference");
  console.log(status, courses_id);
  useEffect(() => {
    console.log(status, courses_id);
  }, [status, courses_id]);

  const putCoursesToUser = async () => {};

  return (
    <div>Succcess! you can now view your course in My Profile/Courses</div>
  );
};
