import React from "react";
import { useAppDispatch } from "../../store/hooks";
import { useEffect } from "react";
import { getCourses } from "../../store/coursesSlices";
import Footer from "../../components/Footer/Footer";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { SearchBar } from "../../components/Filters/SearchBar/SearchBar";
import { Filters } from "../../components/Filters/Filters";
import { Sorter } from "../../components/Filters/Sorters/Sorter";

const Home: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCourses());
  }, []);
  return (
    <>
      <Sorter />
      <Filters />
      <SearchBar />
      <CardsContainer />
      <Footer />
    </>
  );
};

export default Home;
