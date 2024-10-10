import Image from "next/image";
import styles from "./userCard.module.css";
import DeleteUserButton from "../DeleteUserButton";

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
  return (
    <div className={styles.userCard}>
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
      <DeleteUserButton id={user._id} />
    </div>
  );
};

export default UserCard;
