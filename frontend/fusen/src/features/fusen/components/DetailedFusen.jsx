import React, { useEffect, useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

function Fusen(props) {
  const [fusen, setFusen] = useState({
    fusenTitle: props.fusen.title, // タスク名
    fusenMemo: props.fusen.memo, // メモ
    isUrgent: props.fusen.is_urgent, // 急ぎ
    isImportant: props.fusen.is_important, // 重要
    status: props.fusen.status, // 進行ステータス（未着手/進行中/今日やる/完了）
    fusenColor: "bg-base-100", // 付箋の色
    checkpoints: props.fusen.checkpoints, // チェックポイント
  });

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  useEffect(() => {
    setFusen({
      fusenTitle: props.fusen.title,
      fusenMemo: props.fusen.memo,
      isUrgent: props.fusen.is_urgent,
      isImportant: props.fusen.is_important,
      status: props.fusen.status,
      fusenColor: props.fusenColor,
      checkpoints: props.fusen.checkpoints,
      isRemaind: props.isRemaind,
    });
  }, [props]);

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        className={`
          fusen 
          rounded-xl 
          bg-base-200 text-base-content 
          shadow-[4px_4px_0_0] shadow-[#020202]
          border-2 border-[#020202]
          my-3 cursor-pointer 
          ${fusen.fusenColor} 
          hover:border-accent
          hover:shadow-[4px_4px_4px_0]
        `}
        onClick={(e) => props.onClick(e)}
      >
        <div className="card-body relative">
          <h2 className={`${props.titleColor} card-title`}>
            {fusen.isRemaind ? (<span className="material-symbols-outlined text-error">local_fire_department</span>) : ("")}
            {fusen.fusenTitle}
          </h2>
          {fusen && fusen.fusenMemo !== "" ? (
            <p className="bg-base-100 shadow-md rounded-xl p-1 text-sm break-words whitespace-pre-wrap max-h-[18rem] overflow-auto hidden lg:block sbar">
              {fusen.fusenMemo}
            </p>
          ) : (
            ""
          )}
          {fusen && fusen.checkpoints && fusen.checkpoints.length > 0 ? (
            <div className="collapse collapse-open bg-base-100 w-full p-2 shadow-md rounded-xl hidden lg:block">
              <div className="collapse-content p-0">
                <div className="max-h-[18rem] overflow-auto">
                  <table className="table table-xs table-fixed w-full">
                    <tbody>
                      {fusen &&
                        fusen.checkpoints &&
                        fusen.checkpoints.map((checkpoint) => (
                          <tr
                            key={checkpoint.id}
                            id={checkpoint.id}
                            className="w-full"
                          >
                            <td className="text-center w-[3rem]">
                              <input
                                type="checkbox"
                                className="checkbox checkbox-sm"
                                checked={checkpoint.is_checked}
                                disabled={true}
                                readOnly={true}
                              />
                            </td>
                            <td className="text-left text-xs whitespace-pre-wrap">
                              {checkpoint.body}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="flex justify-between">
            <div className="card-actions flex flex-nowrap overflow-auto gap-1">
              {/* fusen.statusによってbadgeを表示を切り替える */}
              {fusen.status === 0 ? (
                <div className="badge badge-warning text-xs whitespace-nowrap">
                  未着手
                </div>
              ) : (
                ""
              )}
              {fusen.status === 1 ? (
                <div className="badge badge-primary text-xs whitespace-nowrap">
                  進行中
                </div>
              ) : (
                ""
              )}
              {fusen.status === 2 ? (
                <div className="badge badge-accent text-xs whitespace-nowrap">
                  今日やる!
                </div>
              ) : (
                ""
              )}
              {fusen.status === 3 ? (
                <div className="badge bg-gray bg-base-300 text-xs whitespace-nowrap">
                  完了
                </div>
              ) : (
                ""
              )}
              {fusen.isImportant ? (
                <div className="badge badge-base text-xs whitespace-nowrap">
                  重要
                </div>
              ) : (
                ""
              )}
              {fusen.isUrgent ? (
                <div className="badge badge-base text-xs whitespace-nowrap">
                  緊急
                </div>
              ) : (
                ""
              )}
            </div>
            {/* fusen.statusが完了の場合ソートハンドルは表示しない） */}
            {fusen.isRemaind ? (
              <div className="">
                <span className="material-symbols-outlined rotated-text">keep</span>
              </div>
            ) : (
              <div className="hidden lg:block">
                {fusen.status !== 3 && (
                  <span className="material-icons cursor-grab" {...listeners}>
                    drag_indicator
                  </span>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}

export default Fusen;
