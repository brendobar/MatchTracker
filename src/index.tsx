import ReactDOM from "react-dom/client"
import {BrowserRouter, Route, Routes} from "react-router"
import App from "./App"
import './index.scss'
import Layout from "@/components/Layout/Layout";
import {Test} from "@/pages/test/Text.lazy";



const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
    <App/>
);