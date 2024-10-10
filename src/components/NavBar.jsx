import "./NavBar.css";
import { MdOutlineTune } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa6";
import { useState, useEffect, useRef } from "react";

const groupOptions = [
  { label: "Status", value: "status" },
  { label: "User", value: "user" },
  { label: "Priority", value: "priority" },
];
const orderOptions = [
  { label: "Priority", value: "priority" },
  { label: "Title", value: "title" },
];

const Navbar = ({ group, order, onGroupchange, onOrderChange }) => {
  const [isExpanded, toggleExpand] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(group);
  const [selectedOrder, setSelectedOrder] = useState(order);
  const dropdownRef = useRef(null);
  const handleGroupChange = (e) => {
    const newGroup = e.target.value;
    setSelectedGroup(newGroup);
    onGroupchange(newGroup); 
  };
  const handleOrderChange = (e) => {
    const newOrder = e.target.value;
    setSelectedOrder(newOrder);
    onOrderChange(newOrder); 
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        toggleExpand(false); 
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="nav">
      <div
        className="expand_btn"
        onClick={() => {
          toggleExpand((prevState) => !prevState);
        }}
      >
        <MdOutlineTune />
        <span>Display</span>
        <FaAngleDown />
      </div>
      {isExpanded && (
        <div className="dropdown" ref={dropdownRef}>
          <div className="display">
            <p>Grouping</p>
            <select
              name="group"
              id="groupBy"
              value={selectedGroup}
              onChange={handleGroupChange}
            >
              {groupOptions.map((opt, idx) => (
                <option key={idx} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div className="display">
            <p>Ordering</p>
            <select
              name="order"
              id="orderBy"
              value={selectedOrder}
              onChange={handleOrderChange}
            >
              {orderOptions.map((opt, idx) => (
                <option key={idx} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;