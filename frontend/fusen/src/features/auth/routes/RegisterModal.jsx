import React, { useState } from "react";
import { postRegister } from "../api/postRegister";
import SimpleModal from "../../../components/SimpleModal";
function RegisterModal(modalId) {
  const userInfoObj = {
    name: "",
    slug: "",
    email: "",
    password: "",
  };
  const [userInfo, setUserInfo] = useState(userInfoObj);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const register = () => {
    setIsLoading(true);
    let newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }
    setErrors(newErrors);

    postRegister(userInfo)
      .then((res) => {
        console.log(res);
        // SimpleModalを開く
        alert(
          "登録に成功しました。届いた確認メールからメール認証を行ってください"
        );
        setIsLoading(false);
        //自分自身を閉じる
        document.getElementById("register_modal").checked = false;
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          alert(error.response.data);
        } else {
          console.log("Error", error.message);
          alert(error.message);
        }
        setIsLoading(false);
      });
  };

  // バリデーション
  const validate = () => {
    let newErrors = {};
    if (!userInfo.name) newErrors.name = "ユーザー名が入力されていません";
    if (!userInfo.slug) newErrors.slug = "ユーザーIDが入力されていません";
    if (!userInfo.email) newErrors.email = "メールアドレスが入力されていません";
    if (!userInfo.password)
      newErrors.password = "パスワードが入力されていません";

    // slugが半角英数,-,_以外の場合
    if (userInfo.slug && userInfo.slug.match(/[^a-zA-Z0-9_-]/)) {
      newErrors.slug = "ユーザーIDに使用できない文字が含まれています";
    }
    // slugが3文字未満の場合
    if (userInfo.slug && userInfo.slug.length < 3) {
      newErrors.slug = "ユーザーIDは3文字以上で入力してください";
    }
    // slugが20文字以上の場合
    if (userInfo.slug && userInfo.slug.length > 20) {
      newErrors.slug = "ユーザーIDは20文字以下で入力してください";
    }
    // passwordが8文字未満の場合
    if (userInfo.password && userInfo.password.length < 8) {
      newErrors.password = "パスワードは8文字以上で入力してください";
    }
    return newErrors;
  };

  return (
    <>
      <input type="checkbox" id="register_modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h1 className="text-center">
            <span className="font-bold text-lg px-2">新規登録</span>
          </h1>
          <p className="text-center">登録すると確認メールが送信されます。</p>

          <label className="label">
            <span className="label-text">ユーザー名</span>
          </label>
          <input
            type="text"
            placeholder="フセーン太郎"
            value={userInfo.name}
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
            className="input input-bordered w-full"
          />
          <label className="label">
            <span id="name" className="label-text-alt text-error">
              {errors.name}
            </span>
          </label>

          <label className="label">
            <span className="label-text">
              ユーザーid（半角英数 記号は「-」と「_」のみ）
            </span>
          </label>
          <input
            type="text"
            placeholder="fuseen_taro"
            value={userInfo.slug}
            onChange={(e) => setUserInfo({ ...userInfo, slug: e.target.value })}
            className="input input-bordered w-full"
          />
          <label className="label">
            <span id="slug" className="label-text-alt text-error">
              {errors.slug}
            </span>
          </label>

          <label className="label">
            <span className="label-text">Eメールアドレス</span>
          </label>
          <input
            type="email"
            placeholder="fuseen@example.com"
            value={userInfo.email}
            onChange={(e) =>
              setUserInfo({ ...userInfo, email: e.target.value })
            }
            className="input input-bordered w-full"
          />

          <label className="label">
            <span id="email" className="label-text-alt text-error">
              {errors.email}
            </span>
          </label>
          <label className="label">
            <span className="label-text">パスワード（8文字以上）</span>
          </label>
          <input
            type="password"
            placeholder=""
            value={userInfo.password}
            onChange={(e) =>
              setUserInfo({ ...userInfo, password: e.target.value })
            }
            className="input input-bordered w-full"
          />
          <label className="label">
            <span id="password" className="label-text-alt text-error">
              {errors.password}
            </span>
          </label>

          {/* <label className="label cursor-pointer w-fit mb-4">
            <input type="checkbox" checked="checked" className="checkbox me-2" />
            <span className="label-text ">利用規約に同意する</span> 
          </label> */}

          <button
            type="submit"
            className={`btn btn-primary w-full mb-4 `}
            onClick={register}
            disabled={isLoading}
          >
            {isLoading && <i className="loading loading-spinner"></i>}
            新規登録（確認メールを送信）
          </button>
        </div>
        <label className="modal-backdrop" htmlFor="register_modal">
          Close
        </label>
      </div>
      <SimpleModal
        modalId="confirm_modal"
        title="メールを送信しました"
        body="受信メールに記載されたURLよりメール認証を行ってください"
        button="閉じる"
      />
    </>
  );
}

export default RegisterModal;
