import { useEffect, useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import DetailedFusen from "./DetailedFusen";


function ListContainer(props) {
	const {id, statusLabel, fusens, onFusenClick, borderColor, isCompleteList} = props;
	//今日の日付(時間は含まない)
	const today = new Date(new Date().toLocaleDateString());

	//リマインド対象かどうか
	const isRemaind = (remaind_at) => {
		// 付箋のリマインド日付(時間は含まない)
		const remaindDate = new Date(new Date(remaind_at).toLocaleDateString());
		
		// 完了以外、かつ今日>=remaind_atの場合true
		return id !== "fusens_4" && today >= remaindDate;
	};

	// 通常のリスト表示時の完了（id=fusens_4）の場合、最大１０件まで表示
	// (完了一覧で全件表示したあと、通常のリスト表示に戻った場合に、再取得せずに再利用するため）
	let _fusens =null;
	if (!isCompleteList && id === "fusens_4" && fusens.length > 10) {
		_fusens = fusens.slice(0, 10);
	}else {
		_fusens = fusens;
	}

	//リマインド対象を上部に表示するためのソート
	_fusens.sort((a, b) => {
		if (isRemaind(a.remaind_at) && !isRemaind(b.remaind_at)) {
			return -1;
		} else if (!isRemaind(a.remaind_at) && isRemaind(b.remaind_at)) {
			return 1;
		}
		return 0;
	});


  return (
    <>
			<div className={`overflow-auto border-l-4 border-t-4 ps-1 rounded-tl-xl ${borderColor} lg:border-0 lg:ps-0`}>
				<div className="badge w-full">{statusLabel}</div>
					<SortableContext items={_fusens} strategy={verticalListSortingStrategy}>

						{/* fusensがある場合,mapする  */}
						{_fusens && _fusens.map((fusen) => (
							<DetailedFusen
								key={fusen.id}
								id={fusen.id}
								fusen={fusen}
								onClick={() => onFusenClick(fusen)}
								isRemaind={isRemaind(fusen.remaind_at)}
								fusenColor={isRemaind(fusen.remaind_at) ? "bg-base-100" : "bg-base-100"}
								titleColor={isRemaind(fusen.remaind_at) ? "text-error" : ""}
							/>
						))}
					</SortableContext>
			</div>
    </>
  );
}

export default ListContainer;
