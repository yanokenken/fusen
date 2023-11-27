import React, { useState } from "react";

function Fusen(props) {
  const [isKyoju, setIsKyoju] = useState(props.isKyoju);

  // const fusenColor = isKyoju === '1' ? 'bg-warning' : props.fusenColor;
  const fusenColor = props.fusenColor;

  return (
    <>
      <div
        className={`card fusen h-52 shadow-sm cursor-pointer ${fusenColor}`}
        onClick={() => document.getElementById("shosai_modal").showModal()}
      >
        <div className="card-body relative">
          <h2 className="card-title">〇〇を△△する</h2>
          <p>xx月xx日までにxxxxxxする</p>
          <div className="card-actions flex flex-nowrap overflow-auto gap-1">
            {props.isKyoju === "1" ? (
              <div className="badge badge-accent">今日中!</div>
            ) : (
              ""
            )}
            {props.isSinkochu === "1" ? (
              <div className="badge badge-info">進行中</div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Fusen;
