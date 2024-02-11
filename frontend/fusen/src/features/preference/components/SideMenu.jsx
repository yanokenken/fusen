import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useRecoilState, useSetRecoilState } from "recoil";
import { preferenceState, userState, menuState, sideContentState } from "../../../state/atoms";

function Avatar() {
  return (
    <div className="avatar">
      <div className="rounded-full bg-white me-2">
        <span className="material-icons-outlined">person</span>
      </div>
    </div>
  );
}
function SideMenu({ closeDrawer }) {
    

	const [preference, setPreference] = useRecoilState(preferenceState);
  const [user, setUser] = useRecoilState(userState);
  const [menu, setMenu] = useRecoilState(menuState);
  const setSideContent = useSetRecoilState(sideContentState);
	const sideClose = () => setSideContent({open:false})

  const navigate = useNavigate();

  useEffect(() => {
    console.log('menu.selectedMenu', menu.selectedMenu)
    if(menu.selectedMenu === '') {
      setMenu({...menu, selectedMenu: 'preference'});
    }
  }, []);

  const selectMenu = (selectedMenu) => {
    // to の値を取得して、menu.selectedMenuにセットする
    setMenu({...menu, selectedMenu: selectedMenu});
  }

  return (
    <>
      <div className="h-[100vh] lg:h-[85vh] py-4">
        <div className="lg:hidden badge badge-outline badge-xl h-[2rem] cursor-pointer mb-4" onClick={sideClose}>✕</div>
        <ul className="menu bg-base-200 w-full rounded-box m-auto space-y-2">
          <li>
            <Link to="/board" onClick={() => {selectMenu(''); sideClose(); setMenu({...menu, isPreferenceMode:false})}}>
              <span className="material-icons-outlined">dashboard</span>
              <span>トップに戻る</span>
            </Link>
          </li>
          <li></li>
          <li>
            <Link to="/preference" onClick={() => {selectMenu('preference'); sideClose()}} className={`${menu.selectedMenu === 'preference' ? 'active' : ''}`}>
              <span className="material-icons-outlined">settings</span>
              <span>システム設定</span>
            </Link>
          </li>
          <li>
            <Link to="/profile" onClick={() => {selectMenu('profile'); sideClose()}}  className={`${menu.selectedMenu === 'profile' ? 'active' : ''}` }>
              <div className="flex justify-between items-center w-full">
                <Avatar />
                <div>プロフィール設定</div>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
export default SideMenu;
