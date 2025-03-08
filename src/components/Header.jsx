import { Link } from "react-router-dom"
import styles from "./Header.module.css"

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <Link to="/" className={styles.logo}>
          Student Assignment Submission System
        </Link>
      </div>
    </header>
  )
}

export default Header

