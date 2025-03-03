import Calendar from "../CalendarComp/CalendarComp";
import SideBar from '../SideBar/SideBar'
import styles from './MainLayout.module.css'

export default function MainLayout() {
  return (
    <div className={styles.layout}>
      <Calendar />
      <SideBar />
    </div>
  )
}