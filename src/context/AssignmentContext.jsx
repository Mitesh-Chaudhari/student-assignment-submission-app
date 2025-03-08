"use client"

import { createContext, useState, useEffect, useContext } from "react"
import { fetchAssignments, submitAssignment } from "../services/api"

const AssignmentContext = createContext()

export const useAssignments = () => useContext(AssignmentContext)

export const AssignmentProvider = ({ children }) => {
  const [assignments, setAssignments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getAssignments = async () => {
      try {
        setLoading(true)
        const data = await fetchAssignments()
        setAssignments(data)
        setError(null)
      } catch (err) {
        setError("Failed to fetch assignments. Please try again later.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    getAssignments()
  }, [])

  const handleSubmitAssignment = async (id, submissionData) => {
    try {
      setLoading(true)
      await submitAssignment(id, submissionData)

      // Update the assignment status in our local state
      setAssignments((prevAssignments) =>
        prevAssignments.map((assignment) =>
          assignment.id === id ? { ...assignment, status: "submitted" } : assignment,
        ),
      )

      return { success: true }
    } catch (err) {
      setError("Failed to submit assignment. Please try again.")
      console.error(err)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  const getAssignmentById = (id) => {
    return assignments.find((assignment) => assignment.id === Number.parseInt(id))
  }

  const value = {
    assignments,
    loading,
    error,
    handleSubmitAssignment,
    getAssignmentById,
  }

  return <AssignmentContext.Provider value={value}>{children}</AssignmentContext.Provider>
}

