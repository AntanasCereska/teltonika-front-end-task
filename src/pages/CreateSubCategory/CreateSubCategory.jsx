import React, { useState, useEffect } from "react";
import "./create-sub-category.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addSubCategory } from "../../redux/categorySlice";
import { Labelnput } from "../../components/LabelInput/LabelInput";
import { LabelPicklist } from "../../components/LabelPicklist/LabelPicklist";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { Button } from "../../components/Button/Button";
import { regexSpecialCharacters } from "../../data/regex";

export const CreateSubCategory = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);

  const initialValues = {
    category_title: "",
    subcategory_title: "",
    category_index: undefined,
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const validate = (values) => {
    const errors = {};

    if (!values.category_title) {
      errors.category_title = "Select category";
    }
    if (!values.subcategory_title) {
      errors.subcategory_title = "Sub-Category title is required";
    } else if (
      categories[formValues.category_index].subcategories.some(
        (j) => j.title === formValues.subcategory_title
      )
    ) {
      errors.subcategory_title = "Sub-category with this title already exists";
    } else if (regexSpecialCharacters.test(values.subcategory_title)) {
      errors.subcategory_title = "Special characters not allowed";
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
    setFormValues({
      ...formValues,
      category_index: categories.findIndex(
        (x) => x.title === formValues?.category_title
      ),
    });
  }, [formValues.category_title]);

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      alert(
        `Sub-category '${formValues.subcategory_title}' for '${formValues.category_title}' category was created`
      );
      dispatch(
        addSubCategory({
          category: formValues.category_title,
          subcategory_title: formValues.subcategory_title,
        })
      );
      setFormValues(initialValues);
    }
  }, [formErrors]);

  return (
    <div className="create-sub-category">
      <form
        noValidate
        className="create-sub-category__form"
        id="create-sub-category"
        onSubmit={handleSubmit}
      >
        <h1>Create Sub-Category</h1>
        <div>
          <LabelPicklist
            label="Select Category"
            options={categories}
            func={handleChange}
            value={formValues.category_title}
            name={Object.keys(initialValues)[0]}
          />
          {formErrors.category_title && (
            <ErrorMessage text={formErrors.category_title} />
          )}
        </div>
        <div>
          <Labelnput
            label="Sub-Category title"
            placeholder="sub-category title"
            type="text"
            func={handleChange}
            value={formValues.subcategory_title}
            name={Object.keys(initialValues)[1]}
          />
          {formErrors.subcategory_title && (
            <ErrorMessage text={formErrors.subcategory_title} />
          )}
        </div>
        <Button
          text="Create sub-category"
          type="submit"
          form="create-sub-category"
          value="Submit"
        />
      </form>
    </div>
  );
};
