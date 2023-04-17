import React from "react";
import axios from "axios";
import { useState } from "react";
import Footer from "../../components/Footer/Footer";

const Register: React.FC = (): JSX.Element => {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    country: "",
    image: "",
  });
  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    country: "",
    image: "",
  });

  const changeHandler = (e: any) => {
    const property = e.target.name;
    const value = e.target.value;
    setForm({ ...form, [property]: value });
  };

  const validate = (form: any) => {
    const nameErr = form.firstname === "" ? "Please add a name" : "";
    const lastnameErr = form.lastname === "" ? "Please add a lastname" : "";
    const emailErr = form.email === "" ? "Please add an email" : "";
    const usernameErr = form.username === "" ? "Please add an username" : "";
    const passwordErr =
      form.password === "" || isNaN(form.password) || form.password.length < 6
        ? "Invalid password"
        : "";
    const countryErr = form.country === "" ? "Please add a country" : "";
    const imageErr = form.image === "" ? "Please add an image" : "";
    setErrors({
      firstname: nameErr,
      lastname: lastnameErr,
      email: emailErr,
      username: usernameErr,
      password: passwordErr,
      country: countryErr,
      image: imageErr,
    });
    if (
      nameErr !== "" ||
      lastnameErr !== "" ||
      emailErr !== "" ||
      usernameErr !== "" ||
      passwordErr !== "" ||
      countryErr !== "" ||
      imageErr !== ""
    ) {
      return false;
    } else {
      return true;
    }
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const succesfull = validate(form);

    if (succesfull) {
      axios
        .post("https://fromzerotodev-production.up.railway.app/users", form)
        .then((res) => alert("Succesfully created"))
        .catch((error) => alert(error.message));
      setForm({
        firstname: "",
        lastname: "",
        email: "",
        username: "",
        password: "",
        country: "",
        image: "",
      });
    } else return;
  };
  return (
    <div>
      <div className="max-w-md mx-auto my-20">
        <form
          onSubmit={submitHandler}
          className="grid grid-cols-8 border border-gray-400 p-4 rounded-lg"
        >
          <label className="col-span-2">Firstname</label>
          <input
            className="col-span-6 border border-gray-400 p-2 rounded-lg"
            value={form.firstname}
            onChange={changeHandler}
            name="firstname"
          />
          <span className="col-span-8 text-red-600">{errors.firstname}</span>

          <label className="col-span-2">Lastname</label>
          <input
            value={form.lastname}
            onChange={changeHandler}
            name="lastname"
            className="col-span-6 border border-gray-400 p-2 rounded-lg"
          />
          <span className="col-span-8 text-red-600">{errors.lastname}</span>

          <label className="col-span-2">Email</label>
          <input
            value={form.email}
            onChange={changeHandler}
            name="email"
            className="col-span-6 border border-gray-400 p-2 rounded-lg"
          />
          <span className="col-span-8 text-red-600">{errors.email}</span>

          <label className="col-span-2">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={form.username}
            onChange={changeHandler}
            className="col-span-6 border border-gray-400 p-2 rounded-lg"
          />
          <span className="col-span-8 text-red-600">{errors.username}</span>

          <label className="col-span-2">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={changeHandler}
            className="col-span-6 border border-gray-400 p-2 rounded-lg"
          />
          <span className="col-span-8 text-red-600">{errors.password}</span>

          <label className="col-span-2">Country</label>
          <input
            className="col-span-6 border border-gray-400 p-2 rounded-lg"
            value={form.country}
            onChange={changeHandler}
            name="country"
          />
          <span className="col-span-8 text-red-600">{errors.country}</span>

          <label className="col-span-2">Image</label>
          <input
            value={form.image}
            onChange={changeHandler}
            name="image"
            className="col-span-6 border border-gray-400 p-2 rounded-lg"
          />
          <span className="col-span-8 text-red-600">{errors.image}</span>

          <button
            type="submit"
            className="col-span-8 mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create!
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
