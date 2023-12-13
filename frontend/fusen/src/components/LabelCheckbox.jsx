import { useState } from "react";
function LabelCheckbox({ label, checked, onChange, colorSuffix }) {

  return (
    <label className={`cursor-pointer label`}>
      <input
        type="checkbox"
        className={`checkbox me-4 `} // ここでclassNameを受け取る
        checked={checked}
        onChange={onChange}
      />
      <span className={`badge badge-lg w-full mx-2`}>{label}</span>
    </label>
  );
}

export default LabelCheckbox;
