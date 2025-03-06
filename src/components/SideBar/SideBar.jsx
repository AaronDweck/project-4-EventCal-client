import { useNavigate, useParams } from "react-router";
import CreateEvent from "../CreateEvent/CreateEvent";
import UpdateEvent from '../UpdateEvent/UpdateEvent'
import { FaPlus } from "react-icons/fa";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import styles from './SideBar.module.css'
import { removeToken } from "../../utils/auth";

export default function SideBar() {
  const { user, setUser } = useContext(UserContext)

  const { id } = useParams()

  const navigate = useNavigate()

  function logOut() {
    removeToken()
    setUser(null)
  }

  return (
    <div className={styles.sideBar}>
      <div className={styles.navigation}>
        <div className={styles.createEvent}>
          <FaPlus size={30} onClick={() => navigate('/calendar')} />
        </div>
        <div className={styles.userNavigation}>
          <div className={styles.logOutButton} onClick={logOut}>Log out</div>
          <div className={styles.profile}>
            {user?.first_name[0].toUpperCase() + user?.last_name[0].toUpperCase()}
          </div>
        </div>
      </div>
      {id ? <UpdateEvent /> :
        <CreateEvent />
      }
    </div>
  )
}