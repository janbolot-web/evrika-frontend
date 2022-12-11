import React, { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { MdOutlineClose } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { addModuleToUser, fetchAuthMe, fetchUserById } from '../../store/slices/auth'
import { fetchModules } from '../../store/slices/course'


import './Users.scss'

const ModalCourse = ({ setShowModal, userId, userCourses }) => {
  const modules = useSelector(state => state.courses.modules)
  const [idCourse, setIdCourse] = useState('')

  const dispatch = useDispatch()
  const searchModules = () => {
    dispatch(fetchModules(idCourse))
  }

  const onAddModuleToUser = ({ moduleId }) => {
    // userCourses?.map(course => {
    //   setModuleIds([...moduleIds, course.moduleId])
    // });
    dispatch(addModuleToUser({ moduleId, userId, courseId: idCourse }))
  }


  useEffect(() => {
  }, [dispatch])

  return (
    <div className='modal'>
      <div className="modal__container container">
        <div className="modal__close" onClick={() => setShowModal(false)}><MdOutlineClose color='tomato' size={24} /></div>
        <div className="modal__header">
          <input value={idCourse} onChange={(e) => setIdCourse(e.target.value)} type="text" placeholder='Введите ID курса' className="modal__idCourse" />
          <div className="modal__searchBtn"><FiSearch size={22} color="#0099f8" onClick={searchModules} /></div>
        </div>
        <ul className="modal__list">
          {modules?.map((module, i) => (
            <li key={module._id} onClick={() => console.log(module._id)} className="modal__item"><p>{module.name}</p> <div className="modal__lockBtn" onClick={() => onAddModuleToUser({ moduleId: module._id })}>

            </div>
            </li>
          ))}
        </ul>
      </div>
    </div >
  )
}

export default ModalCourse