import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { settingsState, userState, fusensState } from "../../../state/atoms";
import { getPreference } from "../api/getPreference";
import { putTheme } from "../api/putPreference";





function ContentsArea() {
  const [settings, setSettings] = useRecoilState(settingsState);
  const [activeTab, setActiveTab] = useState("system"); 

  // 表示されたタイミングでgetPreferencesを実行
  useEffect(() => {
    getPreference()
    .then((res) => {
      console.log(res);
      setSettings({...settings, theme: res.theme});
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
      setSettings({...settings, theme: e.target.value});
      console.log(e.target.value);
      putTheme({theme: e.target.value});
    }
  }



  return (
    <>
    <div className="flex justify-between my-2">
      <div className="tabs tabs-boxed bg-base-300">
        <a id="system" className={`tab tab-md ${activeTab === 'system' ? 'tab-active' : ''}`} onClick={() => setActiveTab('system')}>システム</a>
      </div>
      {/* <Menu /> */}
    </div>
    <div className="tab-body bg-base-200 w-full flex-grow rounded-xl shadow-center">
      <div className="py-2 px-4">
        <div class="form-control w-full max-w-xs">
          <label class="label">
            <span class="label-text">テーマカラー</span>
          </label>
          <select id="select-theme" class="select select-bordered" onChange={setTheme()}>
            <option selected>light</option>
            <option>light2</option>
            <option>light3</option>
            <option>light4</option>
            <option>dark</option>
            <option>dark2</option>
            <option>dark3</option>
            <option>dark4</option>
          </select>
        </div>
      </div>
    </div>

    </>  );
}

export default ContentsArea;
