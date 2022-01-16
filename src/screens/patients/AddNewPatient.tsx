import { useState } from "react";
// components
import TitleWIcon from "../../GeneralComponents/TitleWIcon";
import ErrorMsg from "../../GeneralComponents/ErrorMsg";
// fonts
import {
  faArrowAltCircleDown,
  faArrowAltCircleUp,
  faClipboardCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// bootrsap
import { Modal } from "react-bootstrap";
// firebase
import { db } from "../../utils/firebase";
import { addDoc, Timestamp, collection, setDoc, doc } from "firebase/firestore";

interface Props {
  loggedInUser: string;
}

const AddNewPatient = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [openDiv, setOpenDiv] = useState(false);
  const switchDivState = (openDiv: boolean) => {
    setOpenDiv(!openDiv);
  };

  // inputs values & Validation
  const [errorFirstName, setErrorFirstName] = useState(false);
  const [errorLastName, setErrorLastName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [comments, setComments] = useState("");

  // modal
  const [showSuccess, setShowSuccess] = useState(false);
  const handleCloseSuccess = () => {
    setFirstName("");
    setLastName("");
    setStreetAddress("");
    setEmail("");
    setPhone("");
    setComments("");
    setLoading(false);
    setShowSuccess(false);
  };
  const handleOpenSuccess = () => setShowSuccess(true);

  // form validation
  const FormValidation = () => {
    let isValid = false;

    let errFirstName = true;
    let errLastName = true;
    let errEmail = true;

    if (
      firstName.length === 0 ||
      firstName === "" ||
      firstName.length < 3 ||
      firstName.length > 25
    ) {
      setErrorFirstName(true);
    } else {
      setErrorFirstName(false);
      errFirstName = false;
    }

    if (
      lastName.length === 0 ||
      lastName === "" ||
      lastName.length < 3 ||
      lastName.length > 25
    ) {
      setErrorLastName(true);
    } else {
      setErrorLastName(false);
      errLastName = false;
    }

    if (email.length !== 0 || email !== "") {
      if (email.includes("@")) {
        setErrorEmail(false);
        errEmail = false;
      } else {
        setErrorEmail(true);
      }
    } else {
      setErrorEmail(false);
      errEmail = false;
    }

    if (errFirstName === false && errLastName === false && errEmail === false) {
      isValid = true;
    } else {
      setLoading(false);
    }

    return isValid;
  };

  // Add new patient
  const NewPatient = () => {
    setLoading(true);
    if (FormValidation() === true) {
      (async () => {
        await addDoc(collection(db, "Patients"), {
          firstName: firstName,
          lastName: lastName,
          fullName: firstName + " " + lastName,
          streetAddress: streetAddress,
          email: email,
          phone: phone,
          comments: comments,
          uuid: "",
          userCreated: Timestamp.fromDate(new Date()),
        })
          .then(function (docRef) {
            const addID = doc(db, "Patients", docRef.id);
            setDoc(addID, { uuid: docRef.id }, { merge: true });
            // console.log("Document written with ID: ", docRef.id);
            handleOpenSuccess();
          })
          .catch(function (error) {
            alert("Error adding document: " + error);
            setLoading(false);
          });
      })();
    }
  };

  return (
    <div className="container px-lg-5">
      <div className="p-3 px-lg-5 border border-info rounded">
        <TitleWIcon
          headText={"Add New Patient"}
          fontIcon={
            openDiv === true ? faArrowAltCircleUp : faArrowAltCircleDown
          }
          divState={(openDiv) => switchDivState(openDiv)}
          openDiv={openDiv}
        />
        {openDiv === true ? (
          <div>
            <div className="row">
              <div className="col-lg-6 col-sm-12">
                <div className="mt-3 form-group">
                  <h6>*First Name:</h6>
                  <input
                    type="text"
                    className="form-control"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    onInput={(e) => setErrorFirstName(false)}
                  />
                  {errorFirstName && (
                    <ErrorMsg
                      msg={"First Name must be between 3 and 25 characters."}
                    />
                  )}
                </div>
              </div>
              <div className="col-lg-6 col-sm-12">
                <div className="mt-3 form-group">
                  <h6>*Last Name:</h6>
                  <input
                    type="text"
                    className="form-control"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    onInput={(e) => setErrorLastName(false)}
                  />
                  {errorLastName && (
                    <ErrorMsg
                      msg={"Last Name must be between 3 and 25 characters."}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4 col-sm-12">
                <div className="mt-3 form-group">
                  <h6>Street Address:</h6>
                  <input
                    type="text"
                    className="form-control"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-4 col-sm-12">
                <div className="mt-3 form-group">
                  <h6>Email Address:</h6>
                  <input
                    type="text"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onInput={() => setErrorEmail(false)}
                  />
                  {errorEmail && (
                    <ErrorMsg
                      msg={
                        "If you choose to save an email, please select a valid one."
                      }
                    />
                  )}
                </div>
              </div>
              <div className="col-lg-4 col-sm-12">
                <div className="mt-3 form-group">
                  <h6>Phone Number:</h6>
                  <input
                    type="number"
                    className="form-control"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-lg-12 col-sm-12">
                <h6>Comments:</h6>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows={3}
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                ></textarea>
              </div>
              <div className="mt-3">
                <button
                  className="btn btn-outline-info"
                  disabled={loading === true ? true : false}
                  onClick={NewPatient}
                >
                  {loading === true ? (
                    <span className="px-1 spinner-border spinner-border-sm"></span>
                  ) : null}
                  {loading === true ? "Please Wait.." : "Add Patient"}
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      {/* success modal */}
      <Modal show={showSuccess} onHide={handleCloseSuccess}>
        <Modal.Header>
          <Modal.Title>
            Success!
            <span className="px-1">
              <FontAwesomeIcon
                icon={faClipboardCheck}
                style={{ color: "var(--bs-success)" }}
              />
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Patient Added Successfully!</Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={handleCloseSuccess}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
      {/* end of success modal */}
    </div>
  );
};

export default AddNewPatient;
