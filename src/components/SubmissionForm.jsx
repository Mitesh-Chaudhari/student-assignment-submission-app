"use client"

import { useState } from "react"
import { useAssignments } from "../context/AssignmentContext"
import SuccessMessage from "./SuccessMessage"
import ErrorMessage from "./ErrorMessage"
import styles from "./SubmissionForm.module.css"

const SubmissionForm = ({ assignmentId }) => {
  const { handleSubmitAssignment } = useAssignments()

  const [formData, setFormData] = useState({
    studentName: "",
    email: "",
    comments: "",
    file: null,
  })

  const [fileName, setFileName] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData((prev) => ({ ...prev, file }))
      setFileName(file.name)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitResult(null)

    try {
      // Create submission data (in a real app, you'd handle file upload differently)
      const submissionData = {
        ...formData,
        submittedAt: new Date().toISOString(),
        fileName: fileName,
      }

      const result = await handleSubmitAssignment(assignmentId, submissionData)

      if (result.success) {
        setSubmitResult({
          success: true,
          message: "Assignment submitted successfully!",
        })
        // Reset form
        setFormData({
          studentName: "",
          email: "",
          comments: "",
          file: null,
        })
        setFileName("")
      } else {
        throw new Error(result.error || "Submission failed")
      }
    } catch (error) {
      setSubmitResult({
        success: false,
        message: error.message || "Failed to submit assignment. Please try again.",
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={styles.formContainer}>
      <h3 className={styles.formTitle}>Submit Your Assignment</h3>

      {submitResult &&
        (submitResult.success ? (
          <SuccessMessage message={submitResult.message} />
        ) : (
          <ErrorMessage message={submitResult.message} />
        ))}

      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="studentName" className={styles.formLabel}>
            Full Name
          </label>
          <input
            type="text"
            id="studentName"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            required
            className={styles.formInput}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.formLabel}>
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={styles.formInput}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="file" className={styles.formLabel}>
            Upload Assignment (PDF preferred)
          </label>
          <div className={styles.fileInputContainer}>
            <label className={styles.fileInputLabel}>
              <span>{fileName ? fileName : "Choose file..."}</span>
              <input
                type="file"
                id="file"
                name="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                className={styles.fileInput}
                required
              />
            </label>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="comments" className={styles.formLabel}>
            Comments (Optional)
          </label>
          <textarea
            id="comments"
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            rows="4"
            className={styles.formTextarea}
          ></textarea>
        </div>

        <button type="submit" disabled={submitting} className={styles.submitButton}>
          {submitting ? "Submitting..." : "Submit Assignment"}
        </button>
      </form>
    </div>
  )
}

export default SubmissionForm

