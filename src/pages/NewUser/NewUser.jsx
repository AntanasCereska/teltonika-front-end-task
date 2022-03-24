import React, { useState, useEffect } from "react";
import "./new-user.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/categorySlice";
import { Labelnput } from "../../components/LabelInput/LabelInput";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { LabelPicklist } from "../../components/LabelPicklist/LabelPicklist";
import { Button } from "../../components/Button/Button";
import { regexEmail } from "../../data/regex";

export const NewUser = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);

  const genderOptions = ["male", "female", "other"];

  const initialValues = {
    first_name: "",
    last_name: "",
    gender: "",
    age: null,
    email: "",
    category_title: "",
    subcategory_title: "",
    subsubcategory_title: "",
    password: "",
    password_confirm: "",
    category_index: undefined,
    subcategory_index: undefined,
    subsubcategory_index: undefined,
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

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
        `User ${formValues.first_name} ${formValues.last_name} was added to '${formValues.category_title} ➜ ${formValues.subcategory_title} ➜ ${formValues.subsubcategory_title}'`
      );
      dispatch(
        addUser({
          values: formValues,
        })
      );
      setFormValues(initialValues);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};

    if (!values.first_name) {
      errors.first_name = "First name is requered";
    }
    if (!values.last_name) {
      errors.last_name = "Last name is requered";
    }
    if (!values.gender) {
      errors.gender = "Gender is requered";
    }
    if (!values.age) {
      errors.age = "Age is requered";
    } else if (values.age < 18 || values.age > 65) {
      errors.age = "Age must be between 18 and 65";
    }
    if (!values.email) {
      errors.email = "Email is requered";
    } else if (!regexEmail.test(values.email)) {
      errors.email = "Email is not valid";
    }
    if (!values.category_title) {
      errors.category_title = "Category is requered";
    }
    if (!values.subcategory_title) {
      errors.subcategory_title = "Sub-category is required";
    }
    if (!values.subsubcategory_title) {
      errors.subsubcategory_title = "Sub-sub-category is required";
    }
    if (!values.password) {
      errors.password = "Password is requered";
    } else if (values.password !== values.password_confirm) {
      errors.password = "Passwords do not match";
    } else if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }
    if (!values.password_confirm) {
      errors.password_confirm = "Password Confirm is requered";
    } else if (values.password !== values.password_confirm) {
      errors.password_confirm = "Passwords do not match";
    } else if (values.password.length < 8) {
      errors.password_confirm = "Password must be at least 8 characters long";
    }
    return errors;
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
    setFormValues({
      ...formValues,
      subcategory_index: categories?.[
        formValues.category_index
      ]?.subcategories.findIndex(
        (x) => x.title === formValues?.subcategory_title
      ),
    });
  }, [formValues.subcategory_title]);

  useEffect(() => {
    setFormValues({
      ...formValues,
      subsubcategory_index: categories?.[
        formValues.category_index
      ]?.subcategories?.[
        formValues.subcategory_index
      ]?.subsubcategories.findIndex(
        (x) => x.title === formValues.subsubcategory_title
      ),
    });
  }, [formValues.subsubcategory_title]);

  return (
    <div className="new-user">
      <form
        noValidate
        className="new-user__form"
        id="new-user-form"
        onSubmit={handleSubmit}
      >
        <div className="new-user__div1">
          <h1 className="new-user__title">Register new user</h1>
        </div>
        <div className="new-user__div2">
          <Labelnput
            label="First name"
            placeholder="user first name"
            type="text"
            func={handleChange}
            value={formValues.first_name}
            name={Object.keys(initialValues)[0]}
          />
          {formErrors.first_name && (
            <ErrorMessage text={formErrors.first_name} />
          )}
        </div>
        <div className="new-user__div3">
          <Labelnput
            label="Last name"
            placeholder="user last name"
            type="text"
            func={handleChange}
            value={formValues.last_name}
            name={Object.keys(initialValues)[1]}
          />
          {formErrors.last_name && <ErrorMessage text={formErrors.last_name} />}
        </div>
        <div className="new-user__div4">
          <LabelPicklist
            label="Gender"
            options={genderOptions}
            func={handleChange}
            value={formValues.gender}
            name={Object.keys(initialValues)[2]}
          />
          {formErrors.gender && <ErrorMessage text={formErrors.gender} />}
        </div>
        <div className="new-user__div5">
          <Labelnput
            label="Age"
            placeholder="user age"
            type="number"
            min={18}
            max={65}
            func={handleChange}
            value={formValues.age}
            name={Object.keys(initialValues)[3]}
          />
          {formErrors.age && <ErrorMessage text={formErrors.age} />}
        </div>
        <div className="new-user__div6">
          <Labelnput
            label="Email"
            placeholder="user email"
            type="email"
            func={handleChange}
            value={formValues.email}
            name={Object.keys(initialValues)[4]}
          />
          {formErrors.email && <ErrorMessage text={formErrors.email} />}
        </div>
        <div className="new-user__div7">
          <LabelPicklist
            label="Category"
            options={categories}
            func={handleChange}
            value={formValues.category_title}
            name={Object.keys(initialValues)[5]}
          />
          {formErrors.category_title && (
            <ErrorMessage text={formErrors.category_title} />
          )}
        </div>
        <div className="new-user__div8">
          <LabelPicklist
            label="Sub-category"
            options={categories?.[formValues.category_index]?.subcategories}
            func={handleChange}
            value={formValues.subcategory_title}
            name={Object.keys(initialValues)[6]}
          />
          {formErrors.subcategory_title && (
            <ErrorMessage text={formErrors.subcategory_title} />
          )}
        </div>
        <div className="new-user__div9">
          <LabelPicklist
            label="Sub-sub-category"
            options={
              categories?.[formValues.category_index]?.subcategories[
                formValues?.subcategory_index
              ]?.subsubcategories
            }
            func={handleChange}
            value={formValues.subsubcategory_title}
            name={Object.keys(initialValues)[7]}
          />
          {formErrors.subsubcategory_title && (
            <ErrorMessage text={formErrors.subsubcategory_title} />
          )}
        </div>
        <div className="new-user__div10">
          <Labelnput
            label="Password"
            placeholder="user password"
            type="password"
            func={handleChange}
            value={formValues.password}
            name={Object.keys(initialValues)[8]}
          />
          {formErrors.password && <ErrorMessage text={formErrors.password} />}
        </div>
        <div className="new-user__div11">
          <Labelnput
            label="Password confirm"
            placeholder="user password"
            type="password"
            func={handleChange}
            value={formValues.password_confirm}
            name={Object.keys(initialValues)[9]}
          />
          {formErrors.password_confirm && (
            <ErrorMessage text={formErrors.password_confirm} />
          )}
        </div>
        <div className="new-user__div12">
          <Button
            text="Create sub-category"
            type="submit"
            form="new-user-form"
            value="Submit"
          />
        </div>
      </form>
    </div>
  );
};
