import { useContext, useState } from "react"
import styles from './CreateEvent.module.css'
import InputField from "../InputField/InputField"
import { eventCreate } from "../../services/eventService"
import { EventContext } from "../../contexts/EventContext"

export default function CreateEvent() {

  const { events, setEvents } = useContext(EventContext)

  const initialFormData = {
    title: '',
    start_date: '',
    end_date: '',
    all_day: false,
    description: '',
    color: '#D0021B',
  }

  const [formData, setFormData] = useState(initialFormData)

  const [errors, setErrors] = useState({})

  async function handleSubmit(event) {
    event.preventDefault()
    try {
      const data = await eventCreate(formData)

      const newEvent = {
        ...data,
        start_date: new Date(data.start_date),
        end_date: new Date(data.end_date),
      }
      setEvents([...events, newEvent])

      setFormData(initialFormData)
    } catch (error) {
      console.log(error)
      setErrors({ ...errors, error })
    }
  }

  function handleChange(event) {
    setErrors({})
    if (event.target.type === 'checkbox') {
      setFormData({ ...formData, [event.target.name]: event.target.checked })
    } else {
      setFormData({ ...formData, [event.target.name]: event.target.value })
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form} >
        <h1>Create Event</h1>
        <InputField
          identifier='title'
          label='Title:'
          type='text'
          value={formData.title}
          handleChange={handleChange}
          required={true}
          errors={errors.error?.title}
        />
        <InputField
          identifier='start_date'
          label='Start Date:'
          type='datetime-local'
          value={formData.start_date}
          handleChange={handleChange}
          required={true}
          errors={errors.error?.start_date}
        />
        <InputField
          identifier='end_date'
          label='End Date:'
          type='datetime-local'
          value={formData.end_date}
          handleChange={handleChange}
          required={true}
          errors={errors.error?.non_field_errors || errors.error?.end_date}
        />
        <InputField
          className={styles.checkBox}
          identifier='all_day'
          label='All Day:'
          type='checkbox'
          checked={formData.all_day}
          handleChange={handleChange}
          required={false}
        />
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id='description'
            name='description'
            type='textarea'
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <InputField
          identifier='color'
          label='Color:'
          type='color'
          value={formData.color}
          handleChange={handleChange}
          required={false}
        />
        <div>
          <button
            type="submit"
            disabled={
              !formData.title ||
              !formData.start_date ||
              !formData.end_date
            }
          >
            Save
          </button>
        </div>
      </form>

    </div>
  )
}