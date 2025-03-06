import { useContext, useEffect, useState } from "react"
import styles from './UpdateEvent.module.css'
import InputField from "../InputField/InputField"
import { EventContext } from "../../contexts/EventContext"
import { useNavigate, useParams } from "react-router"
import { eventDelete, eventUpdate } from "../../services/eventService"

export default function UpdateEvent() {
  const { events, setEvents } = useContext(EventContext)
  const [formData, setFormData] = useState({
    title: '',
    start_date: '',
    end_date: '',
    all_day: false,
    description: '',
    color: '#D0021B',
  })
  const [errors, setErrors] = useState({})
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (events.length === 0) {
      navigate('/calendar')
      return
      // async function fetchingEvents() {
      //   try {
      //     const data = await eventIndex()
      //     setEvents(data)
      //   } catch (error) {
      //     console.log(error)
      //   }
      // }
      // fetchingEvents()
    }

    const singleEvent = events.find(event => event.id.toString() === id)

    const formattedEvent = {
      ...singleEvent,
      start_date: new Date(singleEvent.start_date).toISOString().slice(0, 16),
      end_date: new Date(singleEvent.end_date).toISOString().slice(0, 16),
    }

    setFormData(formattedEvent)
  }, [id])


  async function handleSubmit(event) {
    event.preventDefault()
    try {
      const data = await eventUpdate(formData.id, formData)

      const formattedEvent = {
        ...data,
        start_date: new Date(data.start_date),
        end_date: new Date(data.end_date),
      }

      const updatedEvents = events.map(event => event.id !== data.id ? event : formattedEvent)
      setEvents(updatedEvents)

      navigate('/calendar')
    } catch (error) {
      console.log(error)
      setErrors({ ...errors, error })
    }
  }

  async function handleDelete() {
    console.log('deleting...')
    try {
      await eventDelete(formData.id)

      const updatedEvents = events.filter(event => event.id !== formData.id)
      setEvents(updatedEvents)

      navigate('/calendar')
    } catch (error) {
      console.log(error)
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
        <h1>Update Event</h1>
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
        <div className={styles.updateButtons}>
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
          <button
            type="button"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  )
}