const SuccessMessage = ({ message }) => {
    return (
      <div className="success-message" role="alert">
        <p>{message || "Operation completed successfully."}</p>
      </div>
    )
  }
  
  export default SuccessMessage
  
  