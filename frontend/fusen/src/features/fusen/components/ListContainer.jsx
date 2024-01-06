import { useEffect, useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import DetailedFusen from "./DetailedFusen";


function ListContainer(props) {
	const {id, statusLabel, fusens, onFusenClick} = props;
  return (
    <>
			<div id={id} className="overflow-auto border-l-4 border-t-4 ps-1 rounded-tl-xl border-secondary lg:border-0 lg:ps-0">
				<div className="badge w-full">{statusLabel}</div>
					<SortableContext items={fusens} strategy={verticalListSortingStrategy}>
						{fusens.map((fusen) => (
							<DetailedFusen
								key={fusen.id}
								id={fusen.id}
								fusen={fusen}
								onClick={() => onFusenClick(fusen)}
							/>
						))}
					</SortableContext>
			</div>
    </>
  );
}

export default ListContainer;
