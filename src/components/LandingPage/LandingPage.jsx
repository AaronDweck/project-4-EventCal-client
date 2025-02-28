import { NavLink } from "react-router";

export default function LandingPage() {
    return (
        <>
            <h1>LandingPage</h1>
            <NavLink to='/register'>Register</NavLink>
            <NavLink to='/login'>Login</NavLink>
        </>
    )
}