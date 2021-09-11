import './App.css';

import Header from "./Components/Header.js";
import Layout from "./Components/Layout.js";
import Footer from "./Components/Footer.js";

import bg1 from "./static/img/bg1.jpg"
import bg3 from "./static/img/bg3.jpg"

import React from 'react';

const App = () => {
  return (
      <>
          <Header />
          <Layout title = "Здесь будет Покедекс" urlBg = {bg1}/>
          <Layout title = "Переход на пляж" colorBg = "#e2e2e2"/>
          <Layout title = "Тут Покемоны могут отдохнуть" urlBg = {bg3} colorBg = "#e2e2e2"/>
          <Footer/>
      </>
    )
}

export default App;
