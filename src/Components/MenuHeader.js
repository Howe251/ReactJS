import Menu from "./Menu.js"
import NavBar from "./NavBar.js"
import {useState} from 'react';

const MenuHeader = ({bgActive}) =>{
  const [isActive, setActive] = useState(null);
  const handleClick = (isActive) => {
    setActive(prevState => !prevState);
  }
return (
  <>
  <Menu onClickMenu={handleClick} menuClicked={isActive}/>
  <NavBar bgActive={bgActive} onClickMenu={handleClick} isActive={isActive}/>
  </>
)
}
export default MenuHeader;
