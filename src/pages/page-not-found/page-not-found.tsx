import { Link } from "react-router-dom";

import styles from "./page-not-found.module.scss";

const NotFound = () => (
  <div className={styles["not-found-container"]}>
    <div className={styles["errors-wrapper"]}>
      <h1 className={styles["error-404"]}>404</h1>
      <h2 className={styles["error-text"]}>Page Not Found</h2>
      <Link to="/">
        <p style={{ marginTop: "30px" }}>Go to Home </p>
      </Link>
    </div>
  </div>
);

export default NotFound;
