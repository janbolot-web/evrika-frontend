import React, { useEffect, useState } from 'react'
import { BsPlusLg } from 'react-icons/bs'
import { MdOutlineClose } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { createCourse } from '../../store/slices/course'

import './Modal.scss'

const Modal = ({ setShowModal }) => {
  const [title, setTitle] = useState('Комеди Клаб, 10 сезон, 23 выпуск')
  const [duration, setDuration] = useState('5 часов / 15 уроков')
  const [description, setDescription] = useState('Шутки резидентов Comedy Club заразны, но не опасны. Наоборот, они способны качественно повысить уровень жизни граждан огромной страны. Смотрите, даже доллар и евро падают со смеху, а настроение у нефти растет прямо на глазах!')
  const [price, setPrice] = useState(5999)
  const [previewImgUrl, setPreviewImgUrl] = useState('https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')
  const [previewVideoUrl, setPreviewVideoUrl] = useState('4lv6yuh36n')
  const [authorName, setAuthorName] = useState('Гулсана Дуйшонбиева')
  const [authorProfession, setAuthorProfession] = useState('Учитель кыргызского языка и литературы')
  const [authors, setAuthors] = useState([])
  const [lessons, setLessons] = useState([])
  const [inputCount, setInputCount] = useState([])
  const [lessonName, setLessonName] = useState("Урок 1")
  const [lessonVideoUrl, setLessonVideoUrl] = useState("4lv6yuh36n")
  const [lessonDescription, setLessonDescription] = useState("Выпуск шикарный, больше видео и лайков добавили бы)")
  const dispatch = useDispatch()

  const addCourseHandler = () => {
    setAuthors({
      name: "Екатерина Никитина",
      profession: "Бизнес-ментор, коуч команд продаж",
      avatarUrl: "https://drive.google.com/file/d/1xo6VFYSnX5Ano2jki4HPhReYhnsYg-7L/view?usp=share_link",
    })
    const courseData = {
      title,
      duration,
      description,
      price,
      previewImgUrl,
      previewVideoUrl,
      authorName,
      authorProfession,
      authors: [{
        name: "Екатерина Никитина",
        profession: "Бизнес-ментор, коуч команд продаж",
        avatarUrl: "https://drive.google.com/file/d/1xo6VFYSnX5Ano2jki4HPhReYhnsYg-7L/view?usp=share_link",
      }],
      lessons: [lessons],
    }
    dispatch(createCourse(courseData))
    setShowModal(false)
  }

  useEffect(() => {
    setLessons({ name: lessonName, videoUrl: lessonVideoUrl, description: lessonDescription })
  }, [lessonName, lessonVideoUrl, lessonDescription])

  return (
    <div className='modal'>
      <div className="container modal__container">
        <h2 className="modal__title">Новый курс: {title}</h2>
        <div className="modal__block">
          <div className="modal__preview">
            <img src={previewImgUrl} alt="" />
            <h3>Описание</h3>
            <p>{description}</p>
            <span>Цена: {price} сом</span>
          </div>
          <div action="" className='modal__form'>
            <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder='Название курса' />
            <textarea name="" id="" cols="30" value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Описание' rows="10"></textarea>
            <input value={duration} onChange={(e) => setDuration(e.target.value)} type="text" placeholder='Продолжителность курса' />
            <input value={previewImgUrl} onChange={(e) => setPreviewImgUrl(e.target.value)} type="text" placeholder='Ссылка на изоброжение (превью)' />
            <input value={previewVideoUrl} onChange={(e) => setPreviewVideoUrl(e.target.value)} type="text" placeholder='Ссылка на видео (превью)' />
            <input value={price} onChange={(e) => setPrice(e.target.value)} type="text" placeholder='Цена курса' />
            <input value={authorName} onChange={(e) => setAuthorName(e.target.value)} type="text" placeholder='ФИО автора' />
            <input value={authorProfession} onChange={(e) => setAuthorProfession(e.target.value)} type="text" placeholder='Профессия автора' />
          </div>
        </div>
        {inputCount.map((item, i) => (
          <form key={i} className="modal__video-form">
            <span>
              <MdOutlineClose size={24} onClick={() => {
              }} />
            </span>
            <input value={lessonName} onChange={(e) => setLessonName(e.target.value)} type="text" placeholder='Название видео' />
            <input value={lessonVideoUrl} onChange={(e) => setLessonVideoUrl(e.target.value)} type="text" placeholder='Ссылка на видео' />
            <textarea name="" value={lessonDescription} onChange={(e) => setLessonDescription(e.target.value)} id="" cols="30" placeholder='Описание' rows="10"></textarea>
          </form>
        ))}
        <div className="modal__btn">
          <button onClick={() => setInputCount([...inputCount, 1])}>
            <BsPlusLg />
            <span>
              Добавить видео файл
            </span>
          </button>
        </div>
        <div className="modal__btns">
          <div className="modal__btn ">
            <button onClick={() => setShowModal(false)} className='cancel_btn'>
              Отмена
            </button>
          </div>
          <div className="modal__btn">
            <button onClick={addCourseHandler} className='succes_btn'>
              Добавить
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal