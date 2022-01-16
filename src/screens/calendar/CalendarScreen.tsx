// react imports
import { useState, useEffect } from "react";
// screens imports
import Calendar from "react-calendar";
import NewAppointment from "./NewAppointment";
import DailyAppointments from "./DailyAppointments";
import AppointmentCategories from "./AppointmentCategories";
import NoAppointments from "./NoAppointments";
// css and font imports
import "../../styles/calendar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
// import firebase
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../../utils/firebase";

interface Props {
  loggedInUser: string;
}

const CalendarScreen = (props: Props) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [displayDate, setDisplayDate] = useState(new Date().toString());

  const [currentMonth, setCurrentMonth] = useState(12);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const [workDays, setWorkDays] = useState([]);
  const [workDaysLoader, setWorkDaysLoader] = useState(true);

  const [appointmentsLoader, setAppointmentsLoader] = useState(true);
  const [todaysAppointments, setTodaysAppointments] = useState([]);

  const Arr_TodaysAppointments: any = [];
  const Arr_workDays: any = [];

  // fetch appointments
  const fetchAppointments = async () => {
    setAppointmentsLoader(true);

    const DateFrom = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      0,
      0,
      1
    );

    const DateTo = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      23,
      59,
      59
    );

    const appointmentsQuery = query(
      collection(db, "Appointments"),
      where("startTime", ">=", DateFrom),
      where("startTime", "<=", DateTo),
      orderBy("startTime", "asc")
    );

    const querySnapshot = await getDocs(appointmentsQuery);
    querySnapshot.forEach((doc) => {
      Arr_TodaysAppointments.push(doc.data());
    });
    setTodaysAppointments(Arr_TodaysAppointments);
  };

  const fetchWorkDays = async () => {
    const DateFrom = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      0
    );

    const DateTo = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      31
    );

    const workDaysQuery = query(
      collection(db, "Appointments"),
      where("startTime", ">=", DateFrom),
      where("startTime", "<=", DateTo),
      orderBy("startTime", "asc")
    );

    const queryWorkDays = await getDocs(workDaysQuery);
    queryWorkDays.forEach((doc) => {
      Arr_workDays.push(doc.data().startTime.toDate().getDate());
    });
    setWorkDays(Arr_workDays);
  };

  // listener to know when there are changes to the records
  const [changesOnRecords, setChangesOnRecords] = useState(false);
  const ToggleRecordsState = () => {
    setChangesOnRecords(true);
  };

  useEffect(() => {
    setAppointmentsLoader(true);
    fetchAppointments().then(() => {
      setAppointmentsLoader(false);
    });
    const day = selectedDate.getDate();
    const month = selectedDate.getMonth() + 1;
    const year = selectedDate.getFullYear();

    const FullDate = day + "/" + month + "/" + year;
    setDisplayDate(FullDate);

    setSelectedMonth(selectedDate.getMonth());
  }, [selectedDate]);

  useEffect(() => {
    if (changesOnRecords === true) {
      setAppointmentsLoader(true);
      fetchAppointments().then(() => {
        setAppointmentsLoader(false);
        setChangesOnRecords(false);
      });
      fetchWorkDays();
    }
  }, [changesOnRecords]);

  useEffect(() => {
    setWorkDaysLoader(true);
    if (currentMonth !== selectedMonth) {
      fetchWorkDays().then(() => setWorkDaysLoader(false));
      setCurrentMonth(selectedMonth);
    }
  }, [selectedMonth]);

  return (
    <div className="container">
      <div className="row p-3">
        <p className="text-danger">
          *The app fetches only the monthly appointments for performance issues.
          If you need to see the appointments from another month, please select
          a random date from the desired month you want to see the
          appointments.*
        </p>
        <div className="col-lg-4 col-md-12 col-sm-12 text-center mb-5">
          <Calendar
            className={"w-100"}
            calendarType={"US"}
            next2Label={null}
            prev2Label={null}
            onClickDay={setSelectedDate}
            value={selectedDate}
            tileContent={({ date, view }) =>
              workDaysLoader === true ? null : view === "month" &&
                date.getMonth() === selectedDate.getMonth() &&
                date.getFullYear() === selectedDate.getFullYear() &&
                (date.getDate() === workDays[0] ||
                  date.getDate() === workDays[1] ||
                  date.getDate() === workDays[2] ||
                  date.getDate() === workDays[3] ||
                  date.getDate() === workDays[4] ||
                  date.getDate() === workDays[5] ||
                  date.getDate() === workDays[6] ||
                  date.getDate() === workDays[7] ||
                  date.getDate() === workDays[8] ||
                  date.getDate() === workDays[9] ||
                  date.getDate() === workDays[10] ||
                  date.getDate() === workDays[11] ||
                  date.getDate() === workDays[12] ||
                  date.getDate() === workDays[13] ||
                  date.getDate() === workDays[14] ||
                  date.getDate() === workDays[15] ||
                  date.getDate() === workDays[16] ||
                  date.getDate() === workDays[17] ||
                  date.getDate() === workDays[18] ||
                  date.getDate() === workDays[19] ||
                  date.getDate() === workDays[20] ||
                  date.getDate() === workDays[21] ||
                  date.getDate() === workDays[22] ||
                  date.getDate() === workDays[23] ||
                  date.getDate() === workDays[24] ||
                  date.getDate() === workDays[25] ||
                  date.getDate() === workDays[26] ||
                  date.getDate() === workDays[27] ||
                  date.getDate() === workDays[28] ||
                  date.getDate() === workDays[29] ||
                  date.getDate() === workDays[30]) ? (
                <div>
                  <FontAwesomeIcon
                    icon={faBookmark}
                    style={{ color: "var(--bs-danger)" }}
                  />
                </div>
              ) : (
                <div></div>
              )
            }
          />
          <NewAppointment
            displayDate={displayDate}
            selectedDate={selectedDate}
            ToggleRecordsState={() => ToggleRecordsState()}
          />
          <AppointmentCategories />
        </div>
        <div className="offset-lg-1 col-lg-7">
          <h5 className="mb-4">Selected Date: {displayDate}</h5>

          {appointmentsLoader === true ? (
            <div>
              <hr />
              <div className="d-flex justify-content-center">
                <span className="my-auto spinner-border spinner-border-sm" />
                <h6 className="px-1 my-auto">Fetching Daily Appointments..</h6>
              </div>
            </div>
          ) : todaysAppointments.length === 0 ? (
            <NoAppointments />
          ) : (
            todaysAppointments.map((specObject, index) => (
              <DailyAppointments
                key={index}
                recordObject={specObject}
                recordIndex={index}
                ToggleRecordsState={() => ToggleRecordsState()}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarScreen;
