import { atom } from 'recoil';

export const settingsState = atom({
	key: 'settingsState',
	default: {
		theme: 'light',
		lang: 'ja',
		mode: 'mock',
		title: 'PREVIEW'
	}
})

export const userState = atom({
	key: 'userState',
	default: {
		id: '',
		slug: '',
		name: '',
		avatar: '',

	}
})

export const fusensState = atom({
	key: 'fusensState',
	default: []
})