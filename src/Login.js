const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <>
      <div className="login-container">
        <form className="form" onSubmit={handleSubmit}>
          <p>login</p>
          <input type="text" placeholder="username"/>
          <input type="password" placeholder="password" autoComplete="new-password" />
          <button type="submit" className="submit">login</button>
        </form>
      </div>
    </>
  )
}
export default Login;