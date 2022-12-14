/* eslint-disable import/no-anonymous-default-export */

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Form,
  Card,
  Button,
  Container,
  InputGroup,
} from "@themesberg/react-bootstrap";
import { Link, useParams, useHistory } from "react-router-dom";

import { Routes } from "../../routes";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Alert } from '@themesberg/react-bootstrap';
import axios from "axios";
import Swal from "sweetalert2";
import { Modal } from "@themesberg/react-bootstrap";

export default () => {
  let { id } = useParams();
  let { timeStamp } = useParams();

  const [open, setOpen] = useState(false);

  const [passwordType, setPasswordType] = useState("password");
  const [Password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checkBox, setCheckBox] = useState(false);

  //   if (timeStamp > 24 ){
  //     Swal.fire({
  //         position: "center",
  //         icon: "error",
  //         title: "Link Expired",
  //         showConfirmButton: true,
  //         }).then((result) => {
  //         if (result.isConfirmed) {
  //             history.push("/signin");
  //         }
  //         });
  //     }
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  const history = useHistory();

  async function Submit() {
    const mydata = {
      id: id,
      password: Password,
    };
    await axios
      .post(process.env.REACT_APP_BACKEND_URL + "/users/resetpasswordrequest", mydata)
      .then((response) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Mot de passe enregistré avec succès",
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            history.push("/signin");
          }
        });
      })
      .catch((e) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "error",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  }

  return (
    <main>
   
      <section className="bg-soft d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <Row className="justify-content-center">
            <p className="text-center">
              <Card.Link
                as={Link}
                to={Routes.Signin.path}
                className="text-gray-700"
              >
                <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to
                sign in
              </Card.Link>
            </p>
            <Col
              xs={12}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <h3 className="mb-4">Veuillez saisir votre mot de passe </h3>

                <Form.Group id="firstName" className="mb-4">
                  <Form.Label>Mot de passe</Form.Label>
                  <InputGroup>
                    <Button
                      size="sm"
                      style={{
                        borderColor: "transparent",
                        marginRight: 5,
                        backgroundColor: "#d7dce4",
                      }}
                      onClick={() => togglePassword()}
                    >
                      {passwordType === "password" ? (
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faEye} />
                        </InputGroup.Text>
                      ) : (
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faEyeSlash} />
                        </InputGroup.Text>
                      )}
                    </Button>
                    <Form.Control
                      type={passwordType}
                      required
                      placeholder="Entrer votre mot de passe"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    ></Form.Control>
                  </InputGroup>
                </Form.Group>
                <Form.Group id="firstName" className="mb-4">
                  <Form.Label> Confirmer votre mot de passe</Form.Label>
                  <InputGroup>
                    <Button
                      size="sm"
                      style={{
                        borderColor: "transparent",
                        marginRight: 5,
                        backgroundColor: "#d7dce4",
                      }}
                      onClick={() => togglePassword()}
                    >
                      {passwordType === "password" ? (
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faEye} />
                        </InputGroup.Text>
                      ) : (
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faEyeSlash} />
                        </InputGroup.Text>
                      )}
                    </Button>
                    <Form.Control
                      type={passwordType}
                      required
                      placeholder="Confirmer votre mot de passe"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                  </InputGroup>
                  {confirmPassword !== Password && confirmPassword !== "" ? (
                    <Alert className="mt-2" variant="danger">
                      Mot de passe ne correspond pas
                    </Alert>
                  ) : (
                    <span></span>
                  )}
                 
                  <Form.Check
                    className="mt-3"
                    type="checkbox"
                    label="J'accepte les termes et conditions"
                    onChange={(e) => setCheckBox(e.target.checked)}
                  />
                </Form.Group>
                {console.log(checkBox)}

                <Button
                  variant="primary"
                  className="w-100"
                  disabled={Password !== confirmPassword || checkBox === false || Password === ""}
                  onClick={() => Submit()}
                >
                  Confirmer mon mot de passe
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
