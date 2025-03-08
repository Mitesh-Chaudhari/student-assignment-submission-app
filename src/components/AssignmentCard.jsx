import { Link } from "react-router-dom"
import styles from "./AssignmentCard.module.css"

const AssignmentCard = ({ assignment }) => {
  const { id, title, description, dueDate, course, status } = assignment

  // Format the due date
  const formattedDate = new Date(dueDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Determine status badge class
  const statusClass = status === "submitted" ? styles.statusSubmitted : styles.statusPending

  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <h3 className={styles.title}>{title}</h3>
          <span className={`${styles.statusBadge} ${statusClass}`}>
            {status === "submitted" ? "Submitted" : "Pending"}
          </span>
        </div>
        <p className={styles.description}>{description}</p>
        <div className={styles.metaInfo}>
          <span>Course: {course}</span>
          <span>Due: {formattedDate}</span>
        </div>
        <div className={styles.cardFooter}>
          <Link to={`/assignment/${id}`} className={styles.viewButton}>
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AssignmentCard

