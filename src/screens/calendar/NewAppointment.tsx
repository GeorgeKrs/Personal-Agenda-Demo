import { useState, useEffect } from "react";
// fonts
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// bootstsap
import { Modal } from "react-bootstrap";
// firebase
import { db } from "../../utils/firebase";
import {
  addDoc,
  Timestamp,
  collection,
  setDoc,
  doc,
  query,
  getDocs,
} from "firebase/firestore";
// timeOptions
import { timeOptions } from "../../utils/timeOptions";

interface Props {
  displayDate: string;
  selectedDate: Date;
  ToggleRecordsState: () => void;
}

const NewAppointment = (props: Props) => {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
    setPatientName("noPatient");
    setCategory("Manual Therapy");
    setFee(0);
    setStartTime("08:00");
    setEndTime("09:00");
    setComments("");
    setAppCreated(false);
  };
  const handleShow = () => {
    setDataLoader(true);
    setShowModal(true);
  };

  const [patientName, setPatientName] = useState("noPatient");
  const [category, setCategory] = useState("Manual Therapy");
  const [fee, setFee] = useState(0);
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("09:00");
  const [comments, setComments] = useState("");

  // new entry loader
  const [appointmentLoader, setAppointmentLoader] = useState(false);
  const [appCreated, setAppCreated] = useState(false);

  // patients Data
  const [dataLoader, setDataLoader] = useState(true);
  const [fullNames, setFullNames] = useState([]);

  let Arr_PatientFullNames: any = [];

  const fetchPatientData = async () => {
    const patientsQuery = query(collection(db, "Patients"));

    const querySnapshot = await getDocs(patientsQuery);
    querySnapshot.forEach((doc) => {
      Arr_PatientFullNames.push(doc.data().fullName);
    });
    setFullNames(Arr_PatientFullNames);
  };

  useEffect(() => {
    if (dataLoader === true) {
      fetchPatientData().then(() => setDataLoader(false));
    }
  }, [dataLoader]);

  const formValidation = () => {
    let errPatientName = true;

    if (patientName === "noPatient") {
      errPatientName = true;
    } else {
      errPatientName = false;
    }
    return errPatientName;
  };

  const createNewAppointment = () => {
    setAppointmentLoader(true);
    if (formValidation() === true) {
      alert("Unexpected error, please contact me.");
      setAppointmentLoader(false);
    } else {
      // managing date and time to create timestamp
      let Arr_StartTime = startTime.split(":");
      let Arr_EndTime = endTime.split(":");
      const temp_StartHour = parseInt(Arr_StartTime[0]);
      const temp_StartMin = parseInt(Arr_StartTime[1]);
      const temp_EndHour = parseInt(Arr_EndTime[0]);
      const temp_EndMin = parseInt(Arr_EndTime[1]);

      const start_Timestamp = new Date(
        props.selectedDate.getFullYear(),
        props.selectedDate.getMonth(),
        props.selectedDate.getDate(),
        temp_StartHour,
        temp_StartMin
      );

      const end_Timestamp = new Date(
        props.selectedDate.getFullYear(),
        props.selectedDate.getMonth(),
        props.selectedDate.getDate(),
        temp_EndHour,
        temp_EndMin
      );

      let feeValue = 0;

      if (isNaN(fee) || fee === undefined || fee === null) {
        feeValue = 0;
      } else {
        feeValue = fee;
      }
      // end of managing date and time to create timestamp
      (async () => {
        await addDoc(collection(db, "Appointments"), {
          fullName: patientName,
          category: category,
          fee: feeValue,
          startTime: start_Timestamp,
          endTime: end_Timestamp,
          comments: comments,
          udid: "",
          dateCreated: Timestamp.fromDate(new Date()),
        })
          .then(function (docRef) {
            const addID = doc(db, "Appointments", docRef.id);
            setDoc(addID, { udid: docRef.id }, { merge: true });
            setAppCreated(true);
            setAppointmentLoader(false);
            props.ToggleRecordsState();
          })
          .catch(function (error) {
            alert("Error adding document: " + error);
            setAppointmentLoader(false);
          });
      })();
    }
  };

  // functions to render
  const listFullnames = fullNames.map((fullName) => (
    <option key={fullName} value={fullName}>
      {fullName}
    </option>
  ));

  const listTime = timeOptions.map((time) => (
    <option key={time} value={time}>
      {time}
    </option>
  ));

  return (
    <div>
      <div className="mt-2">
        <button className="btn btn-outline-info w-100" onClick={handleShow}>
          New Appointment
        </button>
      </div>

      {/* modal for new appointments */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>New Appointment: {props.displayDate}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="">
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

            <div className="row">
              <div className="col-lg-6 col-sm-12">
                <h6 className="mt-3">Category:</h6>
                <select
                  className="mt-1 form-control"
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                >
                  <option value="Manual Therapy">Manual Therapy</option>
                  <option value="Pilates">Pilates</option>
                  <option value="Swimming">Swimming</option>
                </select>
              </div>
              <div className="col-lg-6 col-sm-12">
                <h6 className="mt-3">Fee:</h6>
                <input
                  value={fee}
                  step={0.1}
                  type="number"
                  min="0"
                  className="form-control"
                  onChange={(e) => setFee(e.target.valueAsNumber)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-sm-12">
                <h6 className="mt-3">Start Time:</h6>
                <select
                  className="mt-1 form-control"
                  onChange={(e) => setStartTime(e.target.value)}
                  value={startTime}
                >
                  {listTime}
                </select>
              </div>
              <div className="col-lg-6 col-sm-12">
                <h6 className="mt-3">End Time:</h6>
                <select
                  className="mt-1 form-control"
                  onChange={(e) => setEndTime(e.target.value)}
                  value={endTime}
                >
                  {listTime}
                </select>
              </div>
            </div>
            <div className="form-group mt-3">
              <h6>Comments:</h6>
              <textarea
                className="form-control"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                rows={3}
              />
            </div>

            <div className="text-success mt-3">
              {appCreated === true ? (
                <b>
                  <span className="px-1">
                    <FontAwesomeIcon
                      icon={faCalendarDay}
                      style={{ color: "var(--bs-success)" }}
                      size="lg"
                    />
                  </span>
                  Appointment Added Successfully!
                </b>
              ) : null}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-outline-info"
            onClick={createNewAppointment}
            disabled={
              (patientName === "noPatient" ? true : false) ||
              (appointmentLoader === true ? true : false) ||
              (appCreated === true ? true : false)
            }
          >
            {appointmentLoader === true ? (
              <span className="px-1 spinner-border spinner-border-sm"></span>
            ) : null}
            {appointmentLoader === true ? "Please Wait.." : "Save"}
          </button>

          <button
            type="button"
            className="btn btn-outline-dark"
            onClick={handleClose}
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
      {/*end of modal for new appointments */}
    </div>
  );
};

export default NewAppointment;
