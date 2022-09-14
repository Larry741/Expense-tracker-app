import ChartBar from './ChartBar';

import styles from './Chart.module.scss';

const Chart = props => {
  const reducedExpenses = props.expenseList.map((expense) => expense.value);
  const maxValue = Math.max(...reducedExpenses);
  
  return (
    <div className={styles.chart}>
      {props.expenseList.map((expense) => (
        <ChartBar
          key={expense.label}
          value={expense.value}
          maxValue={maxValue}
          label={expense.label}
        />
      ))}
    </div>
  );
}

export default Chart;