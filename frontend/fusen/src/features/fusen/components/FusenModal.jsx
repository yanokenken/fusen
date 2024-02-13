// useStateを使う
import React, { useEffect, useState, useRef } from "react";
import LabelCheckbox from "../../../components/LabelCheckbox";
import { generateNanoId } from "../../../utils/generateId";
import { putFusen } from "../api/putFusen";
import { getFusens, getKanryoFusens } from "../api/getFusens";
import { deleteFusen } from "../api/deleteFusen";
import { useSetRecoilState } from "recoil";
import { fusensState } from "../../../state/atoms";



function FusenModal({ modalId, selectedFusen , fromCompleteList }) {

  // 選択された付箋の情報
  const [fusen, setFusen] = useState({ ...selectedFusen });
  // 付箋を更新したときに付箋一覧を更新するためのstate
  const setFusens = useSetRecoilState(fusensState);

  useEffect(() => {
    setFusen({ ...selectedFusen });
  }, [selectedFusen]);

  // モーダルを開いたときにフォーカスを外す
  const inputRef = useRef();
  const modalIsOpen = document.getElementById(modalId)?.open;
  useEffect(() => {
    if (modalIsOpen) {
      inputRef.current.blur();
    }
  }, [modalIsOpen]);

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
    }else{
      setFusen((prevFusen) => ({
        ...prevFusen,
        checkpoints: [...prevFusen.checkpoints, item],
      }));
    }
  };
  // 付箋削除確認
  const beforeDeleteFusen = () => {
    document.getElementById('delete_modal').showModal();
  }
  // 付箋削除処理
  const remove = () => {
    deleteFusen(fusen.id).then(async (res) => {
      // 付箋一覧を更新する
      document.getElementById('delete_modal').close();
      document.getElementById(modalId).close();
      const param = fromCompleteList ? 'all':'';
      console.log(param)
      const fusens = await getFusens(param)
      const kanryoFusens = await getKanryoFusens()
      setFusens(fusens.concat(kanryoFusens));

    })
    .catch((err) => {
      console.error(err);
    });
  }  
  

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
      default:
        break;
    }
  };

  // 付箋を更新する
  const handleUpdateClick = () => {
    putFusen(fusen)
      .then(async (updatedFusen) => {
        // 付箋一覧を更新する
        const fusens = await getFusens()
        const param = fromCompleteList ? 'all':'';
        console.log(param)
        const kanryoFusens = await getKanryoFusens(param)
        setFusens(fusens.concat(kanryoFusens));
  
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
    <dialog id={modalId ? modalId : ""} className="modal">
      <div className="modal-box">
        <label className="label">
          <span className="label-text">タスク名</span>
        </label>
        <input
          ref={inputRef}
          type="text"
          maxLength={100}
          className={`input input-bordered w-full mb-4 mt-4 lg:mt-0 `}
          placeholder="タスク名"
          value={fusen ? fusen.title : ""}
          onChange={(e) => {
            handleInputChange(e, fusen.id, "title");
          }}
        />
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
            <span>未着手</span>
            <span>進行中</span>
            <span>今日やる！</span>
            <span>完了</span>
          </div>
        </div>

        <div className="collapse collapse-open w-full mb-4 border border-base-300 shadow-xl">
          <div className="collapse-title text-md font-medium">
            チェックポイント
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
                              checked={checkpoint.is_checked}
                              onChange={(e) =>
                                handleInputChange(e, checkpoint.id, "checkpointStatus")
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
                <span>チェックポイントを追加</span>
                <span className="material-icons-outlined">
                  add_circle_outline
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="modal-action flex justify-between">

            <a className="link link-error block my-auto" onClick={beforeDeleteFusen}>削除する</a>
            
            <div>
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
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-error" onClick={remove}>削除</button>
            <button className="btn ms-2">キャンセル</button>
          </form>
        </div>
      </div>
    </dialog>

  </>
  );
}
export default FusenModal;
