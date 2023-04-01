import React from "react";
import { useAppDispatch } from "../../store/hooks";
import { useEffect } from "react";
import { getCourses } from "../../store/coursesSlices";
import Footer from "../../components/Footer/Footer";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { SearchBar } from "../../components/Filters/SearchBar/SearchBar";
import { Filters } from "../../components/Filters/Filters";

const Home: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCourses());
  }, []);
  return (
    <>
      <Filters />
      <SearchBar />
      <CardsContainer />
      <Footer />
    </>
  );
};

export default Home;
