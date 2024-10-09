import styles from "./page.module.css";

import AddUserForm from "./components/AddUserForm";
import DeleteUserButton from "./components/DeleteUserButton";

interface UserData {
  name: string;
  age: number;
  email: string;
}

export default async function Home() {
  const response = await fetch("http://localhost:3000/api", {
    cache: "no-store",
  });
  const data: UserData[] = await response.json();
  console.log(data);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <AddUserForm />
        {data.map((user) => (
          <div key={user.email}>
            <h1>{user.name}</h1>
            <p>{user.age}</p>
            <p>{user.email}</p>
            <DeleteUserButton />
          </div>
        ))}
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
