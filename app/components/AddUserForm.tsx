"use client";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";

interface FormData {
  name: string;
  email: string;
  age: number;
}

const AddUserForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    age: 0,
  });

  const router = useRouter();

  //Change formData state when input changes
  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      await fetch(`http://localhost:3000/api/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      //Refresh the page after adding a new user
      router.refresh();
      setFormData({ name: "", email: "", age: 0 });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleInputChange}
        />
      </label>
      <label htmlFor="email">
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={handleInputChange}
        />
      </label>
      <label htmlFor="age">
        <input
          type="number"
          name="age"
          placeholder="Age"
          onChange={handleInputChange}
        />
      </label>
      <button type="submit">Add user</button>
    </form>
  );
};

export default AddUserForm;
