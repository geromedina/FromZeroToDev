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
    console.log(form);
    if (succesfull) {
      console.log("validate succesfull");
      axios
        .post("http://localhost:3001/courses", form)
        .then((res) => alert(res.data))
        .catch((error) => console.log(error.message));
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
    <div className="border-solid">
      <form onSubmit={submitHandler} className="grid grid-colms-8 border-solid">
        <label>Name</label>
        <input
          className="border-solid"
          value={form.name}
          onChange={changeHandler}
          name="name"
        ></input>
        <span>{errors.name}</span>

        <label>Description</label>
        <input
          value={form.description}
          onChange={changeHandler}
          name="description"
          className="border-solid"
        ></input>
        <span>{errors.description}</span>
        <label>image</label>
        <input value={form.image} onChange={changeHandler} name="image"></input>
        <span>{errors.image}</span>

        <label>Difficulty</label>
        <select
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
        <span>{errors.difficulty}</span>
        <label>Duration</label>
        <input
          value={form.duration}
          onChange={changeHandler}
          name="duration"
        ></input>
        <span>{errors.duration}</span>
        <label>Price</label>
        <input value={form.price} onChange={changeHandler} name="price"></input>
        <span>{errors.price}</span>
        <label>Video</label>
        <input value={form.video} onChange={changeHandler} name="video"></input>
        <span>{errors.video}</span>
        <button type="submit"> Create! </button>
      </form>
    </div>
  );
};

export default Form;
