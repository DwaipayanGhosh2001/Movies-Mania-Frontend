import { useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import {
  Container,
  Button,
  Row,
  Col,
  CardBody,
  CardTitle,
  Card,
  CardFooter,
  Input,
  InputGroup,
  Form,
} from "reactstrap";
import TypingEffect from "../component/TypingEffect";
import { Link } from "react-router-dom";
import { useChannelRecord } from "../context/context";
import { motion } from "framer-motion";
import axios from "axios";

const HomePage = () => {
  const searchRef = useRef(null);
  const { setChannelDetails } = useChannelRecord();
  const [channel, setChannel] = useState([]);
  const [searchvalue, setSearchValue] = useState("");

  const handleSubmit = (name) => {
    setChannelDetails(name);
  };

  //   const handleSearch = (e) => {
  // e.preventDefault();
  // setSearchValue(searchRef.current.value);
  //   }

  const searchLoad = channel.filter((item) =>
    item.name.toLowerCase().startsWith(searchvalue.toLowerCase())
  );
  console.log(searchLoad);
  const fetchEvent = () => {
    axios
      .get("http://127.0.0.1:8000")
      .then((res) => {
        const { data } = res;
        setChannel(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchEvent();
  }, []);
  return (
    <div>
      <h1
        className="text-white text-center ms-5  my-5 text-uppercase"
        style={{ fontFamily: "fantasy", letterSpacing: "10px" }}
      >
        <TypingEffect text="Movie Mania" />
      </h1>
      <motion.div
        className="ms-5"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1.5,
          delay: 1.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <h3
          className=" text-white ms-5 text-uppercase mb-3"
          style={{ fontFamily: "monospace", letterSpacing: "5px" }}
        >
          {" "}
          Channels
          <span className="float-end me-5">
            <Form>
              <Input
                type="search"
                placeholder="Looking for ?"
                className="border-0 rounded-pill px-3"
                value={searchvalue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </Form>
          </span>
        </h3>
        {!searchvalue ? (
          <Container fluid>
            <Row className="ms-5">
              {channel.map((item, index) => (
                <Col lg={3} md={4} sm={7} xs={8} key={index} className="m-5 ">
                  <Card className=" bg-background  d-flex flex-column h-100 shadow rounded">
                    <img
                      src={item.image}
                      alt=""
                      className="rounded border border-dark"
                      style={{ width: "100%", height: "200px" }}
                    />
                    <CardTitle
                      className="text-center  text-white fw-bold fs-4 my-3"
                      style={{ fontFamily: "serif" }}
                    >
                      {item.name}
                    </CardTitle>
                    <CardBody className="flex-grow-1">
                      <p className="text-center mb-0  text-white">
                        <i>{item.description}</i>
                      </p>
                    </CardBody>
                    <CardFooter className="border-0 mx-auto mb-3 mt-0">
                      <Button
                        className=" rounded text-white px-5 bg-button text-uppercase zoom"
                        tag={Link}
                        to="movielist"
                        outline
                        onClick={() => handleSubmit(item.name)}
                      >
                        Movie list
                      </Button>
                    </CardFooter>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        ) : (
          <>
            <Container fluid>
              <Row className="ms-5">
                {searchLoad.length === 0 ? (
                  <h2 className="text-white text-center mt-5 text-uppercase">
                    {" "}
                    No result!
                  </h2>
                ) : (
                  <>
                    <Row>
                      {searchLoad.map((item, index) => (
                        <Col
                          lg={3}
                          md={4}
                          sm={7}
                          xs={8}
                          key={index}
                          className="m-5 "
                        >
                          <Card className=" bg-background  d-flex flex-column h-100 shadow rounded">
                            <img
                              src={item.image}
                              alt=""
                              className="rounded border border-dark"
                              style={{ width: "100%", height: "200px" }}
                            />
                            <CardTitle
                              className="text-center  text-white fw-bold fs-4 my-3"
                              style={{ fontFamily: "serif" }}
                            >
                              {item.name}
                            </CardTitle>
                            <CardBody className="flex-grow-1">
                              <p className="text-center mb-0  text-white">
                                <i>{item.description}</i>
                              </p>
                            </CardBody>
                            <CardFooter className="border-0 mx-auto mb-3 mt-0">
                              <Button
                                className=" rounded text-white px-5 bg-button text-uppercase zoom"
                                tag={Link}
                                to="movielist"
                                outline
                                onClick={() => handleSubmit(item.name)}
                              >
                                Movie list
                              </Button>
                            </CardFooter>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </>
                )}
              </Row>
            </Container>
          </>
        )}
      </motion.div>
    </div>
  );
};
export default HomePage;
