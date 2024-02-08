import React, { useEffect, useState } from "react";
import LabelCheckbox from "../../../components/LabelCheckbox";

import { useSetRecoilState, useRecoilValue } from "recoil";
import { settingsState } from "../../../state/atoms";


function SideMenu({ closeDrawer }) {

  return (
    <>
      <div className="m-auto">
        <ul className="menu bg-base-200 w-56 rounded-box">
         <li>システム設定</li>
        </ul>
      </div>
    </>
  );
}
export default SideMenu;
