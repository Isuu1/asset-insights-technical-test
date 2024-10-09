"use client";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { ZodError } from "zod"; // Import ZodError

import styles from "./addUserForm.module.css";
import { formSchema } from "../validations/form";

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
  const [error, setError] = useState<ZodError["issues"] | null>(null); // Update error state type

  const router = useRouter();

  //Change formData state when input changes
  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      //If input type is number, convert value to number
      [name]: type === "number" ? Number(value) : value,
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // Validate form data
    const validate = formSchema.safeParse(formData);

    // If validation fails, set error state
    if (!validate.success) {
      setError(validate.error.issues);
      return;
    }

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
  console.log("Error:", error);
  console.log("FormData:", formData);
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.headline}>Add new user</h2>
      <div className={styles.formInputs}>
        <label htmlFor="name">
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleInputChange}
          />
        </label>
        <p className={styles.error}>
          {error?.find((issue) => issue.path[0] === "name")?.message}
        </p>
        <label htmlFor="email">
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={handleInputChange}
          />
        </label>
        <p className={styles.error}>
          {error?.find((issue) => issue.path[0] === "email")?.message}
        </p>
        <label htmlFor="age">
          <input
            type="number"
            name="age"
            placeholder="Age"
            onChange={handleInputChange}
          />
        </label>
        <p className={styles.error}>
          {error?.find((issue) => issue.path[0] === "age")?.message}
        </p>
      </div>
      <button type="submit">Add user</button>
    </form>
  );
};

export default AddUserForm;
