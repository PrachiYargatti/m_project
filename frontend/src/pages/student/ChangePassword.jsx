import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import AppNavbar from "../../components/AppNavbar"

function ChangePassword() {
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const token = sessionStorage.getItem("token")

  const changePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    try {
      await axios.put(
        "http://localhost:4000/student/change-password",
        { newPassword, confirmPassword },
        { headers: { token } }
      )

      toast.success("Password changed successfully")
      setNewPassword("")
      setConfirmPassword("")

    } catch (err) {
      toast.error("Password update failed")
    }
  }

  return (
    <>
      <AppNavbar />
      <div className="container mt-5 col-md-4">
        <h4 className="mb-3">Change Password</h4>

        <input
          type="password"
          className="form-control mb-2"
          placeholder="New Password"
          onChange={e => setNewPassword(e.target.value)}
          value={newPassword}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Confirm Password"
          onChange={e => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        />

        <button className="btn btn-primary w-100" onClick={changePassword}>
          Change Password
        </button>
      </div>
    </>
  )
}

export default ChangePassword
