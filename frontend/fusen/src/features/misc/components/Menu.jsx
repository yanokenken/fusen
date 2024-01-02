import { useNavigate } from "react-router-dom";

import { useRecoilState } from "recoil";
import { settingsState, userState, fusensState } from "../../../state/atoms";

import Cookies from 'js-cookie';

function Menu () {
	const [settings, setSettings] = useRecoilState(settingsState);
  const [user, setUser] = useRecoilState(userState);

	const navigate = useNavigate();

	const logout = () => {
    Cookies.remove('auth');
    setUser({...user, name:"お試し太郎", });
    setSettings({...settings, mode: "mock", title: "preview" });
    navigate("/");
  };


	return (
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
			<li><label onClick={logout}>ログアウト</label></li>
		</ul>
	</div>

	)
}

export default Menu;