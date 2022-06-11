import React, { Component } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { numberWithCommas } from "../../utils/Constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { API_URL } from '../../utils/Constant/index';
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom"; 
import { ButtonSubmitBayar } from "../../components";

export default class TotalBayar extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
    }
  }

  submitTotalBayar = (totalBayar, useNavigate) => {
    try {
      console.log('totalBayar >>> ',totalBayar);
      const pesanan = {
        total_bayar : totalBayar,
        menus : this.props.keranjangs
      }

      axios
        .post(API_URL+"pesanans", pesanan)
        .then((res) => {
          console.log('totalBayar res >>> ',res);
          useNavigate('/success');
        })
        .catch((error) => {
      console.log('error atas >>> ',error);

          swal("Error ! ", "ERROR", "error");
        })
    } catch (error) {
      console.log('error bawah >>> ',error);
      swal("Error ! ", "ERROR", "error");
    }
  } 

  cekMasuk = (totalBayar, useNavigate) => {
    console.log('cekMasuk >>> ', useNavigate);
  }


  render() {
    const _totalBayar = this.props.keranjangs.reduce((result, item) => {
      return result + item.total_harga;
    }, 0);

    return (
      <>
      {/* Web */}
      <div className="fixed-bottom d-none d-md-block">
        <Row>
          <Col md={{ span: 3, offset: 9 }} className="px-4 pt-2" style={{backgroundColor: "white"}}>
            <h4>
              Total Harga :{" "}
              <strong style={{ float: "right" }}>
                Rp. {numberWithCommas(_totalBayar)}
              </strong>
            </h4>
            <ButtonSubmitBayar totalBayar={_totalBayar} submitTotalBayar={this.submitTotalBayar}/>
          </Col>
        </Row>
      </div>

      {/* Mobile */}
      <div className="d-sm-block d-md-none">
        <Row>
          <Col md={{ span: 3, offset: 9 }} className="px-4 pt-2" style={{backgroundColor: "white"}}>
            <h4>
              Total Harga :{" "}
              <strong style={{ float: "right" }}>
                Rp. {numberWithCommas(_totalBayar)}
              </strong>
            </h4>
            <ButtonSubmitBayar totalBayar={_totalBayar} submitTotalBayar={this.submitTotalBayar}/>
          </Col>
        </Row>
      </div>
      </>
    );
  }
}
