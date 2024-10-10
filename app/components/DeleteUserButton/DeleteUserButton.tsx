"use client";

import { useRouter } from "next/navigation";
import React from "react";
import styles from "./deleteUserButton.module.css";

interface DeleteUserButtonProps {
  id: string;
}

const DeleteUserButton: React.FC<DeleteUserButtonProps> = ({
  id,
}) => {
  const router = useRouter();

  async function handleDelete() {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL as string}/delete/${id}`,
        {
          method: "DELETE",
        }
      );
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <button className={styles.deleteButton} onClick={handleDelete}>
      Delete
    </button>
  );
};

export default DeleteUserButton;
