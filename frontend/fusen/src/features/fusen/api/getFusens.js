import api from '../../../middleware/axios'

const fusenMocks = Promise.resolve([
	{
		id: 1,
    fusenTitle: "色々登録してみよう", // タスク名
    fusenMemo: "表はアイゼンハワーマトリクスです。", // メモ
    isUrgent: true, // 急ぎ
    isImportant: true, // 重要
    status: 0, // 進行ステータス（0:未着手/1:進行中/2:今日中/completed:完了）
    checkpoints: [
			{id: "1abc", body: "付箋を登録してみる", isChecked: false},
			{id: "2abc", body: "付箋を編集してみる", isChecked: false},
			{id: "3abc", body: "付箋を完了にしてみる", isChecked: false}
		],
	},
]);

export const getFusens = async () => {
	// debug用１秒待機
	// await new Promise(resolve => setTimeout(resolve, 1000));
	const ret = await api.get('/api/secure/fusens')
	.then((res) => {
		return res.data;
	})
	return ret;
}

export const getKanryoFusens = async (param='') => {
	const ret = await api.get('/api/secure/fusens/kanryo', {
		params: {
			search: param
		}
	}).then((res) => {
		return res.data;
	})
	return ret;
}