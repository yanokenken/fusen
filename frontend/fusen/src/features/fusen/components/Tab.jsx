import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FusenModal from "./FusenModal";
import MatrixView from "./MatrixView";
import ListView from "./ListView";
import Menu from "../../misc/components/Menu";
import Cookies from 'js-cookie';
import { useRecoilState } from "recoil";
import { settingsState, userState, fusensState } from "../../../state/atoms";



function Tab() {
  const [selectetedFusen, setSelectedFusen] = useState(null);
  const [activeTab, setActiveTab] = useState("list"); 
  const [settings, setSettings] = useRecoilState(settingsState);
  const [fusens, setFusens] = useRecoilState(fusensState);

  // 選択された付箋を拾ってモーダルに渡す
  const handleFusenClick = (fusen) => {
    setSelectedFusen(fusen);
    document.getElementById("shosai_modal")?.showModal();
  };



  return (
    <>
      <div className="min-h-screen h-fill-available w-full p-4  flex flex-col">
        <p className="accent-title text-accent my-[-16px] w-full text-center lg:hidden">
          {settings.title}
          <span className="text-[1.5rem] text-white"> Alpha</span>
        </p>
        <div className="flex justify-between mb-2">
          <div className="tabs tabs-boxed bg-base-300">
            <a id="list" className={`tab tab-md ${activeTab === 'list' ? 'tab-active' : ''}`} onClick={() => setActiveTab('list')}>ボード</a>
            <a id="matrix" className={`tab tab-md ${activeTab === 'matrix' ? 'tab-active' : ''}`} onClick={() => setActiveTab('matrix')}>ボックス</a>
            <a id="complete" className={`tab tab-md ${activeTab === 'complete' ? 'tab-active' : ''}`} onClick={() => setActiveTab('complete')}> 完了 </a>
          </div>

          <Menu />

        </div>
        <div className="tab-body  bg-neutral w-full flex-grow rounded-xl shadow-center">
          {/* matrixViewにはfusen.status!=3以外 */}
          {activeTab === 'list' && <ListView fusens={fusens} onFusenClick={handleFusenClick} />}
          {activeTab === 'matrix' && <MatrixView fusens={fusens} onFusenClick={handleFusenClick} />}
          {activeTab === 'complete' && <MatrixView fusens={fusens} onFusenClick={handleFusenClick} />}
        </div>
      </div>
      <FusenModal modalId="shosai_modal" selectedFusen={selectetedFusen} />
    </>
  );
}

export default Tab;
