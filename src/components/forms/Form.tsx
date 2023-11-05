import { FormEvent } from "react";

const ExpenseForm = () => {
  const handlSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log("submitted");
  };

  return (
    <div className="m-2">
      <h2>Expense Form</h2>
      <form onSubmit={handlSubmit}>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input type="text" id="description" className="form-control" />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input type="text" id="amount" className="form-control" />
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
