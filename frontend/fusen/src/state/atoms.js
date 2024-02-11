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