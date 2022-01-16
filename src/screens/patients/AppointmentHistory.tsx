interface Props {
  patientHistory: any;
}

const AppointmentHistory = (props: Props) => {
  return (
    <div>
      <div id="dataOnPC" className="table-responsive-sm ">
        <table className="table table-striped border ">
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Start </th>
              <th>End </th>
              <th>Fee</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            {props.patientHistory.map((specObject: any, index: number) => (
              <tr key={index}>
                <td>
                  {specObject.startTime.toDate().getDate() +
                    "/" +
                    (specObject.startTime.toDate().getMonth() + 1) +
                    "/" +
                    specObject.startTime.toDate().getFullYear()}
                </td>
                <td>{specObject.category}</td>
                <td>
                  {(specObject.startTime.toDate().getHours() < 10
                    ? "0" + specObject.startTime.toDate().getHours()
                    : specObject.startTime.toDate().getHours()) +
                    ":" +
                    (specObject.startTime.toDate().getMinutes() < 10
                      ? "0" + specObject.startTime.toDate().getMinutes()
                      : specObject.startTime.toDate().getMinutes())}
                </td>
                <td>
                  {(specObject.endTime.toDate().getHours() < 10
                    ? "0" + specObject.endTime.toDate().getHours()
                    : specObject.endTime.toDate().getHours()) +
                    ":" +
                    (specObject.endTime.toDate().getMinutes() < 10
                      ? "0" + specObject.endTime.toDate().getMinutes()
                      : specObject.endTime.toDate().getMinutes())}
                </td>
                <td>{isNaN(specObject.fee) ? 0 : specObject.fee}</td>
                <td>{specObject.comments}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div id="dataOnMob">
        {props.patientHistory.map((specObject: any, index: number) => (
          <ul className="mt-4 list-group" key={index}>
            <li className="list-group-item bg-info">
              <b>
                Date:
                {specObject.startTime.toDate().getDate() +
                  "/" +
                  (specObject.startTime.toDate().getMonth() + 1) +
                  "/" +
                  specObject.startTime.toDate().getFullYear()}
              </b>
            </li>
            <li className="list-group-item">
              <b>Category:</b> {specObject.category}
            </li>
            <li className="list-group-item">
              <b>Start:</b>{" "}
              {(specObject.startTime.toDate().getHours() < 10
                ? "0" + specObject.startTime.toDate().getHours()
                : specObject.startTime.toDate().getHours()) +
                ":" +
                (specObject.startTime.toDate().getMinutes() < 10
                  ? "0" + specObject.startTime.toDate().getMinutes()
                  : specObject.startTime.toDate().getMinutes())}
            </li>
            <li className="list-group-item">
              <b>End:</b>{" "}
              {(specObject.endTime.toDate().getHours() < 10
                ? "0" + specObject.endTime.toDate().getHours()
                : specObject.endTime.toDate().getHours()) +
                ":" +
                (specObject.endTime.toDate().getMinutes() < 10
                  ? "0" + specObject.endTime.toDate().getMinutes()
                  : specObject.endTime.toDate().getMinutes())}
            </li>
            <li className="list-group-item">
              <b>Fee:</b> {isNaN(specObject.fee) ? 0 : specObject.fee}
            </li>
            <li className="list-group-item">
              <b>Comments:</b> {specObject.comments}
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default AppointmentHistory;
