import React from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

function SortableCheckpoint({ checkpoint, isLast, scrollRef, onStatusChange, onBodyChange, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: checkpoint.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={(node) => {
        setNodeRef(node);
        if (isLast && scrollRef) scrollRef.current = node;
      }}
      style={style}
      {...attributes}
      className="flex items-center gap-1 py-1"
      id={checkpoint.id}
    >
      <span
        className="material-icons text-sm cursor-grab touch-none select-none opacity-50"
        {...listeners}
      >
        drag_indicator
      </span>
      <label className="label cursor-pointer">
        <input
          type="checkbox"
          className="checkbox hover:checkbox-neutral"
          checked={checkpoint.is_checked}
          onChange={(e) => onStatusChange(e, checkpoint.id, "checkpointStatus")}
        />
      </label>
      <textarea
        maxLength={100}
        className="input input-md input-bordered flex-1 sbar"
        placeholder="チェックポイント"
        value={checkpoint.body}
        onChange={(e) => onBodyChange(e, checkpoint.id, "checkpointBody")}
      />
      <button
        className="btn btn-sm btn-ghost ms-0"
        onClick={() => onDelete(checkpoint.id)}
      >
        <span className="material-icons-outlined">delete</span>
      </button>
    </div>
  );
}

export default SortableCheckpoint;
