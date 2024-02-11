import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { preferenceState, userState, } from "../../../state/atoms";
import { getPreference } from "../api/getPreference";
import { putTheme } from "../api/putPreference";

import ProfileTab from "./ProfileTab";
import CancellationTab from "./CancellationTab";

function ContentsArea() {
  const [user, setUser] = useRecoilState(userState);
  const [activeTab, setActiveTab] = useState("profile"); 


  // 表示されたタイミングでgetPreferencesを実行
  useEffect(() => {

  } ,[]);

  return (
    <>
    <div className="flex justify-between my-2">
      <div className="tabs tabs-boxed bg-base-300">
        <a id="profile" className={`tab tab-md ${activeTab === 'profile' ? 'tab-active' : ''}`} onClick={() => setActiveTab('profile')}>プロフィール</a>
        <a id="cancellation" className={`tab tab-md ${activeTab === 'cancellation' ? 'tab-active' : ''}`} onClick={() => setActiveTab('cancellation')}>アカウント削除</a>
        {/* <a id="support" className={`tab tab-md ${activeTab === 'support' ? 'tab-active' : ''}`} onClick={() => setActiveTab('support')} disabled>サポート（未実装）</a> */}
      </div>
      {/* <Menu /> */}
    </div>
    <div className="tab-body bg-base-200 w-full flex-grow rounded-xl shadow-center">
    {activeTab === 'profile' && <ProfileTab />}
    {activeTab === 'cancellation' && <CancellationTab />}
    </div>

    </>  );
}

export default ContentsArea;
