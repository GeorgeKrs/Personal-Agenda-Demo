interface Props {
  cardTitle: string;
  earnings: number | string;
  bgColor: string;
  divKey: string;
}

const EarningsCard = (props: Props) => {
  return (
    <div className="m-3 card border-dark mb-3">
      <div className={`card-header border-dark  ${props.bgColor}`}>
        <b>{props.cardTitle}</b>
      </div>
      <div className="card-body text-dark">
        <ul className="list-group">
          <li className="list-group-item list-group-item-light">
            Earnings: {props.earnings}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EarningsCard;
