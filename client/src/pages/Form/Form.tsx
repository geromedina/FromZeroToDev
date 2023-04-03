import React from "react";
import axios from "axios";
import { useState } from "react";

const Form: React.FC = (): JSX.Element => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    image: "",
    difficulty: "",
    duration: "",
    price: "",
    video: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    image: "",
    difficulty: "",
    duration: "",
    price: "",
    video: "",
  });

  const changeHandler = (e: any) => {
    const property = e.target.name;
    const value = e.target.value;
    setForm({ ...form, [property]: value });
  };

  const validate = (form: any) => {
    const nameErr = form.name === "" ? "Name invalid" : "";
    const descriptionErr =
      form.description === "" ? "Please add a description" : "";
    const imageErr = form.image === "" ? "Please add an image" : "";
    const difficultyErr = form.difficulty === "" ? "Select a difficulty" : "";
    const durationErr =
      form.duration === "" || isNaN(form.duration) ? "Invalid duration" : "";
    const priceErr =
      form.price === "" || isNaN(form.price) || form.price > 1000
        ? "Invalid price"
        : "";
    const videoErr = form.video === "" ? "Please add a video" : "";
    setErrors({
      name: nameErr,
      description: descriptionErr,
      image: imageErr,
      difficulty: difficultyErr,
      duration: durationErr,
      price: priceErr,
      video: videoErr,
    });
    if (
      nameErr === "Name invalid" ||
      descriptionErr === "Please add a description" ||
      imageErr === "Please add an image" ||
      difficultyErr === "Select a difficulty" ||
      durationErr === "Invalid duration" ||
      priceErr === "Invalid price" ||
      videoErr === "Please add a video"
    ) {
      return false;
    } else return true;
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const succesfull = validate(form);

    if (succesfull) {
      axios
        .post("http://localhost:3001/courses", form)
        .then((res) => alert("Succesfully created"))
        .catch((error) => alert(error.message));
      setForm({
        name: "",
        description: "",
        image: "",
        difficulty: "",
        duration: "",
        price: "",
        video: "",
      });
    } else return;
  };
  return (
    <div className="max-w-md mx-auto">
      <form
        onSubmit={submitHandler}
        className="grid grid-cols-8 border border-gray-400 p-4 rounded-lg"
      >
        <label className="col-span-2">Name</label>
        <input
          className="col-span-6 border border-gray-400 p-2 rounded-lg"
          value={form.name}
          onChange={changeHandler}
          name="name"
        ></input>
        <span className="col-span-8 text-red-600">{errors.name}</span>

        <label className="col-span-2">Description</label>
        <input
          value={form.description}
          onChange={changeHandler}
          name="description"
          className="col-span-6 border border-gray-400 p-2 rounded-lg"
        ></input>
        <span className="col-span-8 text-red-600">{errors.description}</span>
        <label className="col-span-2">image</label>
        <input
          value={form.image}
          onChange={changeHandler}
          name="image"
          className="col-span-6 border border-gray-400 p-2 rounded-lg"
        ></input>
        <span className="col-span-8 text-red-600">{errors.image}</span>

        <label className="col-span-2">Difficulty</label>
        <select
          className="col-span-6 border border-gray-400 p-2 rounded-lg"
          value={form.difficulty}
          onChange={changeHandler}
          name="difficulty"
        >
          <option value="" key={""}>
            {" "}
          </option>
          <option value="Easy" key={"1"}>
            {" "}
            Easy{" "}
          </option>
          <option value="Medium" key={"2"}>
            {" "}
            Medium{" "}
          </option>
          <option value="Advanced" key={"3"}>
            {" "}
            Advanced{" "}
          </option>
        </select>
        <span className="col-span-8 text-red-600">{errors.difficulty}</span>
        <label className="col-span-2">Duration</label>
        <input
          className="col-span-6 border border-gray-400 p-2 rounded-lg"
          value={form.duration}
          onChange={changeHandler}
          name="duration"
        ></input>
        <span className="col-span-8 text-red-600">{errors.duration}</span>
        <label className="col-span-2">Price</label>
        <input
          className="col-span-6 border border-gray-400 p-2 rounded-lg"
          value={form.price}
          onChange={changeHandler}
          name="price"
        ></input>
        <span className="col-span-8 text-red-600">{errors.price}</span>
        <label className="col-span-2">Video</label>
        <input
          value={form.video}
          onChange={changeHandler}
          name="video"
          className="col-span-6 border border-gray-400 p-2 rounded-lg"
        ></input>
        <span className="col-span-8 text-red-600">{errors.video}</span>
        <button
          type="submit"
          className="col-span-8 mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {" "}
          Create!{" "}
        </button>
      </form>
    </div>
  );
};

export default Form;
