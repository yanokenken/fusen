import Cookies from 'js-cookie';

// ログイン状態を確認する関数
export const isLoggedIn = () => {
  // 'auth'という名前のクッキーからJWTを取得
  const token = Cookies.get('auth');

  // JWTが存在する場合はtrue、存在しない場合はfalseを返す
  return !!token;
}
