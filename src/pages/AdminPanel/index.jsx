import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BsPlusLg } from 'react-icons/bs'
import { AiOutlineDelete } from 'react-icons/ai'

import { deleteCourse, fetchAllCourses } from '../../store/slices/course'
import './AdminPanel.scss'
import Modal from '../../components/Modal'
import Loader from '../../components/Loader'

const AdminPanel = () => {
  const admin = useSelector(state => state.auth.data)
  const courses = useSelector(state => state.courses.courses)
  const [showModal, setShowModal] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllCourses())
  }, [])

  const removeCourse = (id, title) => {
    if (window.confirm("Вы хотите удалить курс: " + title)) {
      dispatch(deleteCourse(id))
    }
  }
  return (
    <div className='admin'>
      <div className="container admin__container">
        <h1 className="admin__title">Привет <span>{admin?.name}!</span></h1>
        <div className="admin__block">
          <h3 className="admin__block-title">
            Список курсов
          </h3>
          <ul className="admin__courses-list">
            {
              courses?.map((course, i) => (
                <li key={course.id} className="admin__courses-item">
                  <p>{course.title}</p>
                  <span onClick={() => removeCourse(course.id, course.title)}>
                    <AiOutlineDelete color='tomato' size={22} />
                  </span>
                </li>
              ))
            }
          </ul>
          <div className="admin__btn">
            <button onClick={() => setShowModal(true)}>
              <BsPlusLg />
              <span>
                Добавить новый курс
              </span>
            </button>
          </div>
          {showModal && <Modal setShowModal={setShowModal} />}
        </div>
      </div>
    </div>
  )
}

export default AdminPanel