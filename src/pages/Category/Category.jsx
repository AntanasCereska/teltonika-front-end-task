import React, { useState } from "react";
import "./category.scss";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Table } from "../../components/Table/Table";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { Labelnput } from "../../components/LabelInput/LabelInput";

export const Category = () => {
  const { id, subId } = useParams();
  const newId = id.replaceAll("_", " "); //category id
  const newSubId = subId.replaceAll("_", " "); //subCategory id

  const [input, setInput] = useState("");

  const categories = useSelector((state) =>
    state.categories.find((x) => x.title === newId)
  );

  const subCategories =
    categories &&
    categories.subcategories.find((item) => item.title === newSubId);
  console.log(subCategories);
  return (
    <div className="category">
      <div className="category__header">
        <h1 className="category__category-title">Category: {newId && newId}</h1>
        <h2 className="category__subcategory-title">
          Sub-category: {subCategories?.title}
        </h2>
        <Labelnput
          value={input}
          label="Search for category"
          placeholder="input search word to filter sub-sub-categories"
          func={(e) => setInput(e.target.value)}
        />
      </div>
      <div className="category__data">
        {!subCategories?.subsubcategories ||
          (subCategories?.subsubcategories.length === 0 && (
            <ErrorMessage text="No sub-sub-categories" size="medium" />
          ))}
        {subCategories?.subsubcategories
          ?.filter((subsubcategory) => {
            if (input === "") {
              return subsubcategory;
            } else if (
              subsubcategory?.title.toLowerCase().includes(input.toLowerCase())
            ) {
              return subsubcategory;
            }
          })
          .map((subsubcategory) => (
            <div className="category__data-item" key={subsubcategory.title}>
              <Table data={subsubcategory} />
            </div>
          ))}
        <div className="category__aaa"></div>
      </div>
    </div>
  );
};
