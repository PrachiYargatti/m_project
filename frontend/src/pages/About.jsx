import AppNavbar from "../components/AppNavbar";

function About() {
  return (
    <>
      <AppNavbar />
      <div className="container mt-5">
        <h2>About</h2>
        <p>
          This platform is designed to make learning simple, practical, and accessible.
          It brings students and administrators together in one system where courses,
          videos, and enrollments are managed seamlessly.
        </p>

        <p>
          Students can explore active courses, enroll easily, and access learning
          content in a structured way. Administrators can efficiently create, update,
          and manage courses and videos while tracking student participation.
        </p>

        <p>
          The goal of this application is to provide a clean, secure, and user-friendly
          learning experience that supports continuous growth and skill development.
        </p>
      </div>
    </>
  );
}

export default About;
