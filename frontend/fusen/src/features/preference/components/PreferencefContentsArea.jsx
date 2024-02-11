import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { preferenceState, userState, fusensState } from "../../../state/atoms";
import { getPreference } from "../api/getPreference";
import { putTheme } from "../api/putPreference";





function ContentsArea() {
  const [preference, setPreference] = useRecoilState(preferenceState);
  const [activeTab, setActiveTab] = useState("system"); 

  // 表示されたタイミングでgetPreferencesを実行
  useEffect(() => {
    getPreference()
    .then((res) => {
      setPreference({...preference, theme: res.theme});
      // id=select-themeの中にあるoptionのvalueが、res.themeと同じものに、'selected'を付与する
      const selectTheme = document.getElementById('select-theme');
      console.log(selectTheme);
      for (let i = 0; i < selectTheme.options.length; i++) {
        if (selectTheme.options[i].value === res.theme) {
          selectTheme.options[i].selected = true;
        }else{
          selectTheme.options[i].selected = false;
        }
      }      
    })
  } ,[]);

  const setTheme = () => {
    return (e) => {
      setPreference({...preference, theme: e.target.value});
      putTheme({theme: e.target.value});
    }
  }



  return (
    <>
    <div className="flex justify-between my-2">
      <div className="tabs tabs-boxed bg-base-300">
        <a id="system" className={`tab tab-md ${activeTab === 'system' ? 'tab-active' : ''}`} onClick={() => setActiveTab('system')}>システム</a>
      </div>
    </div>
    <div className="tab-body bg-base-200 w-full flex-grow rounded-xl shadow-center">
      <div className="py-2 px-4">
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">テーマカラー</span>
          </label>
          <select id="select-theme" className="select select-bordered" value={preference.theme} onChange={setTheme()}>
            <option value="light">light</option>
            <option value="light2">light2</option>
            <option value="light3">light3</option>
            <option value="light4">light4</option>
            <option value="dark">dark</option>
            <option value="dark2">dark2</option>
            <option value="dark3">dark3</option>
            <option value="dark4">dark4</option>
          </select>
        </div>
      </div>
    </div>

    </>  );
}

export default ContentsArea;
