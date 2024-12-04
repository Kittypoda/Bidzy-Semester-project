import "../css/styles.css";
import router from "./router";

console.log("app.js loaded!");


await router(window.location.pathname);