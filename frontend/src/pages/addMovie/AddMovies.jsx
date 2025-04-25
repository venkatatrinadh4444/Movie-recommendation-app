import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import "./AddMovie.css";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../../components/navabar/Navbar";

const AddMovie = () => {
  const [movieData, setMovieData] = useState({
    image: "",
    title: "",
    rating: "",
    description: "",
  });

  const fileChangeHandler = (e) => {
    setMovieData({ ...movieData, image: e.target.files[0] });
  };
  const inputChangeHandler = (e) => {
    setMovieData({ ...movieData, [e.target.name]: e.target.value });
  };

  const sumbitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", movieData.image);
    formData.append("title", movieData.title);
    formData.append("rating", movieData.rating);
    formData.append("description", movieData.description);
    const token = localStorage.getItem("token");
    axios
      .post("https://yournextmovie.onrender.com/movies/add-movie", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => toast.success(res.data.msg))
      .catch((err) => console.log(err));
    setMovieData({
      image: "",
      title: "",
      rating: "",
      description: "",
    });
  };

  const { image, title, rating, description } = movieData;
  return (
    <>
      <Navbar />
      <div className="d-flex flex-column justify-content-center addMovieFormContainer">
        <Form
          className="col-lg-4 col-md-6 col-sm-8 col-10 m-auto rounded-2 shadow-lg"
          onSubmit={sumbitHandler}
        >
          <FloatingLabel
            controlId="floatingImage"
            label="Select a movie image"
            className="mb-3"
          >
            <Form.Control
              type="file"
              placeholder="Choose a movie image"
              onChange={fileChangeHandler}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingTitle"
            label="Enter the movie name"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Enter the title"
              name="title"
              value={title}
              onChange={inputChangeHandler}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingRating"
            label="Enter your rating out of 5"
            className="mb-3"
          >
            <Form.Control
              type="number"
              placeholder="Enter your rating out of 5"
              name="rating"
              value={rating}
              onChange={inputChangeHandler}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingTextarea2"
            label="Write your opinion on the movie"
          >
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: "100px" }}
              name="description"
              value={description}
              onChange={inputChangeHandler}
            />
          </FloatingLabel>
          <div className="text-center mt-3">
            <button className="btn btn-success" type="submit">
              Add
            </button>
          </div>
        </Form>
      </div>
    </>
  );
};
export default AddMovie;
