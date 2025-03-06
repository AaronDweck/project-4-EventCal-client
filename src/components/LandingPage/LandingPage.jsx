import { useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router";
import {UserContext} from '../../contexts/UserContext'
import styles from './LandingPage.module.css'

export default function LandingPage() {
  const {user} = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/calendar')
    }
    return
  }, [user])
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Welcome to EventCal</h1>
        <p className={styles.subtitle}>Plan, organize, and track your events with ease.</p>
      </header>
      
      <div className={styles.buttons}>
        <button onClick={() => navigate("/register")} className={styles.registerButton}>Register</button>
        <button onClick={() => navigate("/login")} className={styles.loginButton}>Log In</button>
      </div>
      
      <section>
        <h2 className={styles.sectionTitle}>Why Choose Our Calendar App?</h2>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <h3 className={styles.featureTitle}>Drag & Drop Scheduling</h3>
            <p className={styles.featureDescription}>Easily move and adjust events with an intuitive drag-and-drop interface.</p>
          </div>
          <div className={styles.featureCard}>
            <h3 className={styles.featureTitle}>Seamless Event Editing</h3>
            <p className={styles.featureDescription}>Quickly update event details with a simple and clean UI.</p>
          </div>
          <div className={styles.featureCard}>
            <h3 className={styles.featureTitle}>Stay Organized</h3>
            <p className={styles.featureDescription}>Manage your schedule efficiently with color-coded events.</p>
          </div>
        </div>
      </section>
    </div>
  )
}