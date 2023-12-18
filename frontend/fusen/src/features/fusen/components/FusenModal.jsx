// useStateを使う
import React, { useEffect, useState, useRef } from "react";
import LabelCheckbox from "../../../components/LabelCheckbox";
import { generateNanoId } from "../../../utils/generateId";
import putFusen from "../api/putFusen";

function FusenModal({ modalId, selectedFusen, onFusenChange }) {
  // onFuseChange: Fusenが更新された時、元のfusensに反映する
  const [fusen, setFusen] = useState({ ...selectedFusen });
  useEffect(() => {
    setFusen({ ...selectedFusen });
  }, [selectedFusen]);

  const inputRef = useRef();
  const modalIsOpen = document.getElementById(modalId)?.open;
  useEffect(() => {
    if (modalIsOpen) {
      inputRef.current.blur();
    }
  }, [modalIsOpen]);

  const handleClose = () => {
    setFusen({ ...selectedFusen });
    document.getElementById(modalId).close();
  };

  const addCheckPoint = () => {
    const id = generateNanoId(5);
    const item = { id: id, body: "", isChecked: false };
    setFusen((prevFusen) => ({
      ...prevFusen,
      checkpoints: [...prevFusen.checkpoints, item],
    }));
  };

  const deleteCP = (e) => {
    const id = e.target.closest("tr").id;
    setFusen((prevFusen) => ({
      ...prevFusen,
      checkpoints: prevFusen.checkpoints.filter(
        (checkpoint) => checkpoint.id !== id
      ),
    }));
  };

  const handleInputChange = (e, id, type) => {
    const { value } = e.target;
    switch (type) {
      case "title": // タイトルの変更
        setFusen((prevFusen) => ({
          ...prevFusen,
          fusenTitle: value,
        }));
        break;
      case "memo": // メモの変更
        setFusen((prevFusen) => ({
          ...prevFusen,
          fusenMemo: value,
        }));
        break;
      case "checkpointStatus": // チェックポイント(checkbox)の変更
        setFusen((prevFusen) => ({
          ...prevFusen,
          checkpoints: prevFusen.checkpoints.map((checkpoint) =>
            checkpoint.id === id
              ? { ...checkpoint, isChecked: e.target.checked }
              : checkpoint
          ),
        }));
        break;
      case "checkpointBody": // チェックポイント(body)の変更
        setFusen((prevFusen) => ({
          ...prevFusen,
          checkpoints: prevFusen.checkpoints.map((checkpoint) =>
            checkpoint.id === id ? { ...checkpoint, body: value } : checkpoint
          ),
        }));
        break;
      case "isImportant": // 重要の変更
        setFusen((prevFusen) => ({
          ...prevFusen,
          isImportant: e.target.checked,
        }));
        break;
      case "isUrgent": // 緊急の変更
        setFusen((prevFusen) => ({
          ...prevFusen,
          isUrgent: e.target.checked,
        }));
        break;
      case "status": // ステータスの変更
        setFusen((prevFusen) => ({
          ...prevFusen,
          status: Number(value),
        }));
        break;
      default:
        break;
    }
  };

  const handleUpdateClick = () => {
    putFusen(fusen)
      .then((updatedFusen) => {
        onFusenChange(updatedFusen);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <dialog id={modalId ? modalId : ""} className="modal">
      <div className="modal-box">
        <label className="label">
          <span className="label-text">タスク名（必須）</span>
        </label>
        <input
          ref={inputRef}
          type="text"
          className={`input input-bordered w-full mb-4 mt-4 lg:mt-0 `}
          placeholder="タスク名（必須）"
          value={fusen ? fusen.fusenTitle : ""}
          onChange={(e) => {
            handleInputChange(e, fusen.id, "title");
          }}
        />
        <div className="form-control">
          <label className="label">
            <span className="label-text">メモ（任意）</span>
          </label>
          <textarea
            className={`textarea textarea-bordered min-h-[10rem]`}
            placeholder="メモ（任意）"
            value={fusen ? fusen.fusenMemo : ""}
            onChange={(e) => {
              handleInputChange(e, fusen.id, "memo");
            }}
          />
        </div>

        <div className="form-control w-full flex mb-4">
          <LabelCheckbox
            key={fusen ? `${fusen.id}-important` : "important-default-key"}
            label="重要"
            checked={fusen ? fusen.isImportant : false}
            onChange={(e) => {
              handleInputChange(e, fusen.id, "isImportant");
            }}
            colorSuffix="warning"
          />
          <LabelCheckbox
            key={fusen ? `${fusen.id}-urgent` : "urgent-default-key"}
            label="緊急"
            checked={fusen ? fusen.isUrgent : false}
            onChange={(e) => {
              handleInputChange(e, fusen.id, "isUrgent");
            }}
            colorSuffix="error"
          />
        </div>

        <div className="w-full mb-4">
          <input
            type="range"
            min={0}
            max="3"
            value={fusen ? fusen.status : 0}
            className="range range-primary"
            onChange={(e) => handleInputChange(e, fusen.id, "status")}
          />
          <div className="w-full flex justify-between text-xs px-2">
            <span>未着手</span>
            <span>進行中</span>
            <span>今日やる！</span>
            <span>完了</span>
          </div>
        </div>

        <div className="collapse collapse-open w-full mb-4 border border-base-300 shadow-xl">
          <div className="collapse-title text-md font-medium">
            チェックポイント（任意）
          </div>
          <div className="collapse-content p-0">
            <div className="px-2 max-h-[35vh] overflow-auto">
              <table className="table table-xs">
                <tbody>
                  {fusen &&
                    fusen.checkpoints &&
                    fusen.checkpoints.map((checkpoint) => (
                      <tr key={checkpoint.id} id={checkpoint.id}>
                        <td className="text-center">
                          <label className={`label cursor-pointer block`}>
                            <input
                              type="checkbox"
                              className="checkbox hover:checkbox-neutral"
                              checked={checkpoint.isChecked}
                              onChange={(e) =>
                                handleInputChange(
                                  e,
                                  checkpoint.id,
                                  "checkpointStatus"
                                )
                              }
                            />
                          </label>
                        </td>
                        <td className="text-center">
                          <input
                            type="text"
                            className="input input-sm input-bordered w-full max-w-xs"
                            placeholder="チェックポイント"
                            value={checkpoint.body}
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                checkpoint.id,
                                "checkpointBody"
                              )
                            }
                          />
                        </td>
                        <td className="whitespace-nowrap px-0 text-center">
                          <div>
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
            <div className={`flex justify-center my-4`}>
              {/* ボタンクリックでcheckpoint追加 */}
              <button
                className="btn btn-outline w-[90%] hover:btn-neutral"
                onClick={addCheckPoint}
              >
                <span>チェックポイントを追加</span>
                <span className="material-icons-outlined">
                  add_circle_outline
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="modal-action">
          <form method="dialog">
            <button
              className={`btn btn-primary`}
              onClick={(event) => {
                event.preventDefault();
                // fusenを更新する
                handleUpdateClick(fusen);
                document.getElementById(modalId).close();
              }}
            >
              更新する
            </button>
            {/* 閉じるボタンでモーダルを閉じる */}
            <button
              className="btn ms-2"
              onClick={(event) => {
                event.preventDefault();
                handleClose();
              }}
            >
              閉じる
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
export default FusenModal;
