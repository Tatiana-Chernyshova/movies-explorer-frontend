import "./FilterCheckbox.css";

function FilterCheckbox({ setIsChecked }) {
  function onChange(e) {
    setIsChecked(e.target.checked)
  }

  return (
    <div className="filter">
      <label className="filter__switch">
        <input
          className="filter__checkbox"
          type="checkbox"
          onChange={(e) => onChange(e)}
        />
        <span className="filter__slider"></span>
      </label>
      <span className="filter__text">Короткометражки</span>
    </div>
  );
}

export default FilterCheckbox;
