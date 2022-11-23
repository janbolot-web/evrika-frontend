import React, { useEffect } from 'react'
import { AiFillInfoCircle } from 'react-icons/ai'
import { FaPlay } from 'react-icons/fa'

import './HomePage.scss'
import mainImg from '../../assets/img/main-banner.svg'
import Courses from '../../components/Courses'

const HomePage = () => {

  return (
    <div className='home'>
      <div className="home__container container">
        <div className="home__banner">
          <div className="home__banner-content">
            <h1 className="home__title">Актуальные цифровые навыки для всех!</h1>
            <div className="home__buttons">
              <div className="home__about">
                <AiFillInfoCircle size={22} />
                <span >О проекте</span>
              </div>
              <div className="home__start">
                <FaPlay />
                <span>С чего начать</span></div>
            </div>
            <div className="home__description">
              <span>56554</span>
              <p>человек принимают <br />участие в проекте</p>
            </div>
          </div>
          <div className="home__img">
            <img src={mainImg} />
          </div>
        </div>
        <Courses />
      </div>
    </div>
  )
}

export default HomePage