import ExpenseForm from './ExpenseForm';
import styles from './NewExpense.module.scss';

const NewExpense = (props) => {
  
  return (
    <div className={styles["new-expense"]}>
      <ExpenseForm />
    </div>
  );
}

export default NewExpense