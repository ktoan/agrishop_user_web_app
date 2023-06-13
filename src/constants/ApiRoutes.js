const BASE = "http://localhost:8080/api/v1";

const AUTH = BASE + "/auth";
const USER = BASE + "/users";
const POST = BASE + "/posts";
const PRODUCT = BASE + "/products";
const ADDRESS = BASE + "/addresses";
const CART = BASE + "/cart";
const ORDER = BASE + "/orders";
const CATEGORY = BASE + "/categories";
const REVIEW = BASE + "/reviews";

// Authentication
const LOGIN = AUTH + "/login";
const REGISTER = AUTH + "/register";
const LOAD_USER = AUTH + "/loadUser";
const SEND_VERIFY_TOKEN = AUTH + "/send-confirm-code";
const CONFIRM_REGISTRATION = AUTH + "/confirm-registration";
// User
const CHANGE_PASSWORD = USER + "/change-password";
const UPDATE_INFORMATION = USER + "/update";
const CHANGE_AVATAR = USER + "/change-avatar";
// Posts
const FETCH_POSTS = POST;
// Product
const FETCH_PRODUCTS = PRODUCT;
// Category
const FETCH_CATEGORIES = CATEGORY;
// Addresses
const FETCH_USER_OWN_ADDRESSES = ADDRESS + "/user-addresses";
const CREATE_NEW_ADDRESS = ADDRESS + "/create";
const UPDATE_ADDRESS = ADDRESS + "/update";
const DELETE_ADDRESS = ADDRESS + "/delete";
// Cart
const FETCH_USER_OWN_CART = CART;
const UPDATE_CART = CART + "/update";
const DELETE_CART = CART + "/delete";
// Orders
const FETCH_USER_OWN_ORDERS = ORDER;
const CREATE_ORDER = ORDER + "/create-order";
// Reviews
const CREATE_REVIEW = REVIEW + "/create";

const ApiRoutes = {
  // Authentication
  LOGIN,
  REGISTER,
  LOAD_USER,
  SEND_VERIFY_TOKEN,
  CONFIRM_REGISTRATION,
  // User
  CHANGE_PASSWORD,
  UPDATE_INFORMATION,
  CHANGE_AVATAR,
  // Post
  FETCH_POSTS,
  // Product
  FETCH_PRODUCTS,
  // Address
  FETCH_USER_OWN_ADDRESSES,
  CREATE_NEW_ADDRESS,
  DELETE_ADDRESS,
  UPDATE_ADDRESS,
  // Cart
  FETCH_USER_OWN_CART,
  UPDATE_CART,
  DELETE_CART,
  // Order
  FETCH_USER_OWN_ORDERS,
  CREATE_ORDER,
  // Review
  CREATE_REVIEW,
  // Category
  FETCH_CATEGORIES,
};

export default ApiRoutes;
