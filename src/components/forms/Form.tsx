import { FieldValues, useForm } from "react-hook-form";

const ExpenseForm = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: FieldValues) => console.log(data);

  return (
    <div className="m-2">
      <h2>Expense Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name</label>
        <input
          {...register("name")}
          type="text"
          id="name"
          className="form-control"
        />

        <label htmlFor="amount">Amount</label>
        <input
          {...register("amount")}
          type="text"
          id="amount"
          className="form-control"
        />

        <button type="submit" className="btn mt-3 btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
