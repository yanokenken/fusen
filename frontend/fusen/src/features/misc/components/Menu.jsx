import { useNavigate, Link } from "react-router-dom";

import { useRecoilState } from "recoil";
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

function Menu () {
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
		<div className="dropdown dropdown-end flex">
			<div className="m-auto btn btn-ghost">
				<Link to="/board" >
					<div className="flex justify-between items-center w-full">
						<Avatar />
						<div>{user && user.name}</div>
					</div>
				</Link>
			</div>
			<label tabIndex={0} className="btn btn-ghost btn-circle">
				<span className="material-icons-outlined">menu</span>
			</label>
			<ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
				<li>
					<Link to="/preference">
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
	)
}

export default Menu;
