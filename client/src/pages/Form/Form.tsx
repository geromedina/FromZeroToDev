import React from "react";
import axios from "axios";
import { useState } from "react";

const Form: React.FC = (): JSX.Element => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    user_id: "",
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
        user_id: "",
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
  <form onSubmit={submitHandler} className="grid grid-cols-8 border-solid gap-4 p-4">
    <label className="col-span-1">Name</label>
    <input
      className="col-span-7 border border-gray-400 rounded-md p-2"
      value={form.name}
      onChange={changeHandler}
      name="name"
    ></input>
    <span className="col-span-8 text-red-500">{errors.name}</span>

    <label className="col-span-1">Description</label>
    <input
      value={form.description}
      onChange={changeHandler}
      name="description"
      className="col-span-7 border border-gray-400 rounded-md p-2"
    ></input>
    <span className="col-span-8 text-red-500">{errors.description}</span>

    <label className="col-span-1">Image</label>
    <input value={form.image} onChange={changeHandler} name="image" className="col-span-7 border border-gray-400 rounded-md p-2"></input>
    <span className="col-span-8 text-red-500">{errors.image}</span>

    <label className="col-span-1">User ID</label>
    <input
      value={form.user_id}
      onChange={changeHandler}
      name="user_id"
      className="col-span-7 border border-gray-400 rounded-md p-2"
    ></input>

    <label className="col-span-1">Difficulty</label>
    <select
      value={form.difficulty}
      onChange={changeHandler}
      name="difficulty"
      className="col-span-7 border border-gray-400 rounded-md p-2"
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
    <span className="col-span-8 text-red-500">{errors.difficulty}</span>

    <label className="col-span-1">Duration</label>
    <input
      value={form.duration}
      onChange={changeHandler}
      name="duration"
      className="col-span-7 border border-gray-400 rounded-md p-2"
    ></input>
    <span className="col-span-8 text-red-500">{errors.duration}</span>

    <label className="col-span-1">Price</label>
    <input value={form.price} onChange={changeHandler} name="price" className="col-span-7 border border-gray-400 rounded-md p-2"></input>
    <span className="col-span-8 text-red-500">{errors.price}</span>

    <label className="col-span-1">Video</label>
    <input value={form.video} onChange={changeHandler} name="video" className="col-span-7 border border-gray-400 rounded-md p-2"></input>
    <span className="col-span-8 text-red-500">{errors.video}</span>

    <button type="submit" className="col-span-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
      Create!
    </button>
  </form>
</div>
  );
};

export default Form;
