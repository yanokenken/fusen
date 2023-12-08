import React, { useState } from "react";
import FusenModal from "./FusenModal";
import MatrixView from "./MatrixView";
import ListView from "./ListView";

function Tab({fusens, setFusens}) {
  const [selectetedFusen, setSelectedFusen] = useState(null);
  const [activeTab, setActiveTab] = useState("list"); 

  const handleFusenClick = (fusen) => {
    setSelectedFusen(fusen);
    document.getElementById("shosai_modal")?.showModal();
  };

  const handleFusenChange = (updatedFusen) => {
    setFusens(prevFusens => prevFusens.map(fusen => fusen.id === updatedFusen.id ? updatedFusen : fusen));
  };

  return (
    <>
      <div className="min-h-screen h-fill-available w-full p-4  flex flex-col">
        <p className="accent-title mt-[-16px] w-full text-center lg:hidden">
          FUSEEN
        </p>
        <div className="flex justify-between mb-2">
          <div className="tabs tabs-boxed bg-base-300">
            <a id="list" className={`tab tab-md ${activeTab === 'list' ? 'tab-active' : ''}`} onClick={() => setActiveTab('list')}>リスト</a>
            <a id="matrix" className={`tab tab-md ${activeTab === 'matrix' ? 'tab-active' : ''}`} onClick={() => setActiveTab('matrix')}>　表　</a>
            <a id="complete" className={`tab tab-md ${activeTab === 'complete' ? 'tab-active' : ''}`} onClick={() => setActiveTab('complete')}> 完了 </a>
          </div>
          <div className="avatar">
            <div className="w-10 h-10 rounded-full m-1">
              <span className="material-icons-outlined">person</span>
            </div>
          </div>
        </div>
        <div className="tab-body bg-base-200 w-full flex-grow rounded-xl shadow-center">
          {/* matrixViewにはfusen.status!=3以外 */}
          {activeTab === 'list' && <ListView fusens={fusens} onFusenClick={handleFusenClick} />}
          {activeTab === 'matrix' && <MatrixView fusens={fusens} onFusenClick={handleFusenClick} />}
          {activeTab === 'complete' && <MatrixView fusens={fusens} onFusenClick={handleFusenClick} />}
        </div>
      </div>
      <FusenModal modalId="shosai_modal" selectedFusen={selectetedFusen} onFusenChange={handleFusenChange} />
    </>
  );
}

export default Tab;
