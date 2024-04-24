import React from "react";
//import "./style.css";

export default function OtherData(props) {
  return (
    <div id="otherData">
      Street:
      <input type="text" placeholder={props.userData.street} />
      <br />
      City:
      <input type="text" placeholder={props.userData.city} />
      <br />
      Zip Code:
      <input type="text" placeholder={props.userData.zipcode} />
    </div>
  );
}
