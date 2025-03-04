import { useNavigate, useParams } from "react-router";
import CreateEvent from "../CreateEvent/CreateEvent";
import UpdateEvent from '../UpdateEvent/UpdateEvent'

export default function SideBar() {

  const { id } = useParams()

  const navigate = useNavigate()

  return (
    <div className="sideBar">
      <div>
        <button onClick={() => navigate('/calendar')}>add</button>
        <h1>SideBar</h1>
      </div>
      {id ? <UpdateEvent /> :
        <CreateEvent />
      }
    </div>
  )
}