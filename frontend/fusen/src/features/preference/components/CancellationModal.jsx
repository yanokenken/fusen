import { useNavigate } from 'react-router-dom';
import {deleteUser} from "../api/deleteUser";
import Cookies from "js-cookie";

function LoginModal(modalId) {

  const navigate = useNavigate();

  const cancellation = () => {
    deleteUser().then((res) => {
      Cookies.remove('auth');
      alert('アカウントを削除しました。ご利用ありがとうございました。');    
      navigate("/");
    }).catch((error) => {
      if (error.response) {
        console.error(error.response.data);
        alert("アカウントの削除に失敗しました。\n" + error.response.data.message);
      } else {
        console.error("Error", error.message);
        alert(error.message);
      }
    });

  }

  return (
    <>
      <input type="checkbox" id="cancellation_modal" className="modal-toggle" onChange={()=>{}} />
      <div className="modal">
        <div className="modal-box">
          <h1 className="text-center">
            <span className="font-bold text-lg px-2">アカウントを完全に削除して良いですか？</span>
          </h1>
          <button type="submit" className="btn btn-error w-full mt-4 " onClick={cancellation}>
            はい
          </button>
          <label className="btn btn-primary w-full mt-4 " onClick={()=>{}} htmlFor="cancellation_modal">
            思いとどまる
          </label>
        </div>
        <label className="modal-backdrop" htmlFor="cancellation_modal">Close</label>
      </div>
    </>
  );
}

export default LoginModal;
