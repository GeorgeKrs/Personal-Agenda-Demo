import { useState, useEffect } from "react";
// font icons
import {
  faTrashAlt,
  faPenAlt,
  faSave,
  faBriefcaseMedical,
  faSwimmer,
  faDumbbell,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// timeOptions
import { timeOptions } from "../../utils/timeOptions";
// bootstrap
import { Modal } from "react-bootstrap";
// firebase
import { doc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";

interface Props {
  recordObject: any;
  recordIndex: number;
  ToggleRecordsState: () => void;
}

const DailyAppointments = (props: Props) => {
  const [editable, setEditable] = useState(false);

  let day = props.recordObject.startTime.toDate().getDate();
  let month = parseInt(props.recordObject.startTime.toDate().getMonth()) + 1;
  let year = props.recordObject.startTime.toDate().getFullYear();

  let startHour = props.recordObject.startTime.toDate().getHours();
  let startMin = props.recordObject.startTime.toDate().getMinutes();

  let endHour = props.recordObject.endTime.toDate().getHours();
  let endMin = props.recordObject.endTime.toDate().getMinutes();

  if (startHour < 10) {
    startHour = "0" + startHour;
  }
  if (startMin < 10) {
    startMin = "0" + startMin;
  }
  if (endHour < 10) {
    endHour = "0" + endHour;
  }
  if (endMin < 10) {
    endMin = "0" + endMin;
  }

  let start = startHour + ":" + startMin;
  let end = endHour + ":" + endMin;

  // modal states
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => {
    setShowDelete(true);
  };
  // end of modal states

  const [waitingToDelete, setWaitingToDelete] = useState(false);

  const deleteRequest = () => {
    setWaitingToDelete(true);
    deleteMeetingHandler();
  };

  const deleteMeetingHandler = () => {
    (async () => {
      await deleteDoc(doc(db, "Appointments", props.recordObject.udid)).then(
        () => {
          props.ToggleRecordsState();
          handleCloseDelete();
          setWaitingToDelete(false);
        }
      );
    })();
  };

  const [newCategory, setNewCategory] = useState(props.recordObject.category);
  const [newFee, setNewFee] = useState(props.recordObject.fee);
  const [newStartTime, setNewStartTime] = useState("");
  const [newEndTime, setNewEndTime] = useState("");
  const [newComments, setNewComments] = useState(props.recordObject.comments);

  const editMeetingHandler = () => {
    setEditable(false);

    let Arr_StartTime: any = [];
    let Arr_EndTime: any = [];

    let temp_StartHour = 0;
    let temp_StartMin = 0;

    let temp_EndHour = 0;
    let temp_EndMin = 0;

    // managing time
    if (newStartTime !== "") {
      Arr_StartTime = newStartTime.split(":");
      temp_StartHour = parseInt(Arr_StartTime[0]);
      temp_StartMin = parseInt(Arr_StartTime[1]);
    } else {
      temp_StartHour = startHour;
      temp_StartMin = startMin;
    }

    if (newEndTime !== "") {
      Arr_EndTime = newEndTime.split(":");
      temp_EndHour = parseInt(Arr_EndTime[0]);
      temp_EndMin = parseInt(Arr_EndTime[1]);
    } else {
      temp_EndHour = endHour;
      temp_EndMin = endMin;
    }

    const start_Timestamp = new Date(
      props.recordObject.startTime.toDate().getFullYear(),
      props.recordObject.startTime.toDate().getMonth(),
      props.recordObject.startTime.toDate().getDate(),
      temp_StartHour,
      temp_StartMin
    );

    const end_Timestamp = new Date(
      props.recordObject.startTime.toDate().getFullYear(),
      props.recordObject.startTime.toDate().getMonth(),
      props.recordObject.startTime.toDate().getDate(),
      temp_EndHour,
      temp_EndMin
    );

    let feeValue = 0;

    if (isNaN(newFee) || newFee === undefined || newFee === null) {
      feeValue = 0;
    } else {
      feeValue = newFee;
    }

    const editedFile = doc(db, "Appointments", props.recordObject.udid);
    setDoc(
      editedFile,
      {
        startTime: start_Timestamp,
        endTime: end_Timestamp,
        category: newCategory,
        fee: feeValue,
        comments: newComments,
      },
      { merge: true }
    ).then(() => props.ToggleRecordsState());
  };

  // functions to render
  const listTime = timeOptions.map((time) => (
    <option key={time} value={time}>
      {time}
    </option>
  ));

  const categoriesOptions = ["Manual Therapy", "Pilates", "Swimming"];
  const listCategories = categoriesOptions.map((category) => (
    <option key={category} value={category}>
      {category}
    </option>
  ));

  return (
    <div className="mb-4" key={props.recordObject.udid}>
      <hr />

      <h6>Patient Name:</h6>
      <select
        className="mt-1 form-control"
        defaultValue={props.recordObject.fullName}
        disabled={true}
      >
        <option value={props.recordObject.fullName}>
          {props.recordObject.fullName}
        </option>
      </select>
      <div className="row">
        <div className="col-lg-6 col-sm-12">
          <h6 className="mt-1">
            Category:
            {props.recordObject.category === "Manual Therapy" ? (
              <span className="px-1">
                <FontAwesomeIcon
                  icon={faBriefcaseMedical}
                  style={{ color: "var(--bs-success)" }}
                />
              </span>
            ) : props.recordObject.category === "Pilates" ? (
              <span className="px-1">
                <FontAwesomeIcon
                  icon={faDumbbell}
                  style={{ color: "var(--bs-indigo)" }}
                />
              </span>
            ) : props.recordObject.category === "Swimming" ? (
              <span className="px-1">
                <FontAwesomeIcon
                  icon={faSwimmer}
                  style={{ color: "var(--bs-warning)" }}
                />
              </span>
            ) : null}
          </h6>
          <select
            className="mt-1 form-control"
            onChange={(e) => setNewCategory(e.target.value)}
            defaultValue={props.recordObject.category}
            disabled={editable === false ? true : false}
          >
            {listCategories}
          </select>
        </div>
        <div className="col-lg-6 col-sm-12">
          <h6 className="mt-1">Fee:</h6>
          <input
            type="number"
            min="0"
            className="form-control"
            disabled={editable === false ? true : false}
            onChange={(e) => setNewFee(e.target.valueAsNumber)}
            defaultValue={
              isNaN(props.recordObject.fee) ? 0 : props.recordObject.fee
            }
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 col-sm-12">
          <h6 className="mt-1">Start Time:</h6>
          <select
            className="mt-1 form-control"
            onChange={(e) => setNewStartTime(e.target.value)}
            defaultValue={start}
            disabled={editable === false ? true : false}
          >
            {listTime}
          </select>
        </div>
        <div className="col-lg-6 col-sm-12">
          <h6 className="mt-1">End Time:</h6>
          <select
            className="mt-1 form-control"
            onChange={(e) => setNewEndTime(e.target.value)}
            defaultValue={end}
            disabled={editable === false ? true : false}
          >
            {listTime}
          </select>
        </div>
      </div>
      <div className="form-group mt-1">
        <h6>Comments:</h6>
        <textarea
          className="form-control"
          defaultValue={props.recordObject.comments}
          onChange={(e) => setNewComments(e.target.value)}
          rows={2}
          disabled={editable === false ? true : false}
        />
      </div>
      <div className="d-flex justify-content-end mt-2">
        <div className="px-2">
          {editable === false ? (
            <button
              className="px-2 btn btn-outline-info"
              onClick={() => setEditable(true)}
            >
              <FontAwesomeIcon
                icon={faPenAlt}
                style={{ color: "var(--bs-dark)" }}
              />
            </button>
          ) : (
            <button
              className="px-2 btn btn-outline-primary"
              onClick={editMeetingHandler}
            >
              <FontAwesomeIcon
                icon={faSave}
                style={{ color: "var(--bs-dark)" }}
              />
            </button>
          )}
        </div>
        <div>
          <button
            className="px-2 btn btn-outline-danger"
            onClick={handleShowDelete}
          >
            <FontAwesomeIcon
              icon={faTrashAlt}
              style={{ color: "var(--bs-dark)" }}
            />
          </button>
        </div>
      </div>
      {/* delete meeting modal */}
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header>
          <Modal.Title>Delete Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <b>Are you sure you want to delete this scheduled appointment?</b>
        </Modal.Body>
        <Modal.Body>
          <ul className="mt-2 list-group">
            <li className="list-group-item">
              <h6>Date: {day + "/" + month + "/" + year}</h6>
            </li>
            <li className="list-group-item">
              <h6>First Name:</h6>
              {props.recordObject.fullName}
            </li>
            <li className="list-group-item">
              <h6>Fee:</h6>
              {isNaN(props.recordObject.fee) ? "0" : props.recordObject.fee}
            </li>

            <li className="list-group-item">
              <h6>Time:</h6>
              {start + " - " + end}
            </li>
            <li className="list-group-item">
              <h6>Comments:</h6>
              {props.recordObject.comments}
            </li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={deleteRequest}
            disabled={waitingToDelete === true ? true : false}
          >
            Delete
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={handleCloseDelete}
            disabled={waitingToDelete === true ? true : false}
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
      {/* end of delete meeting modal */}
    </div>
  );
};

export default DailyAppointments;
