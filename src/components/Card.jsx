import "./Card.css";
import { FaCircle } from "react-icons/fa";
import UserIcon from "./icon";

const Card = ({ ticket, user, icon, statusIcon, statusColor, bgColor }) => {
  const initials = user?.name
    .split(" ")
    .map((word) => word[0])
    .join(""); 

  const displayStatusIcon = statusIcon ? (
    <span style={{ color: statusColor }}>{statusIcon}</span>
  ) : null;

  return (
    <div className="card">
      <div className="card_header">
        <p className="card_id" style={{color:"grey"}}>{ticket?.id}</p>
        {user && (
          <UserIcon
            intials={initials}
            available={user?.available}
            bgColor={bgColor}
          />
        )}
      </div>
      <div className="card_info">
        {displayStatusIcon}
        <p>{ticket?.title}</p>
      </div>
      <div className="card_footer">
        {icon && (
          <div>
            {icon}
          </div>
        )}
        <div className="card_tag">
          <FaCircle />
          {ticket?.tag.map((tag, index) => (
            <p key={index}>{tag}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;