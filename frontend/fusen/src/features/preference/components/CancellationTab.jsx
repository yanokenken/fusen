import { useRecoilState } from "recoil";
import { preferenceState, userState, } from "../../../state/atoms";
import CancellationModal from "./CancellationModal";


function CancellationTab() {
  const [user, setUser] = useRecoilState(userState);

  const cancellation = () => {
    console.log('cancellation');
  }

  return (
    <>
      <div className="alert alert-warning m-4 w-fit">
        <span>          
          ※解約直後に、現在のデータはすべて完全に削除されます。
          <br />
          （エクスポート機能は近いうちに実装する予定です）
        </span>
      </div>

      <div className="py-2 px-4">
        <label htmlFor="cancellation_modal" className="btn btn-error w-54">
          アカウントを削除（解約）する
          <span className="material-symbols-outlined">person_remove</span>
        </label>
      </div>
      <CancellationModal />
    </>
  );
}

export default CancellationTab;
