import "./icon.css";
import { FaCircle } from "react-icons/fa6";

const UserIcon = ({ intials, available, bgColor }) => {
  console.log("User Availability:", available);
  console.log("Background Color:", bgColor);

  const dotStyle = available ? { color: "#50B053" } : { color: "#C4C4C4" };

  return (
    <div className="user">
      <div className="user_icon" style={{ backgroundColor: bgColor }}>
        {intials}
      </div>
      <div className="dot" style={dotStyle}>
        <FaCircle />
      </div>
    </div>
  );
};

export default UserIcon;
