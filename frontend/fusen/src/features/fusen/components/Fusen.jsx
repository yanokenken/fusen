import React, { useEffect, useState } from "react";

function Fusen(props) {
  const [fusen, setFusen] = useState({
    fusenTitle: props.fusen.fusenTitle, // タスク名
    fusenMemo: props.fusen.fusenMemo, // メモ
    isUrgent: props.fusen.isUrgent, // 急ぎ
    isImportant: props.fusen.isImportant, // 重要
    status: props.fusen.status, // 進行ステータス（未着手/進行中/今日やる/完了）
    fusenColor: "fusen3", // 付箋の色
    checkpoints: props.fusen.checkpoints, // チェックポイント
  });

  useEffect(() => {
    setFusen({
      fusenTitle: props.fusen.fusenTitle,
      fusenMemo: props.fusen.fusenMemo,
      isUrgent: props.fusen.isUrgent,
      isImportant: props.fusen.isImportant,
      status: props.fusen.status,
      fusenColor: "fusen3",
      checkpoints: props.fusen.checkpoints,
    });
  }, [props]);

  return (
    <>
      <div
        className={`card fusen h-52 shadow-sm cursor-pointer ${fusen.fusenColor}`}
        onClick={(e) => props.onClick(e)}
      >
        <div className="card-body relative">
          <h2 className="card-title">{fusen.fusenTitle}</h2>
          <p>{fusen.fusenMemo}</p>
          <div className="card-actions flex flex-nowrap overflow-auto gap-1">
            {/* fusen.statusによってbadgeを表示を切り替える */}
            {fusen.status === 0 ? (
              <div className="badge badge-zantei">未着手</div>
            ) : (
              ""
            )}
            {fusen.status === 1 ? (
              <div className="badge badge-primary">進行中</div>
            ) : (
              ""
            )}
            {fusen.status === 2 ? (
              <div className="badge badge-accent">今日やる!</div>
            ) : (
              ""
            )}
            {fusen.status === 3 ? (
              <div className="badge badge-success">完了</div>
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
