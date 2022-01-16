import { useState, useEffect } from "react";
import AppointmentHistory from "./AppointmentHistory";
// font icons
import { faPenAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// firebase
import { db } from "../../utils/firebase";
import {
  collection,
  setDoc,
  doc,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";
// bootstsap
import { Modal } from "react-bootstrap";

const AllInformations = () => {
  // patients Data
  const [patientName, setPatientName] = useState("noPatient");
  const [dataLoader, setDataLoader] = useState(true);
  const [fullNames, setFullNames] = useState([]);
  const [patientData, setPatientData] = useState<any>([]);

  const [personalInfoLoader, setPersonalInfoLoader] = useState(false);
  const [patientHistory, setPatientHistory] = useState([]);

  const [saveNewInfo, setSaveNewInfo] = useState(false);

  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newStreet, setNewStreet] = useState("");
  const [newComments, setNewComments] = useState("");

  // modal edit patient info functions
  const [editPatientModal, setEditPatientModal] = useState(false);
  const handleClose = () => {
    setEditPatientModal(false);
  };
  const handleShow = () => {
    setEditPatientModal(true);
  };

  // end of edit patient info modal functions

  let Arr_PatientsFullNames: any = [];
  let Arr_PatientData: any = [];
  let Arr_PatientHistory: any = [];

  const fetchPatientsNames = async () => {
    const patientsQuery = query(collection(db, "Patients"));

    const querySnapshot = await getDocs(patientsQuery);
    querySnapshot.forEach((doc) => {
      Arr_PatientsFullNames.push(doc.data().fullName);
    });
    setFullNames(Arr_PatientsFullNames);
  };

  const fetchPatientData = async () => {
    const patientDataQuery = query(
      collection(db, "Patients"),
      where("fullName", "==", patientName)
    );

    const querySnapshot = await getDocs(patientDataQuery);
    querySnapshot.forEach((doc) => {
      Arr_PatientData.push(doc.data());
    });

    setPatientData(Arr_PatientData);

    setNewEmail(Arr_PatientData[0].email);
    setNewPhone(Arr_PatientData[0].phone);
    setNewStreet(Arr_PatientData[0].streetAddress);
    setNewComments(Arr_PatientData[0].comments);
  };

  const fetchPatientHistory = async () => {
    const patientHistoryQuery = query(
      collection(db, "Appointments"),
      where("fullName", "==", patientName),
      orderBy("startTime", "desc")
    );
    const queryHistorySnapshot = await getDocs(patientHistoryQuery);
    queryHistorySnapshot.forEach((doc) => {
      Arr_PatientHistory.push(doc.data());
    });

    setPatientHistory(Arr_PatientHistory);
  };

  const handleEditedInfo = () => {
    let emailValue = patientData[0].email;
    let phoneValue = patientData[0].phone;
    let streetValue = patientData[0].streetAddress;
    let commentsValue = patientData[0].comments;

    if (patientData[0].email !== newEmail) {
      emailValue = newEmail;
    } else {
      emailValue = patientData[0].email;
    }

    if (patientData[0].phone !== newPhone) {
      phoneValue = newPhone;
    } else {
      phoneValue = patientData[0].phone;
    }

    if (patientData[0].streetAddress !== newStreet) {
      streetValue = newStreet;
    } else {
      streetValue = patientData[0].streetAddress;
    }

    if (patientData[0].comments !== newComments) {
      commentsValue = newComments;
    } else {
      commentsValue = patientData[0].comments;
    }

    const editedFile = doc(db, "Patients", patientData[0].uuid);
    setDoc(
      editedFile,
      {
        streetAddress: streetValue,
        email: emailValue,
        phone: phoneValue,
        comments: commentsValue,
      },
      { merge: true }
    );
    setSaveNewInfo(true);
  };

  useEffect(() => {
    if (dataLoader === true) {
      fetchPatientsNames().then(() => setDataLoader(false));
    }
  }, [dataLoader]);

  useEffect(() => {
    setPersonalInfoLoader(true);
    fetchPatientData();
    fetchPatientHistory().then(() => {
      setPersonalInfoLoader(false);
    });
  }, [patientName]);

  useEffect(() => {
    if (saveNewInfo === true) {
      fetchPatientData().then(() => {
        handleClose();
        setSaveNewInfo(false);
      });
    }
  }, [saveNewInfo]);

  // functions to render
  const listFullnames = fullNames.map((fullName) => (
    <option key={fullName} value={fullName}>
      {fullName}
    </option>
  ));

  return (
    <div className="row">
      <div className="mt-4 col-lg-4 col-sm-12">
        <h6>Patient Name:</h6>
        <select
          className="mt-1 form-control"
          onChange={(e) => setPatientName(e.target.value)}
          value={patientName}
          disabled={dataLoader === true ? true : false}
        >
          <option value="noPatient">
            {dataLoader === true
              ? "Loading Patients.."
              : "Please select a patient.."}
          </option>
          {dataLoader === false ? listFullnames : null}
        </select>

        {/* personal inforamtion */}
        <div className="mt-4">
          <div className="">
            <h6>Patient Information:</h6>
          </div>

          <ul className="mt-2 list-group">
            <li className="list-group-item">
              <h6>First Name:</h6>
              {patientData.length === 0 || patientData === undefined
                ? null
                : patientData[0].firstName}
            </li>
            <li className="list-group-item">
              <h6>Last Name:</h6>
              {patientData.length === 0 || patientData === undefined
                ? null
                : patientData[0].lastName}
            </li>
            <li className="list-group-item">
              <h6>Email:</h6>
              {patientData.length === 0 || patientData === undefined
                ? null
                : patientData[0].email}
            </li>
            <li className="list-group-item">
              <h6>Phone Number:</h6>
              {patientData.length === 0 || patientData === undefined
                ? null
                : patientData[0].phone}
            </li>
            <li className="list-group-item">
              <h6>Street Adress:</h6>
              {patientData.length === 0 || patientData === undefined
                ? null
                : patientData[0].streetAddress}
            </li>
            <li className="list-group-item">
              <h6>Comments:</h6>
              {patientData.length === 0 || patientData === undefined
                ? null
                : patientData[0].comments}
            </li>
          </ul>
          {/* personal inforamtion */}

          <button
            className="mt-2 w-100 btn btn-outline-info"
            disabled={
              personalInfoLoader === true || patientName === "noPatient"
                ? true
                : false
            }
            onClick={handleShow}
          >
            <FontAwesomeIcon
              icon={faPenAlt}
              style={{ color: "var(--bs-dark)" }}
            />
            <span className="px-1">Edit Information</span>
          </button>
        </div>
      </div>
      <div className="mt-4 offset-lg-1 col-lg-7 col-sm-12">
        <h6>Patient History:</h6>
        <hr />
        {personalInfoLoader === true ? (
          <div>
            <div className="d-flex justify-content-center">
              <span className="my-auto spinner-border spinner-border-sm" />
              <h6 className="px-1 my-auto">Fetching Data..</h6>
            </div>
          </div>
        ) : patientName === "noPatient" ? null : patientHistory.length === 0 ? (
          <div>
            <b>There is no medical history for the selected patient.</b>
          </div>
        ) : (
          <AppointmentHistory patientHistory={patientHistory} />
        )}
      </div>

      {/* modal for new appointments */}
      <Modal show={editPatientModal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Edit Patient Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="">
            <h6>Patient Name:</h6>
            <input className="mt-1 form-control" value={patientName} disabled />

            <div className="row">
              <div className="mt-4 col-lg-7 col-sm-12">
                <h6>Email:</h6>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={
                    patientData.length === 0 ? null : patientData[0].email
                  }
                  onChange={(e) => setNewEmail(e.target.value)}
                  disabled={saveNewInfo === true ? true : false}
                />
              </div>
              <div className="mt-4 col-lg-5 col-sm-12">
                <h6>Phone Number:</h6>
                <input
                  type="number"
                  className="form-control"
                  defaultValue={
                    patientData.length === 0 ? null : patientData[0].phone
                  }
                  onChange={(e) => setNewPhone(e.target.value)}
                  disabled={saveNewInfo === true ? true : false}
                />
              </div>
            </div>
            <div className="mt-4 col-lg-12 col-sm-12">
              <h6>Street Address:</h6>
              <input
                type="text"
                className="form-control"
                defaultValue={
                  patientData.length === 0 ? null : patientData[0].streetAddress
                }
                onChange={(e) => setNewStreet(e.target.value)}
                disabled={saveNewInfo === true ? true : false}
              />
            </div>

            <div className="mt-4 col-lg-12 col-sm-12">
              <h6>Comments:</h6>
              <textarea
                className="form-control"
                rows={3}
                defaultValue={
                  patientData.length === 0 ? null : patientData[0].comments
                }
                onChange={(e) => setNewComments(e.target.value)}
                disabled={saveNewInfo === true ? true : false}
              ></textarea>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-outline-info"
            onClick={handleEditedInfo}
            disabled={saveNewInfo === true ? true : false}
          >
            {saveNewInfo === true ? (
              <span className="px-1 spinner-border spinner-border-sm"></span>
            ) : null}
            {saveNewInfo === true ? "Please Wait.." : "Save"}
          </button>

          <button
            type="button"
            className="btn btn-outline-dark"
            onClick={handleClose}
            disabled={saveNewInfo === true ? true : false}
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
      {/*end of edit modal for new appointments */}
    </div>
  );
};

export default AllInformations;
