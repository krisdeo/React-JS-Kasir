import React, { Component } from "react";
import { Badge, Col, ListGroup, Modal, Row, Button, Card } from "react-bootstrap";
import { API_URL, numberWithCommas } from "../../utils/Constant";
import { TotalBayar, ModalKeranjang } from "../../components";
import axios from "axios";
import swal from "sweetalert";

export default class Hasil extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      keranjangDetail: false,
      jumlah: 0,
      keterangan: "",
      totalHarga: 0,
    };
  }

  componentDidMount() {
    console.log("Hasil >>> ", this.props);
  }

  // componentWillUnmount () {
  //   this.props.getProductByCategory();
  //   this.props.getKeranjang();
  // }

  setHandleShow = (keranjang) => {
    this.setState({
      showModal: true,
      keranjangDetail: keranjang,
      jumlah: keranjang.jumlah,
      keterangan: keranjang.keterangan,
      totalHarga: keranjang.total_harga,
    });
  };

  setHandleClose = () => {
    this.setState({
      showModal: false,
    });
  };

  tambahJumlah = () => {
    this.setState({
      jumlah: this.state.jumlah + 1,
      totalHarga:
        this.state.keranjangDetail.product.harga * (this.state.jumlah + 1),
    });
  };

  kurangJumlah = () => {
    if (this.state.jumlah !== 1) {
      this.setState({
        jumlah: this.state.jumlah - 1,
        totalHarga:
          this.state.keranjangDetail.product.harga * (this.state.jumlah - 1),
      });
    }
  };

  changeHandler = (event) => {
    this.setState(
      {
        keterangan: event.target.value,
      },
      () => console.log("keterangan >>> ", this.state.keterangan)
    );
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.setHandleClose();

    const dataSubmit = {
      jumlah: this.state.jumlah ? this.state.jumlah : 0,
      total_harga: this.state.totalHarga ? this.state.totalHarga : 0,
      product: this.state.keranjangDetail.product
        ? this.state.keranjangDetail.product
        : [],
      keterangan: this.state.keterangan ? this.state.keterangan : "",
    };

    axios
      .put(API_URL + "keranjangs/" + this.state.keranjangDetail.id, dataSubmit)
      // .delete(API_URL + "keranjangs/1")
      .then((res) => {
        console.log("Submit Edit Keranjang >>> ", res);
        if (res.status === 200 || res.status === 201) {
          swal({
            title: "Update Pesanan",
            text: "Sukses Update Pesanan : " + dataSubmit.product.nama,
            icon: "success",
            button: false,
            timer: 2000,
          });
          this.props.getProductByCategory();
          this.props.getKeranjang();
        }
      })
      .catch((error) => {
        console.log("Submit Edit Keranjang error >>> ", error);

        alert("Error ! " + error.message);
      });
  };

  hapusPesanan = (id) => {
    this.setHandleClose();

    axios
      .delete(API_URL + "keranjangs/" + id)
      // .delete(API_URL + "keranjangs/1")
      .then((res) => {
        console.log("Submit Edit Keranjang >>> ", res);
        if (res.status === 200 || res.status === 201) {
          swal({
            title: "Hapus Pesanan",
            text:
              "Sukses Hapus Pesanan : " +
              this.state.keranjangDetail.product.nama,
            icon: "success",
            button: false,
            timer: 2000,
          });
          this.props.getProductByCategory();
          this.props.getKeranjang();
        }
      })
      .catch((error) => {
        console.log("Submit Edit Keranjang error >>> ", error);

        alert("Error ! " + error.message);
      });
  };

  render() {
    console.log("props >>> ", this.props);

    return (
      <Col md={3} mt="2">
        <h4>
          <strong>Hasil</strong>
        </h4>
        <hr />

        {this.props.keranjangs.length !== 0 ? (
          <Card className="overflow-auto hasil">
          <ListGroup
            variant="flush"
            style={{
              cursor: "pointer",
            }}
          >
            {this.props.keranjangs.map((keranjang) => (
              <ListGroup.Item
                key={keranjang.id}
                onClick={() => this.setHandleShow(keranjang)}
              >
                <Row>
                  <Col>
                    <Badge pill bg="success">
                      {keranjang.jumlah}
                    </Badge>
                  </Col>
                  <Col>
                    <h5>{keranjang.product.nama}</h5>
                    <p>Rp. {numberWithCommas(keranjang.product.harga)}</p>
                    <p>{keranjang.keterangan}</p>
                  </Col>
                  <Col>
                    <strong>
                      Total : Rp. {numberWithCommas(keranjang.total_harga)}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
          </Card>
        ) : (
          <ListGroup variant="flush">
            <ListGroup.Item>Keranjang Kosong</ListGroup.Item>
          </ListGroup>
        )}

        <ModalKeranjang
          {...this.state}
          setHandleClose={this.setHandleClose}
          kurangJumlah={this.kurangJumlah}
          tambahJumlah={this.tambahJumlah}
          changeHandler={this.changeHandler}
          handleSubmit={this.handleSubmit}
          hapusPesanan={this.hapusPesanan}
        />

        <TotalBayar keranjangs={this.props.keranjangs} {...this.props} />
      </Col>
    );
  }
}
