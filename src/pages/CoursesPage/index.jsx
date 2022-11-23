import React from 'react'
import Courses from '../../components/Courses'

import './CoursesPage.scss'

const CoursesPage = () => {
    return (
        <div className='courses'>
            <div className="courses__container container">
                <Courses />
            </div>
        </div>
    )
}

export default CoursesPage