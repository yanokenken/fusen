
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
	{id:2,fusenTitle:"タスク2",fusenMemo:"メモメモ",isUrgent:true,isImportant:true,status:1,checkpoints:[{id:"1abc",body:"チェックポイント１", isChecked: true},{id:"2abc",body:"チェックポイント２", isChecked: false}],},
	{id:3,fusenTitle:"タスク3",fusenMemo:"メモメモ",isUrgent:true,isImportant:true,status:2,checkpoints:[{id:"1abc",body:"チェックポイント１", isChecked: true},{id:"2abc",body:"チェックポイント２", isChecked: false}],},
	{id:4,fusenTitle:"タスク4",fusenMemo:"メモメモ",isUrgent:true,isImportant:true,status:3,checkpoints:[{id:"1abc",body:"チェックポイント１", isChecked: true},{id:"2abc",body:"チェックポイント２", isChecked: false}],},
	{id:5,fusenTitle:"タスク4",fusenMemo:"メモメモ",isUrgent:true,isImportant:true,status:3,checkpoints:[{id:"1abc",body:"チェックポイント１", isChecked: true},{id:"2abc",body:"チェックポイント２", isChecked: false}],},

]);

export const getFusens = async () => {
	// todo 最終的にはAPI化する
		return await fusenMocks;

}