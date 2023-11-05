import { FieldValues, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface FormData {
  name: string;
  amount: number;
}

const schema = z.object({
  name: z.string().min(3, "Minimum 3 characters required"),
  amount: z
    .number({ invalid_type_error: " Amount  is required" })
    .min(18, "Minimum 18 characters required"),
});

const ExpenseForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

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

        {errors.name && <p>{errors.name.message}</p>}

        <label htmlFor="amount">Amount</label>
        <input
          {...register("amount", { valueAsNumber: true })}
          type="text"
          id="amount"
          className="form-control"
        />

        {errors.amount && <p>{errors.amount.message}</p>}

        <button
          type="submit"
          disabled={!isValid}
          className="btn mt-3 btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
