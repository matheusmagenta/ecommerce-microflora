import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducer";
import { categoriesReducer } from "./categories/categories.reducer";

// root reducer: combination of all reducers
export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
});
