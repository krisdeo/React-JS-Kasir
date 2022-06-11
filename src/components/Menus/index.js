import React from "react";
import { Card, Col } from "react-bootstrap";
import { numberWithCommas } from "../../utils/Constant";

const Menus = ({ menu, inputKeranjangs }) => {
  return (
    <Col md={4} xs={6} className="mb-4">
      <Card style={{}} className="shadow" onClick={() => inputKeranjangs(menu)} style={{
                  cursor: "pointer"}}>
        <Card.Img
          variant="top"
          src={
            "assets/images/" +
            menu.category.nama.toLowerCase() +
            "/" +
            menu.gambar
          }
        />
        <Card.Body>
          <Card.Title>{menu.nama}</Card.Title>
          <Card.Text><strong>({menu.kode})</strong></Card.Text>
          <Card.Text>Rp. {numberWithCommas(menu.harga)}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Menus;
