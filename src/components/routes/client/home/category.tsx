import React from 'react'
import { Link } from 'react-router-dom'
import css from './category.module.css';
import { ReduxProps } from '.'

const Category: React.FC<ReduxProps> = (props) => {
  const { isAuth } = props;
  return (
    <>
      <div className={css.body}>
        <h1 className={css.titleWelcome}>Bienvenido a Artesanos Unidos</h1>
        <p className={css.pTitle}>El mejor sitio para crear tu artesania.</p>
      </div>
      <div className={css.buttonsBody}>
        <div className={css.btnBody}>
          <Link to='/publicProduct'>Empezar</Link>
        </div>
        {!isAuth &&
          <div className={css.btnBodyR}>
            <Link to='/register'>Registrarse</Link>
          </div>
        }
      </div>
    </>
  )
}

export default Category;