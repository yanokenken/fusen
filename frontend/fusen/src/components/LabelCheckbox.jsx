function LabelCheckbox({ label }) {
  return (
    <label className="cursor-pointer label">
      <span className="badge badge-lg badge-ghost w-full mx-2">{label}</span>
      <input type="checkbox" className="toggle toggle-primary toggle-lg" />
    </label>
  );
}

export default LabelCheckbox;