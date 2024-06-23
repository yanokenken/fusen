import React, { useState } from "react";
import FusenModal from "./FusenModal";
import MatrixView from "./MatrixView";
import ListView from "./ListView";
import CompleteListView from "./CompleteListView";
import { useRecoilState } from "recoil";
import { preferenceState, fusensState } from "../../../state/atoms";

function Tab() {
  const [selectetedFusen, setSelectedFusen] = useState(null);
  const [fromCompleteList, setFromCompleteList] = useState(false);
  const [activeTab, setActiveTab] = useState("list"); 
  const [preference, setPreference] = useRecoilState(preferenceState);
  const [fusens, setFusens] = useRecoilState(fusensState);

  // 選択された付箋を拾ってモーダルに渡す
  const handleFusenClick = (fusen) => {
    setSelectedFusen(fusen);
    document.getElementById("shosai_modal")?.showModal();
  };

  return (
    <>
    <div className="tab-component flex justify-between my-2">
      <div className="tabs tabs-boxed dots-font">
        <a id="list" className={`tab tab-md flex items-center ${activeTab === 'list' ? 'btn-primary' : ''}`} onClick={() => {setActiveTab('list'); setFromCompleteList(false)}}>
          <span className="me-1">Kanban Board</span>
          <span className="material-symbols-outlined">view_kanban</span>
        </a>
        <a id="matrix" className={`tab tab-md hidden lg:flex items-center ${activeTab === 'matrix' ? 'btn-primary' : ''}`} onClick={() => {setActiveTab('matrix'); setFromCompleteList(false)}}>
          <span className="me-1">Priority Matrix</span>
          <span className="material-symbols-outlined">grid_view</span>
        </a>
        <a id="complete" className={`tab tab-md flex items-center ${activeTab === 'complete' ? 'btn-primary' : ''}`} onClick={() => {setActiveTab('complete'); setFromCompleteList(true)}}>
          <span className="me-1">Completed</span>
          <span className="material-symbols-outlined">done_all</span>
        </a>
      </div>
      {/* <Menu /> */}
    </div>
    <div className="tab-body  bg-neutral text-neutral-content w-full flex-grow rounded-xl shadow-center">
        {/* matrixViewにはfusen.status!=3以外 */}
        {activeTab === 'list' && <ListView fusens={fusens} onFusenClick={handleFusenClick} />}
        {activeTab === 'matrix' && <MatrixView fusens={fusens} onFusenClick={handleFusenClick} />}
        {activeTab === 'complete' && <CompleteListView fusens={fusens} onFusenClick={handleFusenClick} />}
    </div>

    <FusenModal modalId="shosai_modal" selectedFusen={selectetedFusen} fromCompleteList={fromCompleteList} />

    </>
  );
}

export default Tab;
