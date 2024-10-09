import styles from "./page.module.css";

import AddUserForm from "./components/AddUserForm";
import DeleteUserButton from "./components/DeleteUserButton";

interface UserData {
  name: string;
  age: number;
  email: string;
  _id: string;
}

export default async function Home() {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL as string,
    {
      cache: "no-store",
    }
  );
  const data: UserData[] = await response.json();
  console.log(data);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <AddUserForm />
        {data.map((user) => (
          <div key={user._id}>
            <h1>{user.name}</h1>
            <p>{user.age}</p>
            <p>{user.email}</p>
            <DeleteUserButton id={user._id} />
          </div>
        ))}
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
