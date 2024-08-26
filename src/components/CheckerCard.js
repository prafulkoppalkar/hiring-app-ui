import { TIC_MARK } from "../constants/generalConstants";
import Icon from "./Icon";

const CheckerCard = ({ title, description, footerText }) => {
  return (
    <div className="availability-card full-time">
      <div className="availability-card-header">
        <p>{title}</p>
        <span className="tick-icon">
          <Icon name={TIC_MARK} />
        </span>
      </div>
      <p>{description}</p>
      <div className="availability-card-header">
        <p>{footerText}</p>
      </div>
    </div>
  );
};

export default CheckerCard;
