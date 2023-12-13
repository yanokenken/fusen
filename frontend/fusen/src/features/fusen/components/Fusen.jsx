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
      fusenColor: "bg-base-100",
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
          <p className="break-words whitespace-pre-wrap">{fusen.fusenMemo}</p>
          <div className="card-actions flex flex-nowrap overflow-auto gap-1">
            {/* fusen.statusによってbadgeを表示を切り替える */}
            {fusen.status === 0 ? (
              <div className="badge badge-zantei text-xs whitespace-nowrap">未着手</div>
            ) : (
              ""
            )}
            {fusen.status === 1 ? (
              <div className="badge badge-primary text-xs whitespace-nowrap">進行中</div>
            ) : (
              ""
            )}
            {fusen.status === 2 ? (
              <div className="badge badge-accent text-xs whitespace-nowrap">今日やる!</div>
            ) : (
              ""
            )}
            {fusen.status === 3 ? (
              <div className="badge badge-success text-xs whitespace-nowrap">完了</div>
            ) : (
              ""
            )}
            {fusen.isUrgent ? (
              <div className="badge badge-error text-xs whitespace-nowrap">緊急</div>
            ) : (
              ""
            )}
            {fusen.isImportant ? (
              <div className="badge badge-warning text-xs whitespace-nowrap">重要</div>
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
