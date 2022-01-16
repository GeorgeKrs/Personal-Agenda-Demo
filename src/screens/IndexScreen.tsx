import { useState } from "react";
// font icons
import {
  faCalendar,
  faBookMedical,
  faChartBar,
  faSignOutAlt,
  faUserCog,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// bootstrap
import { Modal } from "react-bootstrap";
// screens
import NavigationIcons from "../GeneralComponents/NavigationIcons";
import CalendarScreen from "./calendar/CalendarScreen";
import PatientsScreen from "./patients/PatientsScreen";
import MetricsScreen from "./metrics/MetricsScreen";
import SettingsScreen from "./settings/SettingsScreen";
// firebase
import { auth, signOut } from "../utils/firebase";

interface Props {
  loggedInUser: string;
}

const IndexScreen = (props: Props) => {
  const [activeTab, setActiveTab] = useState("AppointmentsTab");

  const ToggleTabState = (tabId: string) => {
    setActiveTab(tabId);
  };

  // sign out functionality
  const signOutHandler = () => {
    signOut(auth)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        alert(error);
      });
  };

  const [showSignOut, setShowSignOut] = useState(false);
  const handleCloseSignOut = () => setShowSignOut(false);
  const handleShowSignOut = () => setShowSignOut(true);
  // sign out functionality

  return (
    <div
      className="bg-light mt-5"
      style={{ minHeight: "100vh", overflowX: "hidden" }}
    >
      <div className="container">
        <div className="fixed-top p-3 bg-info text-white">
          <div
            className="d-flex justify-content-center"
            style={{ overflow: "hidden" }}
          >
            <NavigationIcons
              nameTab={"AppointmentsTab"}
              textInfo="Appointments"
              fontIcon={faCalendar}
              activeTab={activeTab}
              ToggleTabState={(e) => ToggleTabState(e)}
            />
            <NavigationIcons
              nameTab={"PatientsTab"}
              textInfo="Patients"
              fontIcon={faBookMedical}
              activeTab={activeTab}
              ToggleTabState={(e) => ToggleTabState(e)}
            />
            <NavigationIcons
              nameTab={"MetricsTab"}
              textInfo="Metrics"
              fontIcon={faChartBar}
              activeTab={activeTab}
              ToggleTabState={(e) => ToggleTabState(e)}
            />

            <NavigationIcons
              nameTab={"SettingsTab"}
              textInfo="Settings"
              fontIcon={faUserCog}
              activeTab={activeTab}
              ToggleTabState={(e) => ToggleTabState(e)}
            />

            <div className="px-1">
              <span
                id="signOut"
                className="btn btn-sm btn-outline-light"
                onClick={handleShowSignOut}
              >
                <div className="px-2">
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    size="lg"
                    className="text-dark"
                  />
                  <span className="px-1" id="menu_title">
                    Sign Out
                  </span>
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        {activeTab === "AppointmentsTab" && (
          <CalendarScreen loggedInUser={props.loggedInUser} />
        )}
        {activeTab === "PatientsTab" && (
          <PatientsScreen loggedInUser={props.loggedInUser} />
        )}
        {activeTab === "MetricsTab" && (
          <MetricsScreen loggedInUser={props.loggedInUser} />
        )}
        {activeTab === "SettingsTab" && (
          <SettingsScreen loggedInUser={props.loggedInUser} />
        )}
        {activeTab === "signOut" ? handleShowSignOut : null}
      </div>

      {/* sign out modal */}
      <Modal show={showSignOut} onHide={handleCloseSignOut}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Out</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <b>Are you sure you want to sign out?</b>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={signOutHandler}
          >
            Sign out
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={handleCloseSignOut}
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
      {/* end of sign out modal */}
    </div>
  );
};

export default IndexScreen;
