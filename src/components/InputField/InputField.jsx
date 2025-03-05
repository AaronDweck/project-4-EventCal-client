export default function InputField({ identifier, label, type, value, handleChange, required, errors, checked }) {
  return (
    <div>
      <label htmlFor={identifier}>{label}</label>
      <input
        type={type}
        name={identifier}
        id={identifier}
        value={value}
        onChange={handleChange}
        required={required}
        checked={checked}
      />
      <div>
        {
          errors && errors.map((error, index) => (
            <p key={index} className="error-message">{error}</p>
          ))
        }
      </div>
    </div>
  )
}