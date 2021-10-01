import "./FilterCheckbox.css";

function FilterCheckbox() {
  return (
    <div className="filter">
      <label className="filter__switch">
        <input className="filter__checkbox" type="checkbox" />
        <span className="filter__slider"></span>
      </label>
      <span className="filter__text">Короткометражки</span>
    </div>
  );
}

export default FilterCheckbox;
