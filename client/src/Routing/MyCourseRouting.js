import React, { useEffect } from 'react'
import CourseSchedule from '../Components/Pages/CourseSchedule/CourseScheduleComponent';
import StudentGradesComponent from '../Components/Pages/Grades/StudentGradesComponent'
import AdminGradesComponent from '../Components/Pages/Grades/AdminGradesComponent'
import Syllabus from '../Components/Pages/Syllabus/SyllabusComponent'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { useDispatch, useSelector } from 'react-redux';
import Students from '../Components/Pages/Sudents/StudentsComponent';
import CreatCourse from '../Components/Pages/CreatCourse/CreatCourseComponent';
import StaffComponents from '../Components/Pages/Staff/StaffComponents';
import ChooseCourse from '../Components/Features/ChooseCourse/ChooseCourseComponent'
import { getCourse } from '../Redux/actions/courseActions';
import { hebrewVariables } from '../utils/hebrewVariables';
import Homework from '../Components/Pages/Homework/HomeworkComponent';
const MyCourseRouting = () => {
    const { user } = useSelector(state => state.user);
    const course = useSelector((state) => state.course);
    const { courses } = useSelector((state) => state.courses);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user.role === "Student") dispatch(getCourse(user.courseId))
    }, [user, dispatch]
    )

    return (
        <>
            {
                !course._id ? <ChooseCourse /> :
                    <>
                        <h2>{course?.name}</h2>

                        {
                            user.role === "Staff" ?
                                <select onChange={(e) => dispatch(getCourse(e.target.value))}>
                                    <option></option>                                    {
                                        courses.map(course => <option key={course._id} value={course._id}>{course.name}</option>
                                        )
                                    }

                                </select> : ""}
                        <Tabs
                            defaultActiveKey="course-schedule"
                            transition={false}
                            id="noanim-tab-example"
                            className="mb-3"
                        >
                            {/* nice to have

                <Tab eventKey="daily-schedule" title="לוז יומי">
                    <DailySchedule />
                </Tab> */}

                            <Tab eventKey="course-schedule" title={hebrewVariables.CourseSchedule}  >
                                <CourseSchedule />
                            </Tab>
                            <Tab eventKey="syllabus" title={hebrewVariables.syllabus}>
                                <Syllabus />
                            </Tab>
                            {
                                user.role === "Staff" ?
                                    <Tab eventKey="Student-grades" title={hebrewVariables.studentsGrades} >
                                        <AdminGradesComponent />
                                    </Tab>
                                    :
                                    <Tab eventKey="grades" title={hebrewVariables.myGrades} >
                                        <StudentGradesComponent />
                                    </Tab>
                            }
                            {
                                <Tab eventKey="Students" title={hebrewVariables.students} >
                                    <Students />
                                </Tab>
                            }
                            {
                                user.role === "Staff" ? <Tab eventKey="Creat-course" title={hebrewVariables.createCourse} >
                                    <CreatCourse />
                                </Tab> : ""
                            }

                            {
                                user.role === "Staff" ? <Tab eventKey="staff" title={hebrewVariables.staff} >
                                    <StaffComponents />
                                </Tab> : ""
                            }
                            <Tab eventKey="homework" title={hebrewVariables.homework}>
                                <Homework />
                            </Tab>
                        </Tabs>
                    </>

            }

        </>
    )
}
export default MyCourseRouting;