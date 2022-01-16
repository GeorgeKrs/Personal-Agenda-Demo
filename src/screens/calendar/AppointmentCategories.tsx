import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcaseMedical,
  faSwimmer,
  faDumbbell,
} from "@fortawesome/free-solid-svg-icons";

const AppointmentCategories = () => {
  return (
    <div className="mt-5">
      <h3>Appointment Categories</h3>
      <ul className="list-group">
        <li className="list-group-item list-group-item-light">
          <h6>
            <FontAwesomeIcon
              icon={faBriefcaseMedical}
              size="lg"
              style={{ color: "var(--bs-success)" }}
            />
            <span className="px-1">Manual Therapy</span>
          </h6>
        </li>
        <li className="list-group-item list-group-item-light">
          <h6>
            <FontAwesomeIcon
              icon={faDumbbell}
              size="lg"
              style={{ color: "var(--bs-indigo)" }}
            />
            <span className="px-1">Pilates</span>
          </h6>
        </li>
        <li className="list-group-item list-group-item-light">
          <h6>
            <FontAwesomeIcon
              icon={faSwimmer}
              size="lg"
              style={{ color: "var(--bs-warning)" }}
            />
            <span className="px-1">Swimming</span>
          </h6>
        </li>
      </ul>
    </div>
  );
};

export default AppointmentCategories;
