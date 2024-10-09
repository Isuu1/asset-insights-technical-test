import styles from "./page.module.css";

import AddUserForm from "./components/AddUserForm";
import DeleteUserButton from "./components/DeleteUserButton";
import Image from "next/image";

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
  const data: UserData[] = await response.json();
  console.log(data);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <AddUserForm />
        <div className={styles.usersContainer}>
          {data.map((user) => (
            <div className={styles.userCard} key={user._id}>
              <Image
                src={user.image}
                alt={user.name}
                width={200}
                height={200}
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
              <DeleteUserButton id={user._id} />
            </div>
          ))}
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
