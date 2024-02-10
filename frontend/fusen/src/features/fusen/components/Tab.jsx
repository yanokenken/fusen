import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FusenModal from "./FusenModal";
import MatrixView from "./MatrixView";
import ListView from "./ListView";
import Menu from "../../misc/components/Menu";
import Cookies from 'js-cookie';
import { useRecoilState } from "recoil";
import { preferenceState, userState, fusensState } from "../../../state/atoms";



function Tab() {
  const [selectetedFusen, setSelectedFusen] = useState(null);
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
        <a id="list" className={`tab tab-md ${activeTab === 'list' ? 'tab-active' : ''}`} onClick={() => setActiveTab('list')}>ボード</a>
        <a id="matrix" className={`tab tab-md ${activeTab === 'matrix' ? 'tab-active' : ''}`} onClick={() => setActiveTab('matrix')}>ボックス</a>
        <a id="complete" className={`tab tab-md ${activeTab === 'complete' ? 'tab-active' : ''}`} onClick={() => setActiveTab('complete')}> 完了 </a>
      </div>
      {/* <Menu /> */}
    </div>
    <div className="tab-body  bg-neutral w-full flex-grow rounded-xl shadow-center">
        {/* matrixViewにはfusen.status!=3以外 */}
        {activeTab === 'list' && <ListView fusens={fusens} onFusenClick={handleFusenClick} />}
        {activeTab === 'matrix' && <MatrixView fusens={fusens} onFusenClick={handleFusenClick} />}
        {activeTab === 'complete' && <MatrixView fusens={fusens} onFusenClick={handleFusenClick} />}
    </div>

    <FusenModal modalId="shosai_modal" selectedFusen={selectetedFusen} />

    </>
  );
}

export default Tab;
