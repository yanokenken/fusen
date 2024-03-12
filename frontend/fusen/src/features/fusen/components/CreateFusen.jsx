import React, { useEffect, useState } from "react";
import LabelCheckbox from "../../../components/LabelCheckbox";
import SimpleModal from "../../../components/SimpleModal";
import { generateNanoId } from "../../../utils/generateId";

import { postFusen } from "../api/postFusen";
import { getFusens, getKanryoFusens } from "../api/getFusens";
import { useSetRecoilState, useRecoilState } from "recoil";
import { fusensState, sideContentState, fusenStatusState } from "../../../state/atoms";

function CreateFusen({ closeDrawer }) {
  let emptyFusen = {
    title: "",
    memo: "",
    is_urgent: false,
    is_important: false,
    status: 0,
    remaind_at: "",
    checkpoints: [],
  };

  const setFusens = useSetRecoilState(fusensState);
  const setSideContent = useSetRecoilState(sideContentState);
  const [fusenStatus] = useRecoilState(fusenStatusState);

  const sideClose = () => setSideContent({ open: false });

  const [fusen, setFusen] = useState(emptyFusen); // 付箋の情報
  const [errors, setErrors] = useState({}); // エラーメッセージ

  useEffect(() => {
    setFusen(emptyFusen);
  }, []);

  const addCheckPoint = () => {
    const id = generateNanoId("new", 5);
    const item = { id: id, body: "", is_checked: false };
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

  const addFusen = () => {
    let newErrors = {};
    if (!fusen.title) newErrors.title = "タスク名は必須です";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    postFusen(fusen).then(async (res) => {
      // 付箋一覧を更新
      const fusens = await getFusens();
      const kanryoFusens = await getKanryoFusens();
      setFusens(fusens.concat(kanryoFusens));

      setFusen(emptyFusen);
      sideClose();
    });
  };

  return (
    <>
      <div className="">
        <div className="h-[calc(85vh - 84px)] overflow-scroll">
          <div className="lg:hidden bg-base-300 text-base-content flex items-center justify-center border-t">
            <div className="flex justify-between w-full mt-10">
              <div
                className="badge badge-outline badge-xl h-[2rem] cursor-pointer"
                onClick={sideClose}
              >
                ✕
              </div>
              <div
                className="badge badge-primary badge-xl h-[2rem] cursor-pointer"
                onClick={addFusen}
              >
                登録する
              </div>
            </div>
          </div>
          <div className="form-control ">
            <label className="label">
              <span className="label-text">タスク名（必須）</span>
            </label>
            <input
              type="text"
              maxLength={200}
              className="input w-full xl:mt-0 raunded-xl"
              placeholder="タスク名"
              value={fusen ? fusen.title : ""}
              onChange={(e) => handleInputChange(e, fusen.id, "title")}
            />
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.title}
              </span>
            </label>
          </div>
          <label className="label">
            <span className="label-text text-sm">メモ</span>
          </label>
          <textarea
            className="textarea h-[8rem] w-full mb-4 raunded-xl"
            maxLength={1000}
            placeholder="メモ"
            value={fusen ? fusen.memo : ""}
            onChange={(e) => handleInputChange(e, fusen.id, "memo")}
          ></textarea>
          <div className="form-control w-full flex mb-4">
            <LabelCheckbox
              label="重要"
              checked={fusen ? fusen.is_important : false}
              onChange={(e) => {
                handleInputChange(e, fusen.id, "isImportant");
              }}
              colorSuffix="warning"
            />
            <LabelCheckbox
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
              max={3}
              value={fusen ? fusen.status : 0}
              className="range range-primary"
              onChange={(e) => handleInputChange(e, fusen.id, "status")}
            />
            <div className="w-full flex justify-between text-xs px-2">
              {/* 初期値：未着手/進行中/今日やる！/完了 */}
              <span>{fusenStatus[0]}</span>
              <span>{fusenStatus[1]}</span>
              <span>{fusenStatus[2]}</span>
              <span>{fusenStatus[3]}</span>
            </div>
          </div>

          <div className="form-control ">
            <label className="label">
              <span className="label-text">リマインダー</span>
              <button className="label-text-alt btn btn-ghost btn-xs" onClick={()=>{document.getElementById('remainder_tips_modal').showModal()}}>
                <span class="material-symbols-outlined">help</span>
              </button>
              <SimpleModal
                modalId="remainder_tips_modal"
                title="リマインダーとは"
                body={
                  `設定した日付を過ぎたら、対象の付箋はリストの上部に表示されます。\n"作業予定日" や "期限日" を設定すると、タスクの優先順位を見直すのに便利です。
                `}
                button="閉じる"
              />
            </label>

            <input
              type="date"
              className="input w-full xl:mt-0 raunded-xl"
              placeholder=""
              value={fusen ? fusen.remaind_at : ""}
              onChange={(e) => handleInputChange(e, fusen.id, "remaind_at")}
            />
            <label className="label">
              <span className="text-xs">                
              </span>
            </label>
          </div>

          <div className="collapse collapse-open bg-base-200 w-full mb-4">
            <div className="collapse-title text-md font-medium">
              チェックポイント
            </div>
            <div className="collapse-content p-0 overflow-auto">
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
                              maxLength={200}
                              className="input input-sm input-bordered w-full max-w-xs"
                              placeholder="チェックポイント"
                              defaultValue={checkpoint.body}
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
        </div>

        <div
          className="
            h-[15vh] bg-base-300 text-base-content hidden lg:flex 
            items-center justify-center 
            border-t 
            fixed inset-x-0 bottom-0"
        >
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
