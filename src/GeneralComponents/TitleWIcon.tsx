import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  headText: string;
  fontIcon: IconProp;
  openDiv: boolean;
  divState: (openDiv: boolean) => void;
}

const TitleWIcon = (props: Props) => {
  return (
    <h5 className="h5-headings">
      {props.headText}
      <span className="px-2">
        <button
          className=" btn btn-sm btn-outline-dark"
          onClick={() => props.divState(props.openDiv)}
        >
          <FontAwesomeIcon
            icon={props.fontIcon}
            style={{ color: "var(--bs-info)" }}
            size="lg"
          />
        </button>
      </span>
    </h5>
  );
};

export default TitleWIcon;
