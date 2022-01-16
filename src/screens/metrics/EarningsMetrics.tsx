import EarningsCard from "../../GeneralComponents/EarningsCard";
// font icons
import { faEuroSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  yearMetrics: any;
}

const EarningsMetrics = (props: Props) => {
  return (
    <div>
      <div
        className="d-flex flex-wrap justify-content-center"
        key="MonthsStatus"
      >
        {props.yearMetrics.map((month: any) => (
          <EarningsCard
            cardTitle={month.monthName}
            divKey={month.monthValue}
            earnings={month.Earnings}
            bgColor={"bg-info"}
          />
        ))}
      </div>
      <div className="mt-4">
        <hr />
        <div className="mt-3">
          <b>
            Total Earnings:
            <span className="px-1">
              {(
                props.yearMetrics[0].Earnings +
                props.yearMetrics[1].Earnings +
                props.yearMetrics[2].Earnings +
                props.yearMetrics[3].Earnings +
                props.yearMetrics[4].Earnings +
                props.yearMetrics[5].Earnings +
                props.yearMetrics[6].Earnings +
                props.yearMetrics[7].Earnings +
                props.yearMetrics[8].Earnings +
                props.yearMetrics[9].Earnings +
                props.yearMetrics[10].Earnings +
                props.yearMetrics[11].Earnings
              ).toFixed(2)}

              <FontAwesomeIcon
                icon={faEuroSign}
                style={{ color: "var(--bs-dark)" }}
              />
            </span>
          </b>
        </div>
      </div>
    </div>
  );
};

export default EarningsMetrics;
