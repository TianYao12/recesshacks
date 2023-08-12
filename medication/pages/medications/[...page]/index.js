import { useRouter } from "next/router";
import styles from "../../../styles/medications.module.css";

export default function Page() {
  const router = useRouter();
  return (
    <>
      <div className={styles.container}>
        <div className={styles.inner}>
          <h1>Medications for {router.query.page}</h1>
          <p>skills</p>
        </div>
        <div className={styles.inner}>
          <img
            src="https://images.pexels.com/photos/1482476/pexels-photo-1482476.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            style={{ marginBottom: "40px" }}
            alt="Description of the image"
          />
          <img
            src="https://images.pexels.com/photos/1482476/pexels-photo-1482476.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            style={{ marginBottom: "40px" }}
            alt="Description of the image"
          />
          <img
            src="https://images.pexels.com/photos/1482476/pexels-photo-1482476.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            style={{ marginBottom: "40px" }}
            alt="Description of the image"
          />
          <img
            src="https://images.pexels.com/photos/1482476/pexels-photo-1482476.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            style={{ marginBottom: "40px" }}
            alt="Description of the image"
          />
        </div>
      </div>
    </>
  );
}
