import Parse from "parse/dist/parse.min.js";
const {
  REACT_APP_PARSE_APPLICATION_ID,
  REACT_APP_PARSE_JAVASCRIPT_KEY,
  REACT_APP_PARSE_HOST_URL,
} = process.env;
Parse.serverURL = REACT_APP_PARSE_HOST_URL;
Parse.initialize(
  REACT_APP_PARSE_APPLICATION_ID,
  REACT_APP_PARSE_JAVASCRIPT_KEY
);
