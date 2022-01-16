import { useState } from "react";
import QRCodeImg from "../../assets/QRCodeImg.png";
import TitleWIcon from "../../GeneralComponents/TitleWIcon";
// fonts
import {
  faArrowAltCircleDown,
  faArrowAltCircleUp,
} from "@fortawesome/free-solid-svg-icons";

interface Props {
  loggedInUser: string;
}

const Settings = (props: Props) => {
  const [openDiv, setOpenDiv] = useState(false);
  const switchDivState = (openDiv: boolean) => {
    setOpenDiv(!openDiv);
  };

  return (
    <div className="container px-lg-5 py-3">
      <p className="text-danger">
        You can scan the QR Code to direct to a page, or download information
        about the client. The information could be a business card, a website
        etc.
      </p>
      <div className="p-3 px-lg-5 border border-info rounded">
        <TitleWIcon
          headText={"My Information"}
          fontIcon={
            openDiv === true ? faArrowAltCircleUp : faArrowAltCircleDown
          }
          divState={(openDiv) => switchDivState(openDiv)}
          openDiv={openDiv}
        />
        {openDiv === true ? (
          <div className="mt-4 mb-3 d-flex justify-content-center">
            <img
              className="img-thumbnail"
              src={QRCodeImg}
              alt="Login Icon"
              style={{ height: "200px", width: "200px" }}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Settings;
