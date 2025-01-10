import { useNavigate, Link } from "react-router-dom";

import { useRecoilState } from "recoil";
import { userState, menuState } from "../../../state/atoms";

import Cookies from "js-cookie";

function Avatar() {
  return (
    <div className="avatar">
      <div className="rounded-full bg-white me-2">
        <span className="material-icons-outlined">person</span>
      </div>
    </div>
  );
}

function Menu() {
  const [user, setUser] = useRecoilState(userState);
  const [menu, setMenu] = useRecoilState(menuState);
  const navigate = useNavigate();

  const logout = () => {
    Cookies.remove("auth");
    navigate("/");
  };

  return (
    <div className="dropdown dropdown-end flex">
      <Link to="/board">
        <div className="m-auto btn btn-ghost">
          <div className="flex justify-between items-center w-full">
            <Avatar />
            <div className="hidden lg:block">{user && user.name}</div>
          </div>
        </div>
      </Link>

      <ul
        tabIndex={0}
        className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
      >
        <li>
          <Link
            to="/preference"
            onClick={() => setMenu({ ...menu, isPreferenceMode: true })}
          >
            <span className="material-icons-outlined">settings</span>
            <span>設定</span>
          </Link>
        </li>
        <li></li>
        <li>
          <label onClick={logout}>
            <span className="material-icons-outlined">logout</span>
            <span>ログアウト</span>
          </label>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
