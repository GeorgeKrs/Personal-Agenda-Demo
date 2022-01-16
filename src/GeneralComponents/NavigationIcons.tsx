import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  nameTab: string;
  activeTab: string;
  textInfo: string;
  fontIcon: IconProp;
  ToggleTabState: (tabId: string) => void;
}

const NavigationIcons = (props: Props) => {
  return (
    <div className="px-1">
      <span
        id={props.nameTab}
        className={
          props.activeTab === props.nameTab
            ? "btn btn-sm btn-light"
            : "btn btn-sm btn-outline-light"
        }
        onClick={() => props.ToggleTabState(props.nameTab)}
      >
        <div className="">
          <FontAwesomeIcon
            icon={props.fontIcon}
            size="lg"
            className="text-dark"
          />
          <span className="px-1" id="menu_title">
            {props.textInfo}
          </span>
        </div>
      </span>
    </div>
  );
};

export default NavigationIcons;
