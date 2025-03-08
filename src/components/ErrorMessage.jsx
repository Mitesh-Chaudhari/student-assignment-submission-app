const ErrorMessage = ({ message }) => {
  return (
    <div className="error-message" role="alert">
      <p>{message || "An error occurred. Please try again."}</p>
    </div>
  )
}

export default ErrorMessage

