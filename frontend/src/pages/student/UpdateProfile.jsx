import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import AppNavbar from "../../components/AppNavbar"
import config from "../../services/config"

function UpdateProfile() {
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [mobile, setMobile] = useState("")

  const token = sessionStorage.getItem("token")

  const updateProfile = async () => {
    try {
      await axios.put(
        config.BASE_URL + "/student/update-profile",
        {
          name,
          mobile_no: mobile
        },
        {
          headers: { token }
        }
      )

      toast.success("Profile updated successfully")
      setName("")
      setMobile("")

    } catch (err) {
      toast.error("Failed to update profile")
    }
  }

  return (
    <>
      <AppNavbar />
      <div className="container mt-5 col-md-4">
        <h4 className="mb-3">Update Profile</h4>

        <input
          className="form-control mb-2"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="Mobile Number"
          value={mobile}
          onChange={e => setMobile(e.target.value)}
        />

        <button className="btn btn-primary w-100" onClick={updateProfile}>
          Update
        </button>
      </div>
    </>
  )
}

export default UpdateProfile
