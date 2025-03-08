import assignmentsData from "../data/assignments.json"

// Simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Fetch all assignments
export const fetchAssignments = async () => {
  await delay(800) // Simulate network delay

  // Simulate potential API failure (10% chance)
  if (Math.random() < 0.1) {
    throw new Error("Network error")
  }

  return assignmentsData
}

// Fetch a single assignment by ID
export const fetchAssignmentById = async (id) => {
  await delay(500)

  const assignment = assignmentsData.find((a) => a.id === Number.parseInt(id))

  if (!assignment) {
    throw new Error("Assignment not found")
  }

  return assignment
}

// Submit an assignment
export const submitAssignment = async (id, submissionData) => {
  await delay(1000)

  // Simulate potential submission failure (5% chance)
  if (Math.random() < 0.05) {
    throw new Error("Submission failed")
  }

  console.log(`Assignment ${id} submitted:`, submissionData)

  // In a real app, this would send data to a server
  return { success: true, message: "Assignment submitted successfully" }
}

