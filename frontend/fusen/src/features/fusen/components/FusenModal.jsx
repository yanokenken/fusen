// useStateを使う
import React, { useEffect, useState, useRef } from "react";
import LabelCheckbox from "../../../components/LabelCheckbox";
import { generateNanoId } from "../../../utils/generateId";
import { putFusen } from "../api/putFusen";
import { getFusens, getKanryoFusens } from "../api/getFusens";
import { deleteFusen } from "../api/deleteFusen";
import { useSetRecoilState, useRecoilState } from "recoil";
import { fusensState, fusenStatusState, toastState} from "../../../state/atoms";

function FusenModal({ modalId, selectedFusen, fromCompleteList }) {
  // 選択された付箋の情報
  const [fusen, setFusen] = useState({ ...selectedFusen });
  const [errors, setErrors] = useState({}); // エラーメッセージ
  // 付箋を更新したときに付箋一覧を更新するためのstate
  const setFusens = useSetRecoilState(fusensState);
  const [fusenStatus] = useRecoilState(fusenStatusState);
  const setToast = useSetRecoilState(toastState);

  useEffect(() => {
    setFusen({ ...selectedFusen });
  }, [selectedFusen]);

  // モーダルを開いたときにフォーカスを外す
  const inputRef = useRef();
  const scrollRef = useRef(null);
  const modalIsOpen = document.getElementById(modalId)?.open;
  useEffect(() => {
    if (modalIsOpen) {
      inputRef.current.blur();
    }
  }, [modalIsOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [fusen.checkpoints]);

  // モーダルを閉じる
  const handleClose = () => {
    setFusen({ ...selectedFusen });
    document.getElementById(modalId).close();
  };

  // チェックポイントを追加
  const addCheckPoint = () => {
    const id = generateNanoId(selectedFusen.id, 5);
    const item = { id: id, body: "", is_checked: false };
    if (Array.isArray(fusen.checkpoints) === false) {
      setFusen((prevFusen) => ({
        ...prevFusen,
        checkpoints: [item],
      }));
      return;
    } else {
      setFusen((prevFusen) => ({
        ...prevFusen,
        checkpoints: [...prevFusen.checkpoints, item],
      }));
    }
  };
  // 付箋削除確認
  const beforeDeleteFusen = () => {
    document.getElementById("delete_modal").showModal();
  };
  // 付箋削除処理
  const remove = () => {
    deleteFusen(fusen.id)
      .then(async (res) => {
        // 付箋一覧を更新する
        document.getElementById("delete_modal").close();
        document.getElementById(modalId).close();
        const param = fromCompleteList ? "all" : "";
        console.log(param);
        const fusens = await getFusens(param);
        const kanryoFusens = await getKanryoFusens();
        setFusens(fusens.concat(kanryoFusens));
        setToast({ message: "削除しました", type: "info", time: 3000 });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // チェックポイントを削除
  const deleteCP = (e) => {
    const id = e.target.closest("tr").id;
    setFusen((prevFusen) => ({
      ...prevFusen,
      checkpoints: prevFusen.checkpoints.filter(
        (checkpoint) => checkpoint.id !== id
      ),
    }));
  };

  // 新規登録用付箋の更新ハンドラ
  const handleInputChange = (e, id, type) => {
    const { value } = e.target;
    switch (type) {
      case "title": // タイトルの変更
        setFusen((prevFusen) => ({
          ...prevFusen,
          title: value,
        }));
        break;
      case "memo": // メモの変更
        setFusen((prevFusen) => ({
          ...prevFusen,
          memo: value,
        }));
        break;
      case "checkpointStatus": // チェックポイント(checkbox)の変更
        setFusen((prevFusen) => ({
          ...prevFusen,
          checkpoints: prevFusen.checkpoints.map((checkpoint) =>
            checkpoint.id === id
              ? { ...checkpoint, is_checked: e.target.checked }
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
          is_important: e.target.checked,
        }));
        break;
      case "isUrgent": // 緊急の変更
        setFusen((prevFusen) => ({
          ...prevFusen,
          is_urgent: e.target.checked,
        }));
        break;
      case "status": // ステータスの変更
        setFusen((prevFusen) => ({
          ...prevFusen,
          status: Number(value),
        }));
        break;
      case "remaind_at": // リマインダーの変更
        setFusen((prevFusen) => ({
          ...prevFusen,
          remaind_at: value,
        }));
        break;
      default:
        break;
    }
  };

  // 付箋を更新する
  const handleUpdateClick = () => {
    let newErrors = {};
    if (!fusen.title) newErrors.title = "タスク名は必須です";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    putFusen(fusen)
      .then(async (updatedFusen) => {
        // 付箋一覧を更新する
        const fusens = await getFusens();
        const param = fromCompleteList ? "all" : "";
        const kanryoFusens = await getKanryoFusens(param);
        setFusens(fusens.concat(kanryoFusens));
        document.getElementById(modalId).close();
        setToast({ message: "更新しました", type: "info", time: 3000 });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const dateFormatted = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}.${
      d.getMonth() + 1
    }.${d.getDate()} ${d.getHours()}:${d.getMinutes()}`;
  };

  return (
    <>
      <dialog id={modalId ? modalId : ""} className="modal">
        <div className="modal-box bg-base-200 border-2 border-[#020202]">
          <label className="label">
            <span className="label-text">タスク名（必須）</span>
          </label>
          <input
            ref={inputRef}
            type="text"
            maxLength={100}
            className={`input input-bordered w-full mt-4 lg:mt-0 `}
            placeholder="タスク名"
            value={fusen ? fusen.title : ""}
            onChange={(e) => {
              handleInputChange(e, fusen.id, "title");
            }}
          />
          <label className="label">
            <span className="label-text-alt text-error">{errors.title}</span>
          </label>

          <div className="form-control">
            <label className="label">
              <span className="label-text">メモ</span>
            </label>
            <textarea
              className={`textarea textarea-bordered min-h-[10rem]`}
              maxLength={1000}
              placeholder="メモ"
              value={fusen ? fusen.memo : ""}
              onChange={(e) => {
                handleInputChange(e, fusen.id, "memo");
              }}
            />
            <label className="label">
              <span className="label-text-alt text-error"></span>
            </label>
          </div>

          <div className="form-control w-full flex mb-4">
            <LabelCheckbox
              key={fusen ? `${fusen.id}-important` : "important-default-key"}
              label="重要"
              checked={fusen ? fusen.is_important : false}
              onChange={(e) => {
                handleInputChange(e, fusen.id, "isImportant");
              }}
              colorSuffix="warning"
            />
            <LabelCheckbox
              key={fusen ? `${fusen.id}-urgent` : "urgent-default-key"}
              label="緊急"
              checked={fusen ? fusen.is_urgent : false}
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
              <span>{fusenStatus[0]}</span>
              <span>{fusenStatus[1]}</span>
              <span>{fusenStatus[2]}</span>
              <span>{fusenStatus[3]}</span>
            </div>
          </div>

          <div className="form-control ">
            <label className="label">
              <span className="label-text">リマインダー</span>
            </label>
            <input
              type="date"
              className="input input-bordered w-full mt-4 lg:mt-0"
              placeholder=""
              value={fusen ? fusen.remaind_at : ""}
              onChange={(e) => handleInputChange(e, fusen.id, "remaind_at")}
            />
            <label className="label">
              <span className="text-xs">
              </span>
            </label>
          </div>

          <div className="collapse collapse-open w-full mb-4 border border-base-300 shadow-xl">
            <div className="p-2 ps-4 pb-0 text-md font-medium">
              チェックポイント
            </div>
            <div className="collapse-content p-0">
              <div className="px-2 max-h-[35vh] overflow-auto">
                <table className="table table-xs">
                  <tbody>
                    {fusen &&
                      fusen.checkpoints &&
                      fusen.checkpoints.map((checkpoint, index) => (
                        <tr key={checkpoint.id} id={checkpoint.id} ref={index === fusen.checkpoints.length - 1 ? scrollRef : null}>
                          <td className="text-center">
                            <label className={`label cursor-pointer block`}>
                              <input
                                type="checkbox"
                                className="checkbox hover:checkbox-neutral"
                                checked={checkpoint.is_checked}
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
                            <textarea
                              maxLength={100}
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
                  <span>追加</span>
                  <span className="material-icons-outlined">
                    add_circle_outline
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-end">
            <p className="text-[0.9em] dots-font">
              <span className="font-bold">created：</span>{dateFormatted(fusen.created_at)}
            </p>
            /
            <p className="text-[0.9em] dots-font">
            <span className="font-bold">updated：</span>{dateFormatted(fusen.updated_at)}
            </p>
          </div>

          <div className="modal-action flex justify-between">
            <button
              className="link link-error block my-auto"
              onClick={beforeDeleteFusen}
            >
              削除
            </button>

            <div className="flex gap-2">
            <button
                className="btn bg-base-300"
                onClick={(event) => {
                  event.preventDefault();
                  handleClose();
                }}
              >
                閉じる
              </button>

              <button
                className={`btn btn-primary min-w-[5rem]`}
                onClick={(event) => {
                  event.preventDefault();
                  // fusenを更新する
                  handleUpdateClick(fusen);
                }}
              >
                更新
              </button>
            </div>
          </div>
        </div>
      </dialog>

      <dialog id="delete_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">確認</h3>
          <p className="py-4">この付箋を削除します。よろしいですか？</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn ">キャンセル</button>
              <button className="btn btn-error ms-2 min-w-[5rem]" onClick={remove}>
                削除
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
export default FusenModal;
