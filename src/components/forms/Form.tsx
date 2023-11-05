import { FieldValues, useForm } from "react-hook-form";

interface FormData {
  name: string;
  amount: number;
}

const ExpenseForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FieldValues) => console.log(data);

  return (
    <div className="m-2">
      <h2>Expense Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name</label>
        <input
          {...register("name", { required: true, minLength: 3 })}
          type="text"
          id="name"
          className="form-control"
        />

        {errors.name?.type === "required" && <p>The name field is required</p>}
        {errors.name?.type === "minLength" && (
          <p> The name must be at least 3 characters </p>
        )}

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
