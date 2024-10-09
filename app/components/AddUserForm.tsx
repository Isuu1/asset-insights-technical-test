"use client";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";

import styles from "./addUserForm.module.css";

interface FormData {
  name: string;
  email: string;
  age: number;
  image: string;
}

const AddUserForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    age: 0,
    image: "/images/avatar.png",
  });

  const router = useRouter();

  //Change formData state when input changes
  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL as string}/post`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      //Refresh the page after adding a new user
      router.refresh();
      setFormData({ name: "", email: "", age: 0, image: "" });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Add new user</h2>
      <div className={styles.formInputs}>
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
      </div>
      <button type="submit">Add user</button>
    </form>
  );
};

export default AddUserForm;
