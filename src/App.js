import './App.css';

import Header from "./Components/Header.js";
import Layout from "./Components/Layout.js";
import Footer from "./Components/Footer.js";

import React from 'react';

const App = () => {
  return (
      <>
          <Header />
          <Layout title = "Здесь будет Покедекс" urlBg = "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/e4337cf5-3f3b-4436-b045-8aff91da2cac/bg1.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210909%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210909T170708Z&X-Amz-Expires=86400&X-Amz-Signature=d7562913884b6751d6600145b28421c5b735ea4d6a8ab83148e509290aed9939&X-Amz-SignedHeaders=host"/>
          <Layout title = "Переход на пляж" colorBg = "#e2e2e2"/>
          <Layout title = "Тут Покемоны могут отдохнуть" urlBg = "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/3e62948f-bef9-4af8-b2f6-c0a97abc27a7/bg3.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210909%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210909T170708Z&X-Amz-Expires=86400&X-Amz-Signature=25c6941c0f274b8c69bb78afafdbf8a674206aa3a6d74876ef0c27a8226c6e7f&X-Amz-SignedHeaders=host"/>
          <Footer/>
      </>
    )
}

export default App;
