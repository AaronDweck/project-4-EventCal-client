import { useState, useContext } from "react"
import InputField from "../InputField/InputField"
import { register } from "../../services/userService"
import { getUserFromToken, setToken } from "../../utils/auth"
import { UserContext } from "../../contexts/UserContext"
import { useNavigate } from "react-router"

export default function Register() {

  const { setUser } = useContext(UserContext)

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: ''
  })

  const [errors, setErrors] = useState({})

  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault()
    try {
      const data = await register(formData)

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
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <InputField
          identifier='first_name'
          label='First Name:'
          type='text'
          value={formData.first_name}
          handleChange={handleChange}
          required={true}
          errors={errors.error?.first_name}
        />
        <InputField
          identifier='last_name'
          label='Last Name:'
          type='text'
          value={formData.last_name}
          handleChange={handleChange}
          required={true}
          errors={errors.error?.last_name}
        />
        <InputField
          identifier='email'
          label='Email:'
          type='email'
          value={formData.email}
          handleChange={handleChange}
          required={true}
          errors={errors.error?.email}
        />
        <InputField
          identifier='password'
          label='Password:'
          type='password'
          value={formData.password}
          handleChange={handleChange}
          required={true}
        />
        <InputField
          identifier='password_confirmation'
          label='Confirm Password:'
          type='password'
          value={formData.password_confirmation}
          handleChange={handleChange}
          required={true}
          errors={errors.error?.non_field_errors}
        />
        <button type="submit">Register</button>
      </form>
    </>
  )
}