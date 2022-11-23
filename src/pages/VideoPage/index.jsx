import React, { useEffect, useState } from 'react'
import { MdArrowBackIosNew } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { fetchLesson, fetchLessons } from '../../store/slices/course'

import './VideoPage.scss'

const VideoPage = () => {
  const lessons = useSelector(state => state.courses.lessons)
  const lesson = useSelector(state => state.courses.lesson)
  const dispatch = useDispatch()
  const navigation = useNavigate()
  const { id } = useParams()
  useEffect(() => {
    dispatch(fetchLessons(id))
    // dispatch(fetchLesson(lessons?.lessons[0]._id))
  }, [])

  const getLesson = (id) => {
    dispatch(fetchLesson(id))
  }


  return (
    <div className='video'>
      <div className="container video__container">
        <div onClick={() => navigation(-1)} className="video__back">
          <MdArrowBackIosNew />
          <span>Все курсы</span>
        </div>
        <div className="video__main">
          <div className="video__content">
            <h1 className="video__title">{lesson ? lesson.name : lessons?.lessons[0].name}</h1>
            <div className="video__player">
              {lesson ?
                <span className={`wistia_embed wistia_async_${lesson.videoUrl} popover=true popoverAnimateThumbnail=true`} style={{ display: 'inline-block', width: '100%', position: 'relative', height: '100%' }}>&nbsp;</span> : null}

              {!lesson && lessons && <span className={`wistia_embed wistia_async_${lessons?.lessons[0].videoUrl} popover=true popoverAnimateThumbnail=true`} style={{ display: 'inline-block', width: '100%', position: 'relative', height: '100%' }}>&nbsp;</span>}
            </div>
            <div className="video__descr">
              <h3>Описание</h3>
              <p>{lesson ? lesson.description : lessons?.lessons[0].description}</p>
            </div>
            <div className="video__tests">
              <h3>Тесты</h3>
            </div>
          </div>
          <div className="video__sidebar">
            <div className="video__sidebar-title">{lessons?.title}</div>
            <ol className="video__list">
              {lessons?.lessons.map(item => (
                <li className="video__item" key={item._id} onClick={() => getLesson(item._id)}>{item.name}</li>
              ))}

            </ol>
            <div className="video__sidebar-title test-title">Тесты</div>
            <ol className="video__list">
              <li className="video__item">Тест введение в профессию</li>
            </ol>
          </div>
        </div>
      </div>
    </div >
  )
}

export default VideoPage