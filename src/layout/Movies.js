import React, { useEffect, useState } from "react";
import {
  Container,
  Button,
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  Input,
  Form,
} from "reactstrap";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { hover } from "@testing-library/user-event/dist/hover";
import { useChannelRecord } from "../context/context";
import axios from "axios";
const Movies = () => {
  const [value, setValue] = useState("");
  const { channelDetails } = useChannelRecord();
  const [movies, setMovies] = useState([]);

  const loadSearch = movies.filter((item) =>
  item.name.toLowerCase().startsWith(value.toLowerCase())
);

  const fetchMovies = () => {
    axios
      .get(`http://127.0.0.1:8000/channels/${channelDetails}/`)
      .then((res) => {
        const { data } = res;
        setMovies(data.movies);
      });
  };
  useEffect(() => {
    fetchMovies();
  }, []);
  return (
    <Container fluid>
      <div className="d-flex justify-content-between mt-3">
      <Form className="w-50 mt-2 movieform">
        <Input
          type="search"
          placeholder="Looking for?"
          className="w-50 ms-md-5 border-0 rounded-pill"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </Form>
        <Button
          tag={Link}
          to="/"
          className="border-0  "
          outline
          style={{ backgroundColor: (hover = "transparent") }}
        >
          <FaArrowCircleLeft className="fs-1 text-danger " />
        </Button>
        </div>

        <h1
          className="text-white text-center pt-4 text-uppercase mt-0 ms-5"
          style={{ letterSpacing: "10px" }}
        >
          {channelDetails}{" "}
        </h1>
    
     

      <div>
        {!value ? (
          <Container fluid>
            <Row className="ms-md-5">
              {movies.map((item, index) => (
                <Col lg={3} md={4} sm={7} xs={10} key={index} className="m-5 ">
                  <Card className=" bg-background  d-flex flex-column h-100 shadow rounded">
                    <img
                      src={`http://127.0.0.1:8000/${item.image}`}
                      alt=""
                      className="rounded border border-dark"
                      style={{ width: "100%", height: "300px" }}
                    />
                    <CardTitle
                      className="text-center  text-white fw-bold fs-4 my-3"
                      style={{ fontFamily: "serif" }}
                    >
                      {item.name}
                    </CardTitle>
                    <CardBody className="flex-grow-1">
                      <p className="text-center mb-0  text-white">
                        <i>Duration : {item.duration}</i>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        ) : (
          <>
            <div>
              {loadSearch === 0 ? (
                <h2 className="text-white text-center mt-5 text-uppercase">
                  {" "}
                  No result!
                </h2>
              ) : (
                <>
                 <Container fluid>
            <Row className="ms-md-5">
              {loadSearch.map((item, index) => (
                <Col lg={3} md={4} sm={7} xs={10} key={index} className="m-5 ">
                  <Card className=" bg-background  d-flex flex-column h-100 shadow rounded">
                    <img
                      src={`http://127.0.0.1:8000/${item.image}`}
                      alt=""
                      className="rounded border border-dark"
                      style={{ width: "100%", height: "300px" }}
                    />
                    <CardTitle
                      className="text-center  text-white fw-bold fs-4 my-3"
                      style={{ fontFamily: "serif" }}
                    >
                      {item.name}
                    </CardTitle>
                    <CardBody className="flex-grow-1">
                      <p className="text-center mb-0  text-white">
                        <i>Duration : {item.duration}</i>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </Container>
  );
};
export default Movies;
