import React from "react";
import { ItemList } from "../ItemList";
import Nav from '../Nav'

const Store = ({ items, setCategory, categories }) => {
  return (
    <>
      <Nav setCategory={setCategory} categories={categories} />
      <div className="store">
        <ItemList items={items} />
      </div>
    </>
  );
};

export default Store;
