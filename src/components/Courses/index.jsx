import React, { useEffect } from 'react'
import { FiSearch } from 'react-icons/fi'
import { useDispatch, useSelector } from "react-redux";

import './Courses.scss'
import { Link } from 'react-router-dom'
import { fetchAllCourses } from '../../store/slices/course';


const Courses = () => {
  const courses = useSelector(state => state.courses.courses)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllCourses())
  }, [])

  return (
    <div className='courses'>
      <div className="courses__container">
        <div className="courses__header">
          <h2>Наши курсы</h2>
          <div className="courses__search">
            <FiSearch size={20} color='#E8E5E5' />
            <input type="text" placeholder='Что вы ищите?' />
          </div>
        </div>
        <ul className="courses__items">
          {courses && courses.map(course => (
            <li key={course.id}  className="courses__item">
              <div className="courses__item-header">
                <div className="courses__content">
                  <div className="courses__name">{course.title}</div>
                  <div className="courses__desc">{course.duration}</div>
                  <div className="courses__price">{course.price} сом</div>
                </div>
                <div className="courses__img">
                  <img src={course.previewImgUrl} alt="" />
                </div>
              </div>
              <div className="courses__btns">
                <Link to={'/course/' + course.id} className="courses__btn-info">Подробнее</Link>
                <div className="courses__btn-buy">Получить курс</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Courses