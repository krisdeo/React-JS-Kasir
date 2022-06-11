import axios from "axios";
import React, { Component } from "react";
import { Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API_URL } from "../../utils/Constant";

export default class Success extends Component {
  componentDidMount() {
    this.deleteKeranjang();
  }

  deleteKeranjang = () => {
    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        console.log("Res keranjangs >>> ", res);
        if (res.status === 200) {
          const keranjang = res.data;
          console.log("deleteKeranjang keranjang >>> ", keranjang);

          keranjang.map((itemKeranjang) => {
            return axios
              .delete(API_URL + "keranjangs/" + itemKeranjang.id)
              .then((res) => {
                console.log("delete keranjang >>> ", res);
              })
              .catch((error) => {
                console.log("delete keranjang >>> ", error);
              });
          });
        }
        console.log("State keranjangs >>> ", this.state);
      })
      .catch((error) => {
        console.log("error >>> ", error.message);

        alert("Error ! " + error.message);
      });
  };

  render() {
    return (
      <div className="mt-4 text-center">
        <Image src="assets/images/order_success.png" width="500" />
        <h2>Sukses Pesan</h2>
        <p>Terimakasih Sudah Memesan</p>
        <Button className="primaryColor" variant="primary" as={Link} to="/">
          <b style={{ color: "white" }}>
            <strong>Kembali</strong>
          </b>
        </Button>
      </div>
    );
  }
}
