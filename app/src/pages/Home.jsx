import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllActiveCourses } from "../services/courseService";
import placeholder from "../assets/courses/placeholder.png";
import AppNavbar from "../components/AppNavbar";
import courseImages from "../utils/courseImages";

function Home() {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    //used to work with the lifecycle of components
    useEffect(() => { getCourses() }, []);

    const getCourses = async () => {
        const result = await getAllActiveCourses();
        console.log(result);
        if (result.status === 'success') 
            setCourses(result.data);
    }

    const formatDate = (date) => (
        new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        })
    )
    
    return (
        <>
            <AppNavbar />
            <div className="container py-5">
                <div className="row g-4">
                    {courses.map(course => (
                        <div key={course.course_id} className="col-12 col-md-6 col-lg-4 col-xl-3">
                            <div className="card h-100 shadow-sm course-card">
                                <img src={courseImages[course.course_name.trim()] || placeholder} className="card-img-top" alt={course.course_name.trim()} />
                                <div className="card-body d-flex flex-column text-center">
                                    <h5 className="card-title text-truncate">{course.course_name}</h5>
                                    <p className="text-muted mb-3">Starts on: {formatDate(course.start_date)}</p>
                                    
                                    <button
                                        onClick={() => navigate('/course-details', { state: { course } })} 
                                        className="btn btn-outline-primary mt-auto w-100"
                                    >
                                        View More
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Home;