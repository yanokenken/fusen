function LabelCheckbox({ label, value, onChange }) {
  return (
    <label className="cursor-pointer label">
      <span className="badge badge-lg badge-ghost w-full mx-2">{label}</span>
      <input
        type="checkbox"
        className="toggle toggle-primary toggle-lg"
        checked={value}
        onChange={onChange}
      />
    </label>
  );
}

export default LabelCheckbox;
