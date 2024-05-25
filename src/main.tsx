import React from "react";
import ReactDOM from "react-dom/client";
import App from "./presentation/App.tsx";


// PrimeReact
// import "./index.css"; 
// import 'primereact/resources/themes/lara-dark-cyan/theme.css';
// import 'primereact/resources/themes/lara-light-cyan/theme.css';
import "primeicons/primeicons.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
