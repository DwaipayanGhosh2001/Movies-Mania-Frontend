import React, { useEffect, useState } from "react";
import { Container, Button, Card, CardBody, CardTitle, Row, Col } from "reactstrap";
import {FaArrowCircleLeft} from "react-icons/fa"
import { Link } from "react-router-dom";
import { hover } from "@testing-library/user-event/dist/hover";
import { useChannelRecord } from "../context/context";
import axios from "axios";
const Movies = () =>
{
  const {channelDetails} = useChannelRecord();
  const[movies, setMovies] = useState([])
  const fetchMovies = () =>{
    axios.get(`http://127.0.0.1:8000/channels/${channelDetails}/`)
    .then((res)=> {
const {data} = res;
setMovies(data.movies);
    })
  }
  useEffect(()=>{
   fetchMovies();
  },[])
return(
    <Container fluid>
        <div className="">
        <Button tag={Link} to="/" className="border-0 float-end " outline style={{backgroundColor:hover="transparent"}}>
                 <FaArrowCircleLeft className="fs-1 text-danger " />
            </Button>
            <h1 className="text-white text-center pt-5 text-uppercase mt-3 ms-5" style={{letterSpacing: "10px"}}>{channelDetails} </h1>   
        </div>
        <Container fluid>
        <Row className="ms-5">
          {movies.map((item, index) => (
            <Col lg={3} md={4} sm={7} xs={8} key={index} className="m-5 ">
              <Card className=" bg-background  d-flex flex-column h-100 shadow rounded">
                <img
                  src={`http://127.0.0.1:8000/${item.image}`}
                  alt=""
                  className="rounded border border-dark"
                  style={{width: "100%", height: "300px"}}
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
    </Container>
)
}
export default Movies;