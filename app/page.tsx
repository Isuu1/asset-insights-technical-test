import styles from "./page.module.css";

import AddUserForm from "./components/AddUserForm/AddUserForm";
import UserCard from "./components/UserCard/UserCard";

interface UserData {
  name: string;
  age: number;
  email: string;
  _id: string;
  image: string;
}

export default async function Home() {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL as string,
    {
      cache: "no-store",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  const data: UserData[] = await response.json();
  console.log(data);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <AddUserForm />
        <div className={styles.usersContainer}>
          {data.map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
          {!data.length && (
            <div className={styles.missingUsers}>
              <h3>No users found</h3>
              <p>Add user using the form above</p>
            </div>
          )}
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
