// useStateを使う
import React, { useEffect, useState } from "react";
import LabelCheckbox from "../../../components/LabelCheckbox";
import { generateNanoId } from "../../../utils/generateId";
function FusenModal(props) {
  const [isEditMode, setIsEditMode] = useState(false);
  // チェックポイントモックデータ
  const [checkpoints, setCheckpoints] = useState([
    { id: '1abcd', text: "〇〇を調査" },
    { id: '2abcd', text: "〇〇に確認してもらう" },
    { id: '3abcd', text: "〇〇を作成" },
  ]);
  const addCheckPoint = () => {
    console.log("addCheckPoint");
    const id = generateNanoId(5);
    setCheckpoints((prevCheckpoints) => [
      ...prevCheckpoints,
      { id: id, name: "" },
    ]);
  };
  const handleInputChange = (e, id) => {
    const { value } = e.target;
    setCheckpoints(
      checkpoints.map((checkpoint) =>
        checkpoint.id === id ? { ...checkpoint, text: value } : checkpoint
      )
    );
  };
  const deleteCP = (e) => {
    const id = e.target.closest("tr").id;
    console.log("id: ", id);
    setCheckpoints(checkpoints.filter((checkpoint) => checkpoint.id !== id));
  };

  return (
    <dialog id={props.modalId} className="modal">
      <div className="modal-box">
        <label className="label">
          <span className="label-text">タスク名（必須）</span>
        </label>
        <input
          type="text"
          className={`input input-bordered w-full mb-4 mt-4 lg:mt-0 `}
          placeholder="タスク名（必須）"
          value={props.title}
          disabled={isEditMode ? "" : "disabled"}
        />
        <div className="form-control">
          <label className="label">
            <span className="label-text">メモ（任意）</span>
          </label>
          <textarea
            className={`textarea textarea-bordered h-24`}
            placeholder="Bio"
            disabled={isEditMode ? "" : "disabled"}
            defaultValue={props.memo}
          />
        </div>

        <div className="form-control w-full flex mb-4">
          <LabelCheckbox label="重要" />
          <LabelCheckbox label="今日中" />
          <LabelCheckbox label="急ぎ" />
        </div>

        <div className="collapse collapse-open bg-base-200 w-full mb-4">
          <div className="collapse-title text-md font-medium">
            チェックポイント（任意）
          </div>
          <div className="collapse-content p-0">
            <div className="ps-2 max-h-[35vh] overflow-auto">
              <table className="table table-xs">
                <tbody>
                  {checkpoints.map((checkpoint) => (
                    <tr key={checkpoint.id} id={checkpoint.id}>
                      <td className="text-left">
                        <label
                          className={`label cursor-pointer block ${
                            isEditMode ? "hidden" : ""
                          }`}
                        >
                          <input type="checkbox" className="checkbox" />
                        </label>
                      </td>
                      <td>
                        <span>{checkpoint.id}</span>
                        <input
                          type="text"
                          className="input input-sm input-bordered w-full max-w-xs"
                          placeholder="チェックポイント"
                          defaultValue={checkpoint.text}
                          onChange={(e) => handleInputChange(e, checkpoint.id)}
                          disabled={isEditMode ? "" : "disabled"}
                        />
                      </td>
                      <td className="whitespace-nowrap px-0">
                        <div className={`${isEditMode ? "" : "hidden"}`}>
                          <label
                            tabIndex={0}
                            className="btn btn-sm btn-ghost m-1 ms-0"
                          >
                            <span
                              className={`material-icons-outlined`}
                              onClick={deleteCP}
                            >
                              delete
                            </span>
                          </label>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div
              className={`flex justify-center m-4 ${
                isEditMode ? "" : "hidden"
              }`}
            >
              {/* ボタンクリックでcheckpoint追加 */}
              <button
                className="btn btn-primary w-[90%]"
                onClick={addCheckPoint}
              >
                <span className="material-icons-outlined">
                  add_circle_outline
                </span>
                <span>チェックポイントを追加</span>
              </button>
            </div>
          </div>
        </div>

        <div className="modal-action">
          <form method="dialog">
            {/* 編集ボタンで編集モードにする */}
            <button
              className={`btn btn-primary ${isEditMode ? "hidden" : ""}`}
              onClick={(event) => {
                event.preventDefault();
                setIsEditMode(true);
              }}
            >
              編集
            </button>
            {/* 保存ボタンで編集モードを終了する */}
            <button
              className={`btn btn-success ${isEditMode ? "" : "hidden"}`}
              onClick={(event) => {
                event.preventDefault();
                setIsEditMode(false);
              }}
            >
              保存
            </button>
            {/* 閉じるボタンでモーダルを閉じる */}
            <button
              className="btn ms-2"
              onClick={(event) => {
                event.preventDefault();
                setIsEditMode(false);
                document.getElementById(props.modalId).close();
              }}
            >
              {isEditMode ? "変更を破棄" : "閉じる"}
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
export default FusenModal;
