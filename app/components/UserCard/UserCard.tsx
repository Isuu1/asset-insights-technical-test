"use client";

import Image from "next/image";
import styles from "./userCard.module.css";
import DeleteUserButton from "../DeleteUserButton/DeleteUserButton";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { formSchema } from "@/app/validations/form";
import { ZodError } from "zod";

interface UserData {
  name: string;
  age: number;
  email: string;
  _id: string;
}

interface UserCardProps {
  user: UserData;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  //If enabled all input fields will be editable
  const [isEditing, setIsEditing] = useState(false);
  //Error state to store validation issues
  const [error, setError] = useState<ZodError["issues"] | null>(null);

  const [formData, setFormData] = useState<UserData>({
    name: user.name,
    age: user.age,
    email: user.email,
    _id: user._id,
  });

  const router = useRouter();

  const handleEdit = () => {
    console.log("Edit button clicked");
    setIsEditing(!isEditing);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const handleSave = async () => {
    // Validate form data
    const validate = formSchema.safeParse(formData);

    // If validation fails, set error state
    if (!validate.success) {
      setError(validate.error.issues);
      return;
    }
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL as string}/update/${
          user._id
        }`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      //Refresh the page after adding a new user
      toast.success("Details changed successfuly!");
      //Refresh the page after adding a new user to display new data
      router.refresh();
      //Turn off editing mode
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update user", error);
    }
  };

  return (
    <div className={styles.userCard}>
      <DeleteUserButton id={user._id} />
      {isEditing ? (
        <form className={styles.form}>
          <h2 className={styles.headline}>Edit user details</h2>
          <label htmlFor="name">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <p className={styles.error}>
            {
              error?.find((issue) => issue.path[0] === "name")
                ?.message
            }
          </p>
          <label htmlFor="age">
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </label>
          <p className={styles.error}>
            {error?.find((issue) => issue.path[0] === "age")?.message}
          </p>
          <label htmlFor="email">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <p className={styles.error}>
            {
              error?.find((issue) => issue.path[0] === "email")
                ?.message
            }
          </p>
        </form>
      ) : (
        <>
          <Image
            src="/images/avatar.png"
            alt={user.name}
            width={150}
            height={150}
          />
          <h3>
            <span>Name: </span>
            {user.name}
          </h3>
          <p>
            <span>Age: </span>
            {user.age}
          </p>
          <p>
            <span>Email: </span>
            {user.email}
          </p>
        </>
      )}
      {isEditing ? (
        <button className={styles.editButton} onClick={handleSave}>
          Save
        </button>
      ) : (
        <button className={styles.editButton} onClick={handleEdit}>
          Edit details
        </button>
      )}
    </div>
  );
};

export default UserCard;
