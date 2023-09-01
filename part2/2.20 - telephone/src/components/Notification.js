const Notification = ({ message, option }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className={option}>
        {message}
      </div>
    )
  }

  export default Notification;