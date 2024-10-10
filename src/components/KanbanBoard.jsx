import "./KanbanBoard.css";
import { IoMdAdd } from "react-icons/io";
import { SlOptions } from "react-icons/sl";
import Card from "./Card";
import UserIcon from "./icon";
import {
  generateIntials,
  getRandomColor,
  priorities,
  statusIcons,
} from "../ContentData/content";

const Board = (props) => {
  const { tickets, users, group, level, userId, order, data } = props;

  let ticketLimit = tickets.length; 
  let ticketList = [...tickets]; 

  let filteredTickets = [];

  if (group === "status") {
    filteredTickets = ticketList.filter(
      (ticket) => ticket.status.toLowerCase() === data.title.toLowerCase()
    );
  } else if (group === "priority") {
    filteredTickets = ticketList.filter((ticket) => ticket.priority === level);
  } else {
    filteredTickets = ticketList.filter((ticket) => ticket.userId === userId);
  }
  if (order === "priority") {
    filteredTickets = filteredTickets
      .slice(0, ticketLimit)
      .sort((a, b) => b.priority - a.priority); 
  } else {
    filteredTickets = filteredTickets
      .slice(0, ticketLimit)
      .sort((a, b) => a.title.localeCompare(b.title));
  }
  if (group === "user") {
    return (
      <div className="board">
        <div className="board_top">
          <div className="board_top_name">
            <span>
              <UserIcon
                intials={generateIntials(data?.name)}
                available={data?.available}
                bgColor={getRandomColor()}
              />
            </span>
            <p>{data?.name}</p>
            <span>{filteredTickets.length}</span>
          </div>
          <div className="board_top_options">
            <IoMdAdd />
            <SlOptions />
          </div>
        </div>
        <div className="board_container" style={{}}>
          {
            filteredTickets.map((ticket) => (
              <Card
                ticket={ticket}
                key={ticket.id}
                icon={priorities[ticket?.priority].icon}
                group={group}
                statusIcon={statusIcons[ticket?.status.toLowerCase()]?.icon}
                statusColor={statusIcons[ticket?.status.toLowerCase()]?.color}
                bgColor={getRandomColor()} 
              />
            ))
          }
        </div>
      </div>
    );
  }
  if (group === "priority") {
    return (
      <div className="board">
        <div className="board_top">
          <div className="board_top_name">
            <span style={{ color: data.color }}>{data.icon}</span>
            <p>{data.title}</p>
            <span>{filteredTickets.length}</span>
          </div>
          <div className="board_top_options">
            <IoMdAdd />
            <SlOptions />
          </div>
        </div>
        <div className="board_container">
          {filteredTickets.map((ticket) => {
            const assignedUser = users?.find((u) => u.id === ticket.userId); 
            return (
              <Card
                ticket={ticket}
                key={ticket.id}
                user={assignedUser}
                group={group}
                statusIcon={statusIcons[ticket?.status.toLowerCase()]?.icon}
                statusColor={statusIcons[ticket?.status.toLowerCase()]?.color}
                bgColor={getRandomColor()}
                icon=""
              />
            );
          })}
        </div>
      </div>
    );
  }
  return (
    <div className="board">
      <div className="board_top">
        <div className="board_top_name">
          <span style={{ color: data.color }}>{data.icon}</span>
          <p>{data.title}</p>
          <span>{filteredTickets.length}</span>
        </div>
        <div className="board_top_options">
          <IoMdAdd />
          <SlOptions />
        </div>
      </div>
      <div className="board_container">
        {filteredTickets.map((ticket) => {
          const ticketOwner = users?.find((u) => u.id === ticket.userId); 
          return (
            <Card
              ticket={ticket}
              key={ticket.id}
              statusIcon=""
              icon={priorities[ticket?.priority]?.icon}
              user={ticketOwner}
              group={group}
              bgColor={getRandomColor()}
              statusColor=""
            />
          );
        })}
      </div>
    </div>
  );
};

export default Board;