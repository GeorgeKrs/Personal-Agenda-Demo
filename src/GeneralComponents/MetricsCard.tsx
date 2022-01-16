interface Props {
  cardTitle: string;
  pilates: string | number;
  swimming: string | number;
  manualTherapy: string | number;
  totalAppointments: string | number;
  bgColor: string;
  divKey: string;
}

const MetricsCard = (props: Props) => {
  return (
    <div className="m-4 card border-dark mb-3">
      <div className={`card-header border-dark  ${props.bgColor}`}>
        <b>{props.cardTitle}</b>
      </div>
      <div className="card-body text-dark">
        <ul className="list-group">
          <li className="list-group-item list-group-item-light">
            Manual Therapy: {props.manualTherapy}
          </li>
          <li className="list-group-item list-group-item-light">
            Pilates: {props.pilates}
          </li>
          <li className="list-group-item list-group-item-light">
            Swimming: {props.swimming}
          </li>
          <hr />
          <li className="list-group-item list-group-item-light">
            <b>Total: {props.totalAppointments}</b>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MetricsCard;
