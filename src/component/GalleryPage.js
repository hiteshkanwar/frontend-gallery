import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Container, Image, Row, Button, Spinner } from "react-bootstrap";
import Design from "../assets/Design.jpg";
import { quatesData } from "./quoteData";

const GalleryPage = () => {
  const [image, setImage] = useState([]);
  const [quateData, setQuateData] = useState("");
  const [page, setPage] = useState(1);
  const limit = 6;

  const handleGenerate = () => {
    setPage(page + 1);
  };
  useEffect(() => {
    let imageArr = [];
    axios
      .get("https://picsum.photos/v2/list", {
        params: { page: page, limit: limit },
      })
      .then((res) => {
        res.data.forEach((element) => {
          imageArr.push(element.download_url);
        });
        setQuateData(quatesData.quoteText);
        setImage(imageArr);
      })
      .catch((err) => {
        return err;
      });
  }, [page]);

  return (
    <div className="mainContainer">
      {image.length < 5 && (
        <div className="loader">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      <Container>
        <Row>
          {image?.map((item, index) => (
            <Col sm={4} className="customiseColoum" key={index}>
              <div className="imageBox">
                <Image src={item} />
                <div class="overlay">
                  <p>{quateData}</p>
                </div>
              </div>
            </Col>
          ))}
          <Col lg={12}>
            <hr className="divider" />
            <Button className="generateBtn" onClick={() => handleGenerate()}>
              Generate
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default GalleryPage;
