import { FormEvent, useState } from "react";

const ExpenseForm = () => {
  const [person, setPerson] = useState({
    name: " ",
    amount: "",
  });
  const handlSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(person);
  };

  return (
    <div className="m-2">
      <h2>Expense Form</h2>
      <form onSubmit={handlSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          onChange={(e) => setPerson({ ...person, name: e.target.value })}
          id="name"
          value={person.name}
          className="form-control"
        />

        <label htmlFor="amount">Amount</label>
        <input
          type="text"
          onChange={(e) => setPerson({ ...person, amount: e.target.value })}
          value={person.amount}
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
