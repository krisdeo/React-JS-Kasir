import {
  faCheese,
  faCoffee,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { Component } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { API_URL } from "../../utils/Constant";

const Icon = ({ nama }) => {
  if (nama === "Makanan")
    return <FontAwesomeIcon icon={faUtensils} className="mr-10" />;
  if (nama === "Minuman")
    return <FontAwesomeIcon icon={faCoffee} className="mr-5" />;
  if (nama === "Cemilan")
    return <FontAwesomeIcon icon={faCheese} className="mr-10" />;

  return <FontAwesomeIcon icon={faUtensils} className="mr-10" />;
};

export default class ListCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "categories")
      .then((res) => {
        console.log("Res categories >>> ", res);
        if (res.status === 200) {
          this.setState({
            categories: res.data,
          });
        }
        console.log("State categories >>> ", this.state);
      })
      .catch((error) => {
        alert("Error ! ", error);
      });
  }

  render() {
    return (
      <Col md={2} mt="2">
        <h4>
          <strong>Daftar Kategori</strong>
        </h4>
        <hr />
        <ListGroup className="mb-3">
          {this.state.categories &&
            this.state.categories.map((category) => (
              <ListGroup.Item
                key={category.id}
                onClick={() => this.props.changeCategory(category.nama)}
                style={{
                  cursor: "pointer",
                  color:
                    this.props.selectedCategory === category.nama && "white",
                  backgroundColor:
                    this.props.selectedCategory === category.nama && "#22668a",
                }}
              >
                <h5>
                  <Icon nama={category.nama} />
                  {category.nama}
                </h5>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </Col>
    );
  }
}
