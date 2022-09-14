import Card from '../UI/Card';
import styles from "./ExpenseItem.module.scss";

const ExpenseItem = (props) => {
  const month = new Date(props.date).toLocaleString("en-US", { month: "long" });
  const day =  new Date (props.date).toLocaleString("en-US", { day: "2-digit" });
  const year = new Date(props.date).getFullYear();

 
  return (
    <Card className={styles["expense-item"]}>
      <div className={styles["expense-date"]}>
        <div className={`${styles["expense-date__month"]} verySmallText`}>
          {month}
        </div>
        <div className={`${styles["expense-date__year"]} smallest-text`}>
          {year}
        </div>
        <div className={`${styles["expense-date__day"]} tertiaryText`}>
          {day}
        </div>
      </div>
      <div className={`${styles["expense-item__description"]} small-text`}>
        <h2 className="small-text">{props.title}</h2>
        <div className={styles["expense-item__price"]}>${props.amount}</div>
      </div>
    </Card>
  );
}

export default ExpenseItem;
