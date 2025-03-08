"use client"

import { useState } from "react"
import { useAssignments } from "../context/AssignmentContext"
import AssignmentCard from "../components/AssignmentCard"
import LoadingSpinner from "../components/LoadingSpinner"
import ErrorMessage from "../components/ErrorMessage"
import styles from "./AssignmentList.module.css"

const AssignmentList = () => {
  const { assignments, loading, error } = useAssignments()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCourse, setFilterCourse] = useState("")

  // Get unique courses for filter dropdown
  const courses = [...new Set(assignments.map((a) => a.course))]

  // Filter assignments based on search term and course filter
  const filteredAssignments = assignments.filter((assignment) => {
    const matchesSearch =
      assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCourse = filterCourse === "" || assignment.course === filterCourse

    return matchesSearch && matchesCourse
  })

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} />

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Assignments</h1>
        <p className={styles.subtitle}>View and manage your course assignments</p>
      </div>

      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Search assignments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />

        <select value={filterCourse} onChange={(e) => setFilterCourse(e.target.value)} className={styles.selectFilter}>
          <option value="">All Courses</option>
          {courses.map((course) => (
            <option key={course} value={course}>
              {course}
            </option>
          ))}
        </select>
      </div>

      {filteredAssignments.length === 0 ? (
        <div className={styles.emptyMessage}>
          <p>No assignments found matching your criteria.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filteredAssignments.map((assignment) => (
            <AssignmentCard key={assignment.id} assignment={assignment} />
          ))}
        </div>
      )}
    </div>
  )
}

export default AssignmentList

