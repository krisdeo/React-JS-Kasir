import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { API_URL } from "../../utils/Constant";
import swal from "sweetalert";

const ButtonSubmitBayar = ({ totalBayar, submitTotalBayar }) => {
  console.log("ButtonSubmitBayar >>> ", totalBayar);

  const navigate = useNavigate();

  return (
    <div className="d-grid gap-2">
      <Button
        className="mb-2 mt-2 mr-2"
        variant="primary"
        onClick={() => {
          // this.submitTotalBayar(_totalBayar);
          submitTotalBayar(totalBayar, navigate);
        }}
      >
        <FontAwesomeIcon icon={faShoppingCart} /> <strong>Bayar</strong>
      </Button>
    </div>
  );
};

export default ButtonSubmitBayar;
