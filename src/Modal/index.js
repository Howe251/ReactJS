import {useRef, useEffect} from 'react';

import cn from 'classnames';
import s from './index.module.css';

const Modal = ({title, children, onCloseModal, isOpen}) => {
  const modalEl = useRef()

  useEffect(() => {
    document.querySelector('body').style.overflow = isOpen ? 'hidden' : null;
  }, [isOpen])

  const handleCloseModal = () => {
    onCloseModal && onCloseModal(false)
  }

  const handleClickRoot = (event) => {
    //console.log("### click outside", modalEl.current.contains(event.target));
    if (!modalEl.current.contains(event.target)) {
      handleCloseModal()
    }
  }

  return (
    <div
      className={cn(s.root, {
        [s.open]: isOpen
      })}
      onClick={handleClickRoot}
    >
        <div
          className={s.modal}
          ref={modalEl}
        >
            <div className={s.head}>
    						{title}
                <span
                  className={s.btnClose}
                  onClick={handleCloseModal}
                ></span>
            </div>
            <div className={s.content}>
                {children}
            </div>
        </div>
    </div>
  )
}

export default Modal;
