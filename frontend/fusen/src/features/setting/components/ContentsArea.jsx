import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { settingsState, userState, fusensState } from "../../../state/atoms";



function ContentsArea() {
  const [settings, setSettings] = useRecoilState(settingsState);

  // 選択された付箋を拾ってモーダルに渡す
  const handleFusenClick = (fusen) => {

  };



  return (
    <>
    <div className="bg-base-200 m-10">
      contents
    </div>
    </>
  );
}

export default ContentsArea;
