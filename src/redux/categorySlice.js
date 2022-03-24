import { createSlice } from "@reduxjs/toolkit";
import { dummyLocalStorageData } from "../data/dummyLocalStorageData";

//get local storage data/dummy data
const localStorageData = localStorage.getItem("categories");
const parsedLocalStorageData =
  JSON.parse(localStorageData) || dummyLocalStorageData;

const categorySlice = createSlice({
  name: "categories",
  initialState: parsedLocalStorageData, //load existing/dummy data

  reducers: {
    //ADD CATEGORY
    addCategory: (state, action) => {
      const category = {
        title: action.payload.category_title,
        subcategories: action.payload.subcategories,
      };
      state.push(category);
    },

    //DELETE CATEGORY
    deleteCategory: (state, action) => {
      return state.filter(
        (todo) => todo.title !== action.payload.category_title
      );
    },

    //ADD SUB-CATEGORY
    addSubCategory: (state, action) => {
      const subcategory = {
        title: action.payload.subcategory_title,
        subsubcategories: [],
      };

      return state.map((category) =>
        category.title === action.payload.category
          ? {
              ...category,
              subcategories: [...category.subcategories, subcategory],
            }
          : category
      );
    },

    //DELETE SUB-CATEGORY (//!needs refactoring)
    deleteSubCategory: (state, action) => {
      const deleteSubCategory = {
        category_title: action.payload.category_title,
        subcategory_title: action.payload.subcategory_title,
      };
      let lists = [];
      let listItems = [];

      for (let i = 0; i < state.length; i++) {
        if (state[i].title !== action.payload.category_title) {
          lists = [...lists, state[i]];
        } else {
          for (let j = 0; j < state[i].subcategories.length; j++) {
            if (
              state[i].subcategories[j].title !==
              action.payload.subcategory_title
            ) {
              listItems = [...listItems, state[i].subcategories[j]];
            }
            listItems = [...listItems];
          }
          lists = [
            ...lists,
            {
              title: action.payload.category_title,
              subcategories: [...listItems],
            },
          ];
        }
      }
      return lists;
    },

    //ADD SUB-SUB-CATEGORY
    addSubSubCategory: (state, action) => {
      const subsubcategory = {
        title: action.payload.title,
        users: [],
      };
      state[action.payload.category_index].subcategories[
        action.payload.subcategory_index
      ].subsubcategories.push(subsubcategory);
    },

    //ADD USER
    addUser: (state, action) => {
      const user = {
        first_name: action.payload.values.first_name,
        last_name: action.payload.values.last_name,
        gender: action.payload.values.gender,
        age: action.payload.values.age,
        email: action.payload.values.email,
        password: action.payload.values.password,
      };
      state[action.payload.values.category_index].subcategories[
        action.payload.values.subcategory_index
      ].subsubcategories[action.payload.values.subsubcategory_index].users.push(
        user
      );
    },
  },
});

export const {
  addCategory,
  deleteCategory,
  addSubCategory,
  deleteSubCategory,
  addSubSubCategory,
  addUser,
} = categorySlice.actions;
export default categorySlice.reducer;
