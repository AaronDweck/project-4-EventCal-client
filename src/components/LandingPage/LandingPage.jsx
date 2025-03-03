import { NavLink } from "react-router";

export default function LandingPage() {
  return (
    <>
      <h1>Welcome to EventCal</h1>

      <p><span><NavLink to='/register'>Create an account </NavLink></span>
        to add your first event in your calendar or <span><NavLink to='/login'>login </NavLink></span>
        to see your events for today
      </p>


    </>
  )
}