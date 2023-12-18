import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FusenModal from "./FusenModal";
import MatrixView from "./MatrixView";
import ListView from "./ListView";
import Cookies from 'js-cookie';
import { useRecoilState } from "recoil";
import { settingsState, userState } from "../../../state/atoms";


function Tab({fusens, setFusens}) {
  const [selectetedFusen, setSelectedFusen] = useState(null);
  const [activeTab, setActiveTab] = useState("list"); 
  const [settings, setSettings] = useRecoilState(settingsState);
  const [user, setUser] = useRecoilState(userState);  

  const navigate = useNavigate();

  const handleFusenClick = (fusen) => {
    setSelectedFusen(fusen);
    document.getElementById("shosai_modal")?.showModal();
  };

  const handleFusenChange = (updatedFusen) => {
    setFusens(prevFusens => prevFusens.map(fusen => fusen.id === updatedFusen.id ? updatedFusen : fusen));
  };
  const _logout = () => {
    Cookies.remove('auth');
    setUser({...user, name:"お試し太郎", });
    setSettings({...settings, mode: "mock", title: "preview" });
    navigate("/");
  };


  return (
    <>
      <div className="min-h-screen h-fill-available w-full p-4  flex flex-col">
        <p className="accent-title text-accent mt-[-16px] w-full text-center lg:hidden">
          {settings.title}
        </p>
        <div className="flex justify-between mb-2">
          <div className="tabs tabs-boxed bg-base-300">
            <a id="list" className={`tab tab-md ${activeTab === 'list' ? 'tab-active' : ''}`} onClick={() => setActiveTab('list')}>ボード</a>
            <a id="matrix" className={`tab tab-md ${activeTab === 'matrix' ? 'tab-active' : ''}`} onClick={() => setActiveTab('matrix')}>ボックス</a>
            <a id="complete" className={`tab tab-md ${activeTab === 'complete' ? 'tab-active' : ''}`} onClick={() => setActiveTab('complete')}> 完了 </a>
          </div>
        
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <span className="material-icons-outlined">menu</span>
            </label>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li>
                <a className="justify-between">
                  {user && user.name}

                  <div className="avatar">
                    <div className="rounded-full m-1 bg-white">
                      <span className="material-icons-outlined">person</span>
                    </div>
                  </div>
                </a>
              </li>
              <li><a>個人設定</a></li>
              <li><label onClick={_logout}>ログアウト</label></li>
            </ul>
          </div>

        </div>
        <div className="tab-body  bg-neutral w-full flex-grow rounded-xl shadow-center">
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
