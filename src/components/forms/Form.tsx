import { FormEvent, useRef } from "react";

const ExpenseForm = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);

  const person = { name: "", amount: 0 };

  const handlSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (nameRef.current !== null) person.name = nameRef.current.value;
    if (amountRef.current !== null)
      person.amount = parseInt(amountRef.current.value);
    console.log(person);
  };

  return (
    <div className="m-2">
      <h2>Expense Form</h2>
      <form onSubmit={handlSubmit}>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            ref={nameRef}
            type="text"
            id="description"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            ref={amountRef}
            type="text"
            id="amount"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input type="text" id="category" className="form-control" />
        </div>

        <button type="submit" className="btn mt-3 btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
