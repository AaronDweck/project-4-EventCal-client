import { useState, useContext } from "react"
import { useNavigate } from "react-router"
import { UserContext } from "../../contexts/UserContext"
import { login } from "../../services/userService"
import { getUserFromToken, setToken } from "../../utils/auth"
import InputField from "../InputField/InputField"
import styles from './Login.module.css'

export default function Login() {

  const { setUser } = useContext(UserContext)

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState({})

  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault()
    try {
      const data = await login(formData)

      setToken(data.token)
      setUser(getUserFromToken())

      navigate('/calendar')
    } catch (error) {
      setErrors({ ...errors, error })
    }
  }

  function handleChange(event) {
    setErrors({})
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form} >
        <h1>Login</h1>
        <InputField
          identifier='email'
          label='Email:'
          type='email'
          value={formData.email}
          handleChange={handleChange}
          required={true}
        />
        <InputField
          identifier='password'
          label='Password:'
          type='password'
          value={formData.password}
          handleChange={handleChange}
          required={true}
          errors={errors.error?.detail}
        />
        <div>
          <button 
          type="submit"
          disabled={
            !formData.email || 
            !formData.password
          }
          >
            Login
          </button>
        </div>
      </form>

    </div>
  )
}