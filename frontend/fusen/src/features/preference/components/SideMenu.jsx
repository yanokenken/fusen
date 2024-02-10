import React from "react";
import { useNavigate, Link } from "react-router-dom";

import { useRecoilState, useRecoilValue } from "recoil";
import { preferenceState, userState } from "../../../state/atoms";
import Cookies from 'js-cookie';


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
  const navigate = useNavigate();

	const logout = () => {
    Cookies.remove('auth');
    setUser({...user, name:"お試し太郎", });
    setPreference({...preference, mode: "mock", title: "preview" });
    navigate("/");
  };

  return (
    <>
      <div>
        <ul className="menu bg-base-200 w-full rounded-box m-auto">
          <li>
            <Link to="/board" >
              <span className="material-icons-outlined">dashboard</span>
              <span>トップに戻る</span>
            </Link>
          </li>
          <li></li>
          <li>
            <Link to="/preference">
              <span className="material-icons-outlined">settings</span>
              <span>システム設定</span>
            </Link>
          </li>
          <li>
            <Link to="/board" >				
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
