import React, { useState, useEffect } from "react";
import "./category.scss";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Table } from "../../components/Table/Table";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { Labelnput } from "../../components/LabelInput/LabelInput";
import { Container } from "../../components/Container/Container";

export const Category = () => {
  const { id, subId } = useParams();
  const newId = id.replaceAll("_", " "); //category id with ' ' replaced by '_'
  const newSubId = subId.replaceAll("_", " "); //subCategory id with ' ' replaced by '_'

  const categories = useSelector((state) =>
    state.categories.find((category) => category?.title === newId)
  );

  const subcategories =
    categories &&
    categories.subcategories?.find((item) => item?.title === newSubId);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    setSearchInput("");
  }, [subId]);

  return (
    <div className="category">
      <Container background>
        <h1 className="category__category-title">Category: {newId && newId}</h1>
        <h2 className="category__subcategory-title">
          Sub-category: {subcategories?.title}
        </h2>
        <Labelnput
          disabled={subcategories?.subsubcategories.length === 0 && true}
          value={searchInput}
          label="Search for sub-sub-category"
          placeholder="input search word to filter sub-sub-categories"
          func={(e) => setSearchInput(e.target.value)}
        />
      </Container>
      <Container>
        <div className="category__data">
          {subcategories?.subsubcategories.length === 0 && (
            <ErrorMessage text="No sub-sub-categories" size="large" />
          )}
          {subcategories?.subsubcategories
            .filter((sub) => {
              if (searchInput === "") {
                return sub;
              } else if (
                sub?.title.toLowerCase().includes(searchInput.toLowerCase())
              ) {
                return sub;
              }
              return false;
            })
            .map((subSub) => (
              <div className="category__data-item" key={subSub.title}>
                <Table data={subSub} />
              </div>
            ))}
        </div>
      </Container>
    </div>
  );
};
