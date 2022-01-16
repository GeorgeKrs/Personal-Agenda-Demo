import { useState, useEffect } from "react";
import AppointmentsMetrics from "./AppointmentsMetrics";
import EarningsMetrics from "./EarningsMetrics";
import GraphEarnings from "./GraphEarnings";
// firebase
import { collection, query, getDocs, where, orderBy } from "firebase/firestore";
import { db } from "../../utils/firebase";
// font icons
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// bootstrap
import { Modal } from "react-bootstrap";

interface Props {
  loggedInUser: string;
}

const MetricsScreen = (props: Props) => {
  const currentYear = new Date().getFullYear();
  const [yearlyDataLoader, setYearlyDataLoader] = useState(true);

  const [yearMetrics, setYearMetrics] = useState<any>([]);
  const [graphData, setGraphData] = useState<any>([]);

  const [unlockMetrics, setUnlockMetrics] = useState(false);

  const [password, setPassword] = useState("");

  let allMonthsData = [
    {
      monthKey: "Jan",
      monthName: "January",
      totalAppointments: 0,
      Pilates: 0,
      Swimming: 0,
      Manual: 0,
      Earnings: 0,
    },
    {
      monthKey: "Feb",
      monthName: "February",
      totalAppointments: 0,
      Pilates: 0,
      Swimming: 0,
      Manual: 0,
      Earnings: 0,
    },
    {
      monthKey: "Mar",
      monthName: "March",
      totalAppointments: 0,
      Pilates: 0,
      Swimming: 0,
      Manual: 0,
      Earnings: 0,
    },
    {
      monthKey: "Apr",
      monthName: "April",
      totalAppointments: 0,
      Pilates: 0,
      Swimming: 0,
      Manual: 0,
      Earnings: 0,
    },
    {
      monthKey: "May",
      monthName: "May",
      totalAppointments: 0,
      Pilates: 0,
      Swimming: 0,
      Manual: 0,
      Earnings: 0,
    },
    {
      monthKey: "Jun",
      monthName: "June",
      totalAppointments: 0,
      Pilates: 0,
      Swimming: 0,
      Manual: 0,
      Earnings: 0,
    },
    {
      monthKey: "Jul",
      monthName: "July",
      totalAppointments: 0,
      Pilates: 0,
      Swimming: 0,
      Manual: 0,
      Earnings: 0,
    },
    {
      monthKey: "Aug",
      monthName: "August",
      totalAppointments: 0,
      Pilates: 0,
      Swimming: 0,
      Manual: 0,
      Earnings: 0,
    },
    {
      monthKey: "Sept",
      monthName: "September",
      totalAppointments: 0,
      Pilates: 0,
      Swimming: 0,
      Manual: 0,
      Earnings: 0,
    },
    {
      monthKey: "Oct",
      monthName: "October",
      totalAppointments: 0,
      Pilates: 0,
      Swimming: 0,
      Manual: 0,
      Earnings: 0,
    },
    {
      monthKey: "Nov",
      monthName: "November",
      totalAppointments: 0,
      Pilates: 0,
      Swimming: 0,
      Manual: 0,
      Earnings: 0,
    },
    {
      monthKey: "Dec",
      monthName: "December",
      totalAppointments: 0,
      Pilates: 0,
      Swimming: 0,
      Manual: 0,
      Earnings: 0,
    },
  ];

  const fetchMonthlyData = async () => {
    const DateFrom = new Date(currentYear, 0, 0, 0, 0, 0);
    const DateTo = new Date(currentYear, 11, 31, 23, 59, 59);

    const monthMetrics = query(
      collection(db, "Appointments"),
      where("startTime", ">=", DateFrom),
      where("startTime", "<=", DateTo),
      orderBy("startTime", "desc")
    );
    const queryHistorySnapshot = await getDocs(monthMetrics);
    queryHistorySnapshot.forEach((doc) => {
      const month = doc.data().startTime.toDate().getMonth();
      const category = doc.data().category;

      allMonthsData[month].totalAppointments += 1;

      if (isNaN(allMonthsData[month].Earnings)) {
        allMonthsData[month].Earnings += 0;
      } else {
        allMonthsData[month].Earnings += parseFloat(doc.data().fee);
      }

      if (category === "Manual Therapy") {
        allMonthsData[month].Manual += 1;
      } else if (category === "Pilates") {
        allMonthsData[month].Pilates += 1;
      } else {
        allMonthsData[month].Swimming += 1;
      }
    });

    setYearMetrics(allMonthsData);

    setGraphData([
      {
        month: allMonthsData[0].monthKey,
        Earnings: allMonthsData[0].Earnings,
      },
      {
        month: allMonthsData[1].monthKey,
        Earnings: allMonthsData[1].Earnings,
      },
      {
        month: allMonthsData[2].monthKey,
        Earnings: allMonthsData[2].Earnings,
      },
      {
        month: allMonthsData[3].monthKey,
        Earnings: allMonthsData[3].Earnings,
      },
      {
        month: allMonthsData[4].monthKey,
        Earnings: allMonthsData[4].Earnings,
      },
      {
        month: allMonthsData[5].monthKey,
        Earnings: allMonthsData[5].Earnings,
      },
      {
        month: allMonthsData[6].monthKey,
        Earnings: allMonthsData[6].Earnings,
      },
      {
        month: allMonthsData[7].monthKey,
        Earnings: allMonthsData[7].Earnings,
      },
      {
        month: allMonthsData[8].monthKey,
        Earnings: allMonthsData[8].Earnings,
      },
      {
        month: allMonthsData[9].monthKey,
        Earnings: allMonthsData[9].Earnings,
      },
      {
        month: allMonthsData[10].monthKey,
        Earnings: allMonthsData[10].Earnings,
      },
      {
        month: allMonthsData[11].monthKey,
        Earnings: allMonthsData[11].Earnings,
      },
    ]);
  };

  // password modal
  const [passwordModal, setPasswordModal] = useState(false);
  const handleClose = () => setPasswordModal(false);
  const handleOpen = () => setPasswordModal(true);

  useEffect(() => {
    fetchMonthlyData().then(() => setYearlyDataLoader(false));
  }, []);

  useEffect(() => {
    if (password === "metrics12345") {
      handleClose();
      setUnlockMetrics(true);
    } else {
      setUnlockMetrics(false);
    }
  }, [password]);

  return (
    <div className="mb-5 py-3 container px-lg-5" style={{ minHeight: "100vh" }}>
      <h5>
        <b>
          <u>My appointments:</u>
        </b>
      </h5>
      <div className="p-3 px-lg-5 border border-info rounded">
        {yearlyDataLoader === true ? (
          <div className="mt-4 mb-4 bg-light d-flex justify-content-center">
            <span className="my-auto spinner-border spinner-border-sm" />
            <h6 className="px-1 my-auto">Fetching Data..</h6>
          </div>
        ) : (
          <div>
            <AppointmentsMetrics yearMetrics={yearMetrics} />
          </div>
        )}
      </div>
      <div className="mt-5 ">
        <h5>
          <b>
            <u>
              My Earnings:
              <span className="px-1">
                <button
                  className={
                    unlockMetrics === false
                      ? "btn btn-sm btn-outline-dark"
                      : "btn btn-sm btn-dark"
                  }
                  onClick={
                    unlockMetrics === false
                      ? handleOpen
                      : () => setUnlockMetrics(false)
                  }
                >
                  <FontAwesomeIcon
                    icon={unlockMetrics === false ? faEye : faEyeSlash}
                    style={{ color: "var(--bs-info)" }}
                  />
                </button>
              </span>
            </u>
          </b>
        </h5>
        <div className="p-3 px-lg-5 border border-info rounded">
          {yearlyDataLoader === true ? (
            <div className="mt-4 mb-4 bg-light d-flex justify-content-center">
              <span className="my-auto spinner-border spinner-border-sm" />
              <h6 className="px-1 my-auto">Fetching Data..</h6>
            </div>
          ) : (
            <div className={unlockMetrics === true ? "" : "blurred-div"}>
              {/* <div>
                <EarningsMetrics yearMetrics={yearMetrics} />
              </div> */}
              <div>
                <GraphEarnings
                  graphData={graphData}
                  yearMetrics={yearMetrics}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      {/* password modal */}
      <Modal show={passwordModal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Access Earnings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>Password:</h6>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="mt-1 text-danger">*metrics12345</p>
        </Modal.Body>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={handleClose}
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
      {/* end of password meeting modal */}
    </div>
  );
};

export default MetricsScreen;
