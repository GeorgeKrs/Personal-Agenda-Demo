import { useState } from "react";
import {
  faArrowAltCircleDown,
  faArrowAltCircleUp,
} from "@fortawesome/free-solid-svg-icons";
import TitleWIcon from "../../GeneralComponents/TitleWIcon";
import AllInformations from "./AllInformations";

const PatientInfo = () => {
  const [openDiv, setOpenDiv] = useState(false);

  const switchDivState = (openDiv: boolean) => {
    setOpenDiv(!openDiv);
  };

  return (
    <div className="container mt-5 px-lg-5">
      <div className="p-3 px-lg-5 border border-info rounded">
        <TitleWIcon
          headText={"Patient Information & Medical History"}
          fontIcon={
            openDiv === true ? faArrowAltCircleUp : faArrowAltCircleDown
          }
          divState={(openDiv) => switchDivState(openDiv)}
          openDiv={openDiv}
        />
        <p className="text-danger">
          *The app fetches the patients data when you drop down the Patient
          Information and Medical history form. <br />
          If you add a patient and the patient information is open, you need to
          reopen the Patient Information form. <br />
          In order for the app to load the new Patient(s)*
        </p>
        <p className="text-danger"></p>
        {openDiv === true ? <AllInformations /> : null}
      </div>
    </div>
  );
};

export default PatientInfo;
