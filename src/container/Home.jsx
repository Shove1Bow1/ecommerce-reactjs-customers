import React from "react";
import Banner from "../components/banner/Banner";
import CategoryMenu from "../components/menu/CategoryMenu";
import NewRunner from "../components/runner/NewRunner";

function Home(props) {
  const filter = [
    "Đồ gia dụng",
    "May mặc",
    "Điện tử",
    "Công nghệ",
    "Máy tính",
    "Lót chuột",
  ];
  console.log(filter);
  return (
    <div>
      <Banner />
      <CategoryMenu title="Best from Product " item={filter} />
      <NewRunner />
    </div>
  );
}

export default Home;