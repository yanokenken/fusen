import { atom } from 'recoil';

export const preferenceState = atom({
	key: 'preferenceState',
	default: {
		theme: 'light',
		lang: 'ja',
		mode: 'mock',
		title: 'FUSEEN'
	}
})

export const userState = atom({
	key: 'userState',
	default: {
		id: '',
		slug: '',
		name: '',
		avatar: '',
		email: '',
	},
})

export const fusensState = atom({
	key: 'fusensState',
	default: []
})

export const sideContentState = atom({
	key: 'sideContentState',
	default: {
		open: false,
	}
})

// 設定画面で選択されたメニューの状態
export const menuState = atom({
	key: 'menuState',
	default: {
		isPreferenceMode: false,
		selectedMenu: "preference",
	}
})

// 付箋の状態（未着手、進行中、完了）
export const fusenStatusState = atom({
	key: 'fusenStatusState',
	default: {
		0: "未着手",
		1: "進行中",
		2: "今日やる！",
		3: "完了",
	}
})

// toast
export const toastState = atom({
	key: 'toastState',
	default: {
		message: '',
		type: 'info',
		time: 3000,
	}
})

// ローダーの表示制御
export const loadingState = atom({
	key: 'loadingState',
	default: false,
})