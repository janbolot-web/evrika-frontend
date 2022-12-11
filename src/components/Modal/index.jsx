import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { createCourse } from '../../store/slices/course'

import './Modal.scss'

const Modal = ({ setShowModal, dispatch, serCourseData }) => {
  const [title, setTitle] = useState('Комеди Клаб, 10 сезон, 23 выпуск')
  const [duration, setDuration] = useState('5 часов / 15 уроков')
  const [description, setDescription] = useState('Шутки резидентов Comedy Club заразны, но не опасны. Наоборот, они способны качественно повысить уровень жизни граждан огромной страны. Смотрите, даже доллар и евро падают со смеху, а настроение у нефти растет прямо на глазах!')
  const [price, setPrice] = useState(5999)
  const [previewImgUrl, setPreviewImgUrl] = useState('https://www.imgworlds.com/wp-content/themes/IMG2019/img/phase3/slides/lostvalley-trex.png')
  const [previewVideoUrl, setPreviewVideoUrl] = useState('4lv6yuh36n')
  const [authorName, setAuthorName] = useState('ФИО')
  const [authorProfession, setAuthorProfession] = useState('Учитель кыргызского языка и литературы')
  const [authors, setAuthors] = useState([])
  const [modules, setModules] = useState([
    {
      name: "",
      lessons: [
        {
          name: "",
          videoUrl: "",
          description: ""
        }
      ]
    }
  ])

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
      // lessons: lessons,
    }

    dispatch(createCourse(courseData))
    // console.log(courseData);
    setShowModal(false)
  }

  // useEffect(() => {
  //   setLessons([
  //     ...lessons, { name: lessonName, videoUrl: lessonVideoUrl, description: lessonDescription }
  //   ])
  // }, [lessonName, lessonVideoUrl, lessonDescription])

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

        {/* <input type="text" className='modal__module' />
        <div className="modal__btn">
          <button onClick={() => setModuleTitle()}>
            <BsPlusLg />
            <span>
              Добавить модуль
            </span>
          </button>
        </div> */}
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