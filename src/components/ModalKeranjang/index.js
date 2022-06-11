import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { numberWithCommas } from "../../utils/Constant";

const ModalKeranjang = ({
  showModal,
  setHandleClose,
  keranjangDetail,
  jumlah,
  keterangan,
  kurangJumlah,
  tambahJumlah,
  changeHandler,
  handleSubmit,
  totalHarga,
  hapusPesanan
}) => {
  console.log("kurangJumlah modal >>> ", kurangJumlah);
  return (
    <Modal show={showModal} onHide={setHandleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {keranjangDetail !== false ? keranjangDetail.product.nama : "No Data"}{" "}
          <strong>
            Rp.{" "}
            {numberWithCommas(
              keranjangDetail !== false ? keranjangDetail.product.harga : 0
            )}
          </strong>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Total Harga : </Form.Label>
            <br />
            <strong>
              Rp.{" "}
              {/* {numberWithCommas(
                keranjangDetail !== false ? keranjangDetail.total_harga : 0
              )} */}
              {numberWithCommas(
                totalHarga !== false ? totalHarga : 0
              )}
            </strong>
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Jumlah : </Form.Label>
            <br />
            <div style={{display: "flex", alignItems: "center"}}>

              <Button variant="primary" size="sm" className="mr-5" onClick={ () => kurangJumlah()}>
                <FontAwesomeIcon icon={faMinus} />
              </Button>

              <strong className="mr-5">{jumlah}</strong>

              <Button variant="primary" size="sm" onClick={ () => tambahJumlah()}>
                <FontAwesomeIcon icon={faPlus} />
              </Button>

            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Keterangan : </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="keterangan"
              placeholder="Contoh: Pedas, Nasi Setengah"
              value={keterangan}
              onChange={(event) => changeHandler(event)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
              Submit
          </Button>

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={() => hapusPesanan(keranjangDetail.id)}>
          <FontAwesomeIcon icon={faTrash}/> Hapus Pesanan
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalKeranjang;
