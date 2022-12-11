import { uniq } from 'lodash'
import React, { useEffect, useState } from 'react'
import { MdArrowBackIosNew } from 'react-icons/md'
import { FaHandPointRight } from 'react-icons/fa'
import { FiLock } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { fetchLesson, fetchLessons, fetchModules, removeLesson } from '../../store/slices/course'

import './VideoPage.scss'

const VideoPage = () => {
  const lessons = useSelector(state => state.courses.lessons)
  const lesson = useSelector(state => state.courses.lesson)
  const userModules = useSelector(state => state.auth.data.courses)
  const userId = useSelector(state => state.auth.data.id)
  const [active, setActive] = useState(lessons?.modules[0]?.lessons[0]?._id)
  // const [modulesIds, setModulesIds] = useState([])
  // const [lessonIds, setLessonIds] = useState([])
  let modulesIds = [];
  let lessonIds = [];
  const dispatch = useDispatch()
  const navigation = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    dispatch(fetchLessons({ id, userId }))
    dispatch(removeLesson())
    console.log('rerender');
    // setModulesIds(userModules.map(item => item))
    // setLessonIds(lessons && lessons.modules.map(item => item))


    // dispatch(fetchLesson(lessons?.lessons[0]._id))
  }, [dispatch])

  modulesIds = userModules.map(item => item)
  lessonIds = lessons && lessons.modules.map(item => item)
  let arrayIds = modulesIds?.concat(lessonIds)
  // let arrayIds = [...modulesIds, ...lessonIds]

  let modules = []
  for (let i = 0; i < arrayIds?.length; i++) {
    for (let k = 0; k < arrayIds?.length; k++) {
      if (k != i) {
        if (arrayIds[i]?._id == arrayIds[k]?._id) arrayIds[k] = ''
      }
    }
  }
  for (let i = 0; i < arrayIds?.length; i++) {
    if (arrayIds[i] == '') continue
    else modules.push(arrayIds[i])
  }
  const getLesson = (params) => {
    setActive(params.lessonId)
    dispatch(fetchLesson(params))
  }

  return (
    <div className='video'>
      {modules.length > 0 ? <div className="container video__container">
        <div onClick={() => navigation(-1)} className="video__back">
          <MdArrowBackIosNew />
          <span>Все курсы</span>
        </div>
        <div className="video__main">
          <div className="video__content">
            <h1 className="video__title">{lesson ? lesson.name : lessons?.modules[0]?.lessons[0]?.name}</h1>
            <div className="video__player">
              {lesson ?
                <span className={`wistia_embed wistia_async_${lesson.videoUrl} popover=true popoverAnimateThumbnail=true`} style={{ display: 'inline-block', width: '100%', position: 'relative', height: '100%' }}>&nbsp;</span> : <>
                  <div className="video__not-video "><p>Выберите видеоурок справа</p><span><FaHandPointRight size={34} /></span></div>
                  <div className="video__not-video-mobile "><p>Выберите видеоурок внизу</p><span><FaHandPointRight size={34} /></span></div>
                </>}

              {/* {!lesson && lessons && <span className={`wistia_embed wistia_async_${lessons?.modules[0]?.lessons[0].videoUrl} popover=true popoverAnimateThumbnail=true`} style={{ display: 'inline-block', width: '100%', position: 'relative', height: '100%' }}>&nbsp;</span>} */}
            </div>
            <div className="video__descr">
              <h3>Описание</h3>
              <p>{lesson ? lesson.description : lessons?.modules[0]?.lessons[0]?.description}</p>
            </div>
            <div className="video__tests">
              <h3>Тесты</h3>
              <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSd6DwBqItuGjPFuSLYdoX5Y4USoIMWpvsOcSfu4OTpJf5r-nw/viewform?embedded=true" width="640" height="947" frameborder="0" marginheight="0" marginwidth="0">Загрузка…</iframe>
            </div>
          </div>
          <div className="video__sidebar">
            <div className="video__sidebar-title">{lessons?.title}</div>
            <ul className="video__list">
              {modules?.map((module, i) => module?.isAccess === false ?
                module?.courseId === id && (
                  <li className='video__module' key={i}>
                    <p className='video__module-name'>{module?.name}</p>
                    <ol className='video__lessons'>
                      {module?.lessons.map((lesson, i) => (
                        <li key={lesson._id} className={`video__lessons-name ${active === lesson._id && 'active'}`} onClick={() => getLesson({ courseId: lessons._id, lessonId: lesson._id })}>
                          {lesson.name}  </li>
                      ))}
                    </ol>
                  </li>) :
                   <li className='video__module disabled' key={i}>
                  <div className="video__header">
                    <p className='video__module-name disabled'>{module?.name}</p>
                    <div className="video__right">
                      <div className="video__lock-btn">Купить</div>
                      <FiLock />
                    </div>
                  </div>
                  <ul className='video__lessons'>
                    {module?.lessons.map((lesson, i) => (
                      <li key={lesson._id} className={`video__lessons-name`} disabled >
                        {lesson.name}  </li>

                    ))}
                  </ul>
                  <div className="video__right-mobile">
                    <div className="video__lock-btn">Купить</div>
                    <FiLock />
                  </div>
                </li>

              )
              }
              {/* {lessons?.modules.map(module => userModules.map(item => item._id === module._id ? accessModules.push([item]) : notAccessModules.push(item))
              )} */}
            </ul>
            <div className="video__sidebar-title test-title">Тесты</div>
            <ol className="video__list">
              <li className="video__item">Тест введение в профессию</li>
            </ol>
          </div>
        </div>
      </div>
        : <div className='container not-found'>
          <h1>
            Вы еще не приобрели ни одного курса
          </h1>
          <p>Курсы, которые вы купили, будут отображаться здесь</p>
          <span>
            <MdArrowBackIosNew size={16} />
            <Link to='/courses'>Перейти к курсам</Link></span>
        </div>}
    </div >
  )
}

export default VideoPage

  // < li className = 'video__module' key = { module._id } >
  //                 <p className='video__module-name'>{module.name}</p>
  //                 <ul className='video__lessons'>
  //                   {module.lessons.map((lesson, i) => (
  //                     <li className={`video__lessons-name ${active === lesson._id && 'active'}`} key={lesson._id} onClick={() => getLesson({ courseId: lessons._id, lessonId: lesson._id })}>
  //                       {lesson.name}
  //                     </li>
  //                   ))}
  //                 </ul>
  //               <li/>