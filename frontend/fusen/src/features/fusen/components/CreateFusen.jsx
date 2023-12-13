import React, { useEffect, useState } from "react";
import LabelCheckbox from "../../../components/LabelCheckbox";
import { generateNanoId } from "../../../utils/generateId";
import postFusen from "../api/postFusen";

function CreateFusen({ handleAddFusen, closeDrawer }) {
  let emptyFusen = {
    id: "",
    fusenTitle: "",
    fusenMemo: "",
    isUrgent: false,
    isImportant: false,
    status: 0,
    checkpoints: [],
  };

  const [fusen, setFusen] = useState(emptyFusen); // 付箋の情報

  useEffect(() => {
    setFusen(emptyFusen);
  }, []);

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
  const addFusen = () => {
    postFusen(fusen).then((res) => {
      // 付箋を追加する
      handleAddFusen(res);
      setFusen(emptyFusen);
      closeDrawer();
      // fusens一覧を更新する
    });
  };

  return (
    <>
      <label
        htmlFor="my-drawer-2"
        aria-label="close sidebar"
        className="drawer-overlay"
        onClick={closeDrawer}
      ></label>
      <div className="w-100 lg:w-80">
        <div className="px-4 pb-4 h-[85vh] bg-base-300 overflow-x-auto always-show-scrollbar">
          <p className="accent-title text-accent m-auto w-full text-center hidden lg:block">
            FUSEEN
          </p>
          <div className="block lg:hidden lg:h-[15vh] bg-base-300 text-base-content flex items-center justify-center border-t">
            <div className="flex justify-between w-full mt-10">
              <div className="badge badge-outline badge-xl h-[2rem] cursor-pointer" onClick={closeDrawer}>✕</div>
              <div className="badge badge-primary badge-xl h-[2rem] cursor-pointer" onClick={addFusen}>登録する</div>
            </div>
          </div>

          <input
            type="text"
            className="input w-full mb-4 mt-4 lg:mt-0 raunded-xl"
            placeholder="タスク名（必須）"
            onChange={(e) => handleInputChange(e, fusen.id, "title")}
          />
          <textarea
            className="textarea h-[8rem] w-full mb-4 raunded-xl"
            placeholder="メモ（任意）"
            onChange={(e) => handleInputChange(e, fusen.id, "memo")}
          ></textarea>
          <div className="form-control w-full flex mb-4">
            <LabelCheckbox
              label="重要"
              checked={fusen ? fusen.isImportant : false}
              onChange={(e) => {
                handleInputChange(e, fusen.id, "isImportant");
              }}
              colorSuffix="warning"
            />
            <LabelCheckbox
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
              checked={fusen ? fusen.status : 0}
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
          <div className="collapse collapse-open bg-base-200 w-full mb-4">
            <div className="collapse-title text-md font-medium">
              チェックポイント（任意）
            </div>
            <div className="collapse-content p-0">
              <div className="ps-2">
                <table className="table table-xs">
                  <thead></thead>
                  <tbody>
                    {fusen &&
                      fusen.checkpoints &&
                      fusen.checkpoints.map((checkpoint) => (
                        <tr key={checkpoint.id} id={checkpoint.id}>
                          <td>
                            <input
                              type="text"
                              className="input input-sm input-bordered w-full max-w-xs"
                              placeholder="チェックポイント"
                              defaultValue={checkpoint.text}
                              onChange={(e) =>
                                handleInputChange(
                                  e,
                                  checkpoint.id,
                                  "checkpointBody"
                                )
                              }
                            />
                          </td>
                          <td className="whitespace-nowrap px-0">
                            <div className="dropdown dropdown-end">
                              <label
                                tabIndex={0}
                                className="btn btn-sm btn-ghost m-1 ms-0"
                              >
                                <span
                                  className="material-icons-outlined"
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
              <div className="flex justify-center my-4">
                <button
                  className="btn btn-outline w-[90%]"
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
        </div>
        <div className="h-[15vh] bg-base-300 text-base-content flex items-center justify-center border-t">
          <button
            className="btn btn-primary  w-[80%] shadow-sm hidden lg:flex" 
            onClick={addFusen} 
          >
            <span>登録する</span>
            <span className="material-icons-outlined">sticky_note_2</span>
          </button>
        </div>
      </div>
    </>
  );
}
export default CreateFusen;
