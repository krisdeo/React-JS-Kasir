import axios from "axios";
import React, { Component } from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";
import swal from "sweetalert";
import { Hasil, ListCategory, NavbarComponent, Menus } from "../../components";
import { API_URL } from "../../utils/Constant";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      selectedCategory: "Makanan",
      keranjangs: []
    };
  }

  componentDidMount() {
    this.getProductByCategory();
    this.getKeranjang();
  }

  // componentDidUpdate (prevState) {
  //   if(this.state.keranjangs !== prevState.keranjangs) {
  //     this.getKeranjang();
  //     //Bisa juga saat add keranjang panggil didMount
  //   }
  // }

  getProductByCategory = () => {
    axios
    .get(API_URL + "products?category.nama=" + this.state.selectedCategory)
    .then((res) => {
      console.log("Res >>> ", res);
      if (res.status === 200) {
        this.setState({
          menus: res.data,
        });
      }
      console.log("State >>> ", this.state);
    })
    .catch((error) => {
      console.log("error >>> ", error.message);

      alert("Error ! " + error.message);
    });
  }

  getKeranjang = () => {
    axios
    .get(API_URL + "keranjangs")
    .then((res) => {
      console.log("Res keranjangs >>> ", res);
      if (res.status === 200) {
        this.setState({
          keranjangs: res.data,
        });
      }
      console.log("State keranjangs >>> ", this.state);
    })
    .catch((error) => {
      console.log("error >>> ", error.message);

      alert("Error ! " + error.message);
    });
  }

  checkKeranjang = (menuValue) => {
    axios
    .get(API_URL + "keranjangs?product.id=" + menuValue.id)
    .then((res) => {
      console.log("Res >>> ", res);
      if (res.status === 200) {
        if(res.data.length === 0){
          this.addKeranjang(menuValue);
        } else {
          this.putKeranjang(menuValue, res);
        }
      } 
    })
    .catch((error) => { 
      alert("Error ! " + error.message);
    });
  };

  addKeranjang = (menuValue) => {
    const keranjangInput = {
      jumlah: 1,
      total_harga: menuValue.harga,
      product: menuValue
    }

    axios
      .post(API_URL + "keranjangs", keranjangInput)
      // .delete(API_URL + "keranjangs/1")
      .then((res) => {
        console.log("add keranjangs >>> ", res);
        if (res.status === 200 || res.status === 201) {
          swal({
            title: "Success!",
            text: "Sukses menambahkan ke keranjang : "+keranjangInput.product.nama,
            icon: "success",
            button: false,
            timer: 2000
          }); 
          this.componentDidMount();
        } 
      })
      .catch((error) => { 
        alert("Error ! " + error.message);
      });
  }

  putKeranjang = (menuValue, checkKeranjangResult) => {
    const keranjangInput = {
      jumlah: checkKeranjangResult.data[0].jumlah+1,
      total_harga: checkKeranjangResult.data[0].total_harga+menuValue.harga,
      product: menuValue
    }

    axios
      .put(API_URL + "keranjangs/"+checkKeranjangResult.data[0].id, keranjangInput)
      // .delete(API_URL + "keranjangs/1")
      .then((res) => {
        console.log("Res keranjangs >>> ", res);
        if (res.status === 200 || res.status === 201) {
          swal({
            title: "Success!",
            text: "Sukses menambahkan ke keranjang : "+keranjangInput.product.nama,
            icon: "success",
            button: false,
            timer: 2000
          }); 
          this.componentDidMount();
        } 
      })
      .catch((error) => { 
        alert("Error ! " + error.message);
      });

  }

  changeCategory = (value) => {
    this.setState({
      selectedCategory: value,
      menus: [],
    });

    axios
      .get(API_URL + "products?category.nama=" + value)
      .then((res) => {
        console.log("Res >>> ", res);
        if (res.status === 200) {
          this.setState({
            menus: res.data,
          });
        }
        console.log("State >>> ", this.state);
      })
      .catch((error) => {
        console.log("error >>> ", error.message);

        alert("Error ! " + error.message);
      });
  };

  inputKeranjangs = (menuValue) => {
    console.log('inputKeranjangs >>> ',menuValue);
     
    this.checkKeranjang(menuValue);
  }

  render() {
    return (
      <div className="Home"> 
          <Container fluid className="mt-3" style={{marginBottom: 20}}>
            <Row>
              <ListCategory
                changeCategory={this.changeCategory}
                selectedCategory={this.state.selectedCategory}
              />
              {/* <p className="mb-3"/> */}
              <Col>
                <h4>
                  <strong>Daftar Produk</strong>
                </h4>
                <hr />
                <Row className="overflow-auto rowMenu">
                  {this.state.menus &&
                    this.state.menus.map((menu) => (
                      <Menus key={menu.id} menu={menu} inputKeranjangs={this.inputKeranjangs}/>
                    ))}
                </Row>
              </Col>
              <Hasil keranjangs={this.state.keranjangs} {...this.props} getKeranjang={this.getKeranjang} getProductByCategory={this.getProductByCategory}/>
            </Row>
          </Container>
        </div>
    );
  }
}
