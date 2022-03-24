import React, { useState, useEffect } from "react";
import "./create-sub-sub-category.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Labelnput } from "../../components/LabelInput/LabelInput";
import { LabelPicklist } from "../../components/LabelPicklist/LabelPicklist";
import { addSubSubCategory } from "../../redux/categorySlice";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { Button } from "../../components/Button/Button";
import { regexSpecialCharacters } from "../../data/regex";

export const CreateSubSubCategory = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);

  const initialValues = {
    category_title: "",
    subcategory_title: "",
    subsubcategory_title: "",
    category_index: undefined,
    subcategory_index: undefined,
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
      errors.subcategory_title = "Select sub-category";
    }
    if (!values.subsubcategory_title) {
      errors.subsubcategory_title = "Select sub-sub-category";
    } else if (
      categories[formValues.category_index].subcategories[
        formValues.subcategory_index
      ].subsubcategories.some(
        (i) => i.title === formValues.subsubcategory_title
      )
    ) {
      errors.subsubcategory_title = "Sub-sub-category with this title exists";
    } else if (regexSpecialCharacters.test(values.subsubcategory_title)) {
      errors.subsubcategory_title = "Special characters not allowed";
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
      alert(
        `Sub-sub-category '${formValues.subsubcategory_title}' for '${formValues.category_title} -> '${formValues.subcategory_title}' was created`
      );
      dispatch(
        addSubSubCategory({
          title: formValues.subsubcategory_title,
          category: formValues.category_title,
          subcategory: formValues.subsubcategory_title,
          category_index: formValues.category_index,
          subcategory_index: formValues.subcategory_index,
        })
      );
      setFormValues(initialValues);
    }
  }, [formErrors]);

  useEffect(() => {
    setFormValues({
      ...formValues,
      category_index: categories.findIndex(
        (x) => x.title === formValues?.category_title
      ),
    });
  }, [formValues.category_title]);

  useEffect(() => {
    setFormValues({
      ...formValues,
      subcategory_index: categories?.[
        formValues.category_index
      ]?.subcategories.findIndex(
        (x) => x.title === formValues?.subcategory_title
      ),
    });
  }, [formValues.subcategory_title]);

  return (
    <div className="create-sub-sub-category">
      <form
        noValidate
        className="create-sub-category__form"
        id="create-sub-sub-category"
        onSubmit={handleSubmit}
      >
        <h1>
          <span style={{ display: "block" }}>Create </span>sub-sub-category
        </h1>
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
          <LabelPicklist
            label="Select Sub-Category"
            options={categories?.[formValues.category_index]?.subcategories}
            func={handleChange}
            value={formValues.subcategory_title}
            name={Object.keys(initialValues)[1]}
          />
          {formErrors.subcategory_title && (
            <ErrorMessage text={formErrors.subcategory_title} />
          )}
        </div>
        <div>
          <Labelnput
            label="Sub-Sub-Category title"
            placeholder="sub-sub-category title"
            type="text"
            func={handleChange}
            value={formValues.subsubcategory_title}
            name={Object.keys(initialValues)[2]}
          />
          {formErrors.subsubcategory_title && (
            <ErrorMessage text={formErrors.subsubcategory_title} />
          )}
        </div>
        <Button
          text="Create sub-sub-category"
          type="submit"
          form="create-sub-sub-category"
          value="Submit"
        />
      </form>
    </div>
  );
};
