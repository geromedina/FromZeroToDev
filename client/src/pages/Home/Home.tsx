import React from "react";
import CardsContainer from "../../components/CardsContainer";
import { useAppDispatch } from "../../store/hooks";
import { useEffect } from "react";
import { getCourses } from "../../store/coursesSlices";
import { SearchBar } from "../../components/Filters/SearchBar/SearchBar";

const Home: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCourses());
  }, []);
  return (
    <>
      <SearchBar />
      <CardsContainer />
    </>
  );
};

export default Home;
