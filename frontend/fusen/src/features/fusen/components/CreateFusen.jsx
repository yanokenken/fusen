import React, { useState } from "react";
import LabelCheckbox from "../../../components/LabelCheckbox";
import { generateNanoId } from "../../../utils/generateId";

function CreateFusen() {
  const [checkpoints, setCheckpoints] = useState([]);
  const addCheckPoint = () => {
    console.log("addCheckPoint")
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
    <>
      <label
        htmlFor="my-drawer-2"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <div className="w-80 ">
        <div className="px-4 pb-4 h-[85vh] bg-base-300 text-base-content overflow-x-auto always-show-scrollbar">
          <p className="accent-title m-auto w-full text-center hidden lg:block">
            FUSEEN
          </p>

          <input
            type="text"
            className="input input-bordered w-full mb-4 mt-4 lg:mt-0"
            placeholder="タスク名（必須）"
          />

          <textarea
            className="textarea textarea-bordered h-[8rem] w-full mb-4"
            placeholder="メモ（任意）"
          ></textarea>

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
              <div className="ps-2">
                <table className="table table-xs">
                  <thead></thead>
                  <tbody>
                    {checkpoints.map((checkpoint) => (
                      <tr key={checkpoint.id} id={checkpoint.id}>
                        <td>
                          <input
                            type="text"
                            className="input input-sm input-bordered w-full max-w-xs"
                            placeholder="チェックポイント"
                            defaultValue={checkpoint.text}
                            onChange={(e) =>
                              handleInputChange(e, checkpoint.id)
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
              <div className="flex justify-center m-4">
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
        </div>
        <div className="h-[15vh] bg-base-300 text-base-content m-auto flex items-center justify-center shadow-center">
          <button className="btn btn-primary w-[80%]">登録</button>
        </div>
      </div>
    </>
  );
}
export default CreateFusen;
