import React from "react";

const AddUserForm = () => {
  return (
    <form>
      <label htmlFor="name">
        <input type="text" name="name" placeholder="Name" />
      </label>
      <label htmlFor="email">
        <input type="text" name="email" placeholder="Email" />
      </label>
      <label htmlFor="age">
        <input type="number" name="age" placeholder="Age" />
      </label>
      <button type="submit">Add user</button>
    </form>
  );
};

export default AddUserForm;
