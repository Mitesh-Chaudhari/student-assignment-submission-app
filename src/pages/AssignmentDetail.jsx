"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useAssignments } from "../context/AssignmentContext"
import SubmissionForm from "../components/SubmissionForm"
import LoadingSpinner from "../components/LoadingSpinner"
import ErrorMessage from "../components/ErrorMessage"
import styles from "./AssignmentDetail.module.css"

const AssignmentDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getAssignmentById, loading, error } = useAssignments()
  const [assignment, setAssignment] = useState(null)

  useEffect(() => {
    const fetchAssignment = async () => {
      const data = getAssignmentById(id)
      if (!data) {
        // Assignment not found, redirect to list
        navigate("/")
        return
      }
      setAssignment(data)
    }

    fetchAssignment()
  }, [id, getAssignmentById, navigate])

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} />
  if (!assignment) return <LoadingSpinner />

  // Format the due date
  const formattedDate = new Date(assignment.dueDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Determine status badge class
  const statusClass = assignment.status === "submitted" ? styles.statusSubmitted : styles.statusPending

  return (
    <div className={styles.container}>
      <button onClick={() => navigate("/")} className={styles.backButton}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={styles.backIcon}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Back to Assignments
      </button>

      <div className={styles.card}>
        <div className={styles.cardContent}>
          <div className={styles.header}>
            <h1 className={styles.title}>{assignment.title}</h1>
            <span className={`${styles.statusBadge} ${statusClass}`}>
              {assignment.status === "submitted" ? "Submitted" : "Pending"}
            </span>
          </div>

          <div>
            <div className={styles.metaInfo}>
              <div className={styles.metaItem}>
                <span>Course:</span> {assignment.course}
              </div>
              <div className={styles.metaItem}>
                <span>Due Date:</span> {formattedDate}
              </div>
            </div>

            <p className={styles.description}>{assignment.description}</p>

            <div className={styles.instructionsBox}>
              <h3 className={styles.instructionsTitle}>Instructions:</h3>
              <p className={styles.instructionsText}>{assignment.instructions}</p>
            </div>
          </div>
        </div>
      </div>

      {assignment.status !== "submitted" ? (
        <SubmissionForm assignmentId={assignment.id} />
      ) : (
        <div className={styles.submittedMessage}>
          <h3 className={styles.submittedTitle}>Assignment Submitted</h3>
          <p className={styles.submittedText}>You have already submitted this assignment.</p>
        </div>
      )}
    </div>
  )
}

export default AssignmentDetail

