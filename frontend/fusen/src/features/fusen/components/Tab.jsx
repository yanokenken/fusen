import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FusenModal from "./FusenModal";
import MatrixView from "./MatrixView";
import ListView from "./ListView";
import CompleteListView from "./CompleteListView";
import Menu from "../../misc/components/Menu";
import Cookies from 'js-cookie';
import { useRecoilState } from "recoil";
import { preferenceState, userState, fusensState } from "../../../state/atoms";
import { getKanryoFusens } from "../api/getFusens";



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
    <div className="flex justify-between my-2">
      <div className="tabs tabs-boxed bg-base-300">
        <a id="list" className={`tab tab-md ${activeTab === 'list' ? 'tab-active' : ''}`} onClick={() => {setActiveTab('list'); setFromCompleteList(false)}}>ボード</a>
        <a id="matrix" className={`tab tab-md ${activeTab === 'matrix' ? 'tab-active' : ''}`} onClick={() => {setActiveTab('matrix'); setFromCompleteList(false)}}>ボックス</a>
        <a id="complete" className={`tab tab-md ${activeTab === 'complete' ? 'tab-active' : ''}`} onClick={() => {setActiveTab('complete'); setFromCompleteList(true)}}> 完了 </a>
      </div>
      {/* <Menu /> */}
    </div>
    <div className="tab-body  bg-neutral w-full flex-grow rounded-xl shadow-center">
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
