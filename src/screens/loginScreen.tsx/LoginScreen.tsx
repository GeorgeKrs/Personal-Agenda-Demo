import { useState } from "react";
import loginImg from "../../assets/LoginImg.jpg";
import { auth, signInWithEmailAndPassword } from "../../utils/firebase";
import { Modal } from "react-bootstrap";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [errLogin, setErrorLogin] = useState(false);

  const handleClose = () => setErrorLogin(false);
  const handleShow = () => setErrorLogin(true);

  const formHandler = () => {
    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential: any) => {
        setLoading(false);
      })
      .catch((error: any) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        setLoading(false);
        handleShow();
      });
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center bg-light"
      style={{ minHeight: "100vh" }}
    >
      <div className="px-3">
        <div className="max-img-dimensions">
          <img className="img-thumbnail" src={loginImg} alt="Login Icon" />
        </div>

        <div className="form-group mt-5">
          <h6>Email:</h6>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group mt-4">
          <h6>Password:</h6>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <p className="mt-2 text-danger">
          Email: test@gmail.com <br /> Password: test12345
        </p>

        <div className="form-group mt-4">
          <button
            type="button"
            className="btn btn-outline-info w-100"
            onClick={formHandler}
            disabled={loading ? true : false}
          >
            {loading ? (
              <div className="spinner-border spinner-border-sm text-info mx-1"></div>
            ) : null}
            {loading ? "Please Wait.." : "Login"}
          </button>
        </div>
        {errLogin ? (
          <Modal show={errLogin} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Login Failed</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <b>Email and/or Password are wrong.</b>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                className="btn btn-outline-dark"
                onClick={handleClose}
              >
                Close
              </button>
            </Modal.Footer>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

export default LoginScreen;
