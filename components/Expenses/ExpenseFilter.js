import styles from  './ExpenseFilter.module.scss';

const ExpenseFilter = (props) => {
  const onYearChangeHandler = (event) => {
    props.onYearChange(event.target.value);
  }

  const year = new Date().getFullYear()

  return (
    <div className={styles["expenses-filter"]}>
      <div className={styles["expenses-filter__control"]}>
        <label className="mediumTertiaryText">Filter by year</label>
        <select value={props.selectedYear} onChange={onYearChangeHandler}>
          {Array.from({ length: 5 }, (x, i) => i).map((num, idx) => {
            return (
              <option key={idx} value={year - idx}>
                {year - idx}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}

export default ExpenseFilter;