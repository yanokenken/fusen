import React, { useEffect, useState } from "react";
import LabelCheckbox from "../../../components/LabelCheckbox";
import { generateNanoId } from "../../../utils/generateId";

import { useSetRecoilState, useRecoilValue } from "recoil";
import { settingsState } from "../../../state/atoms";
import { fusensState } from "../../../state/atoms";

function SideMenu({ closeDrawer }) {
  let emptyFusen = {
    title: "",
    memo: "",
    is_urgent: false,
    is_important: false,
    status: 0,
    checkpoints: [],
  };

  const setFusens = useSetRecoilState(fusensState);
  const [fusen, setFusen] = useState(emptyFusen); // 付箋の情報

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
      default:
        break;
    }
  };

  return (
    <>
      <div>
        <ul className="menu bg-base-200 w-56 rounded-box">
         <li><a>Item 1</a></li>
          <li><a>Item 2</a></li>
          <li><a>Item 3</a></li>
          <li><a>Item 1</a></li>
          <li><a>Item 2</a></li>
          <li><a>Item 3</a></li>
          <li><a>Item 1</a></li>
          <li><a>Item 2</a></li>
          <li><a>Item 3</a></li>
          <li><a>Item 1</a></li>
          <li><a>Item 2</a></li>
          <li><a>Item 3</a></li>
          <li><a>Item 1</a></li>
          <li><a>Item 2</a></li>
          <li><a>Item 3</a></li>
        </ul>
      </div>
    </>
  );
}
export default SideMenu;
