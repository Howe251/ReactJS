import Menu from "./Menu.js"
import NavBar from "./NavBar.js"
import {useState} from 'react';

const MenuHeader = () =>{
  const [isActive, setActive] = useState(false);
  const handleClickMenu = (isActive) => {
    setActive(prevState => !prevState);
    console.log('####: <Menu />');
  }
return (
  <>
  <Menu onClickMenu={isActive}/>
  <NavBar onClickMenu={handleClickMenu} isActive={isActive}/>
  </>
)
}
export default MenuHeader;
