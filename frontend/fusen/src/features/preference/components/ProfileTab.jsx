import { useRecoilState } from "recoil";
import { preferenceState, userState, } from "../../../state/atoms";


function ProfileTab() {
  const [user, setUser] = useRecoilState(userState);

  return (
    <>
      <div className="alert alert-warning m-4 w-fit">
        <span>現在α版につき、未実装です。（近日実装予定です）</span>
      </div>

      <div className="py-2 px-4">
        <div className="form-control ">
          <label className="label">
            <span className="label-text">名前</span>
          </label>
          <input
            type="text"
            maxLength={200}
            className="input w-56 mb-4 xl:mt-0 raunded-xl"
            placeholder="名前"
            value={user.name}
            onChange={() => {}}
          />
        </div>

        <div className="form-control ">
          <label className="label">
            <span className="label-text">Eメール</span>
          </label>
          <input
            type="text"
            maxLength={200}
            className="input w-80 mb-4 xl:mt-0 raunded-xl"
            placeholder="Eメール"
            value={user.email}
            onChange={() => {}}
          />
        </div>
      </div>
    </>
  );
}

export default ProfileTab;
