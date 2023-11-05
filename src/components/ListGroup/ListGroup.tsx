import { useState } from "react";
import "./ListGroup.css";

//interface
interface Props {
  items: string[];
  heading: string;
  onSelectItem: (item: string) => void;
}

function ListGroup({ items, heading, onSelectItem }: Props) {
  //useState hook
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <>
      <h1>{heading}</h1>
      {items.length === 0 ? (
        <p>No items Found</p>
      ) : (
        <ul className="list-group">
          {items.map((item, index) => (
            <li
              key={index}
              className={
                selectedIndex === index
                  ? "list-group-item active"
                  : "list-group-item "
              }
              onClick={() => {
                setSelectedIndex(index);
                onSelectItem(item);
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
      ;
    </>
  );
}

export default ListGroup;
