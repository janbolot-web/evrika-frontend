import React, { useEffect } from 'react'
import { MdArrowBackIosNew } from 'react-icons/md'
import { FaPlay } from 'react-icons/fa'

import './DetailPage.scss'
import ResultImg1 from '../../assets/img/1.svg'
import ResultImg2 from '../../assets/img/2.svg'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCourse } from '../../store/slices/course'

const DetailPage = () => {
  const course = useSelector(state => state.courses.courseDetail)
  const dispatch = useDispatch()
  const { id } = useParams()
  const navigation = useNavigate()

  useEffect(() => {
    dispatch(fetchCourse(id))
    window.scrollTo(0,0)
  }, [])

  return (
    <div className='detail'>
      <div className="detail__container container">
        <div onClick={() => navigation(-1)} className="detail__back">
          <MdArrowBackIosNew />
          <span>Все курсы</span>
        </div>
        <div className="detail__banner">
          <div className="detail__content">
            <h1 className="detail__title">{course?.title}</h1>
            <div className="detail__duration">
              <span>{course?.duration}</span>
            </div>
            <p className="detail__desc">{course?.description}</p>
            <div className="detail__bottom">
              <Link to={'/video/' + course?._id} className="detail__btn">
                <FaPlay color='#fff' />
                <span>Смотреть курс</span>
              </Link>
              <div className="detail__price">{course?.price} сом</div>
            </div>
          </div>
          <div className="detail__img">
            <img src={course?.previewImgUrl} alt="" />
          </div>
        </div>

      </div>
      <div className="detail__greet">
        <div className="container">
          <h2 className="detail__greet-title">Приветствие и первые шаги</h2>
          <div className="detail__greet-content">
            <div className="detail__greet-video">
              {course ?
                <span className={`wistia_embed wistia_async_${course.previewVideoUrl} popover=true popoverAnimateThumbnail=true`} style={{ display: 'inline-block', width: '100%', position: 'relative', height: '100%' }}>&nbsp;</span> : null}
            </div>
            <div className="detail__greet-text">
              <h3>{course?.authorName}</h3>
              <p>{course?.authorProfession}</p>
              <Link to={'/video/' + course?._id} className="detail__greet-btn">
                <FaPlay color='#fff' />
                <span>Смотреть курс</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="training">
        <div className="container">
          <div className="training__block">
            <h2 className="training__title">Программа обучения</h2>
            <div className="training__header">
              <div className="training__header-title">
                <span><MdArrowBackIosNew size={22} /></span>
                <h3>{course?.title}</h3>
              </div>
              <ul className="training__list">
                {course?.lessons.map(lesson => (
                  <li className="training__item">
                    {lesson.name}
                  </li>
                ))}
              </ul>
            </div>

            <Link to={'/video/' + course?._id} className="training__btn">
              <FaPlay color='#fff' />
              <span>Смотреть курс</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="result">
        <div className="container result__container">
          <h2 className="result__title">Что получите в результате</h2>
          <ul className="result__list">
            <li className="result__item">
              <div className="result__img">
                <img src={ResultImg1} alt="" />
              </div>
              <h3 className="result__name">Новые навыки</h3>
              <div className="result__desc">Занятия проходят в формате видеоуроков и доступны к изучению в любое удобное для вас время.</div>
            </li>
            <li className="result__item">
              <div className="result__img">
                <img src={ResultImg2} alt="" />
              </div>
              <h3 className="result__name">Закрепление знаний на практике</h3>
              <div className="result__desc">Для закрепления изученного материала и самопроверки в каждом уроке курса предусмотрено домашнее задание.
              </div>
            </li>
            <li className="result__item">
              <div className="result__img">
                <img src={ResultImg1} alt="" />
              </div>
              <h3 className="result__name">Сертификат программы</h3>
              <div className="result__desc">В конце курса вы получите сертификат, который подтвердит ваше участие в прохождении курса во время общения с работодателем.</div>
            </li>
          </ul>
        </div>
      </div>
      <div className="authors">
        <div className="container authors__container">
          <h2 className="authors__title">Авторы курса</h2>
          {/* <span className="wistia_embed wistia_async_cj8fjg9olh popover=true popoverAnimateThumbnail=true" style={{ display: 'inline-block', height: "84px", position: 'relative', width: '150px' }}>&nbsp;</span> */}

          <ul className="authors__list">
            {course?.authors.map(author => (
              <li key={author._id} className="authors__item">
                <div className="authors__img"><img src={author.avatarUrl} alt="" /></div>
                <div className="authors__name">{author.name}</div>
                <p className="authors__profi">{author.profession}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default DetailPage