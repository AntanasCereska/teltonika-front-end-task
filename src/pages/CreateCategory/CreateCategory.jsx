import React, { useState, useEffect } from "react";
import "./create-category.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addCategory } from "../../redux/categorySlice";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { Button } from "../../components/Button/Button";
import { Labelnput } from "../../components/LabelInput/LabelInput";
import { regexSpecialCharacters } from "../../data/regex";

export const CreateCategory = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);

  const initialValues = {
    category_title: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const validate = (values) => {
    const errors = {};

    if (!values.category_title) {
      errors.category_title = "Category title is required";
    } else if (categories.some((i) => i.title === values.category_title)) {
      errors.category_title = "Category with this title already exists";
    } else if (regexSpecialCharacters.test(values.category_title)) {
      errors.category_title = "Special characters not allowed";
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      alert(`Category ${formValues.category_title} was created`);
      dispatch(
        addCategory({
          category_title: formValues.category_title,
          subcategories: [],
        })
      );
      setFormValues(initialValues);
    }
  }, [formErrors]);

  return (
    <div className="create-category">
      <form
        className="create-category__form"
        id="create-category"
        onSubmit={handleSubmit}
      >
        <h1>Create Category</h1>
        <div>
          <Labelnput
            label="Category title"
            placeholder="category title"
            type="text"
            func={handleChange}
            value={formValues.category_title}
            name={Object.keys(initialValues)[0]}
          />
          {formErrors.category_title && (
            <ErrorMessage text={formErrors.category_title} />
          )}
        </div>
        <Button
          text="Create category"
          type="submit"
          form="create-category"
          value="Submit"
        />
      </form>
    </div>
  );
};
