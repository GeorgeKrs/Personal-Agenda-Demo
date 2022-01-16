import MetricsCard from "../../GeneralComponents/MetricsCard";

interface Props {
  yearMetrics: any;
}

const AppointmentsMetrics = (props: Props) => {
  return (
    <div>
      <div
        className="d-flex flex-wrap justify-content-center"
        key="MonthsStatus"
      >
        {props.yearMetrics.map((month: any) => (
          <MetricsCard
            cardTitle={month.monthName}
            pilates={month.Pilates}
            swimming={month.Swimming}
            manualTherapy={month.Manual}
            divKey={month.monthValue}
            totalAppointments={month.totalAppointments}
            bgColor={"bg-info"}
          />
        ))}
      </div>
      <div className="mt-4">
        <hr />
        <div className="mt-3">
          <b>
            Total Appointments:
            <span className="px-1">
              {props.yearMetrics[0].totalAppointments +
                props.yearMetrics[1].totalAppointments +
                props.yearMetrics[2].totalAppointments +
                props.yearMetrics[3].totalAppointments +
                props.yearMetrics[4].totalAppointments +
                props.yearMetrics[5].totalAppointments +
                props.yearMetrics[6].totalAppointments +
                props.yearMetrics[7].totalAppointments +
                props.yearMetrics[8].totalAppointments +
                props.yearMetrics[9].totalAppointments +
                props.yearMetrics[10].totalAppointments +
                props.yearMetrics[11].totalAppointments}
            </span>
          </b>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsMetrics;
