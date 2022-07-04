import { Component, useState } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrodBoundary from "../errorBoundary/ErrorBoundary";
import ComicsList from "../comicsList/ComicsList";
import MainPage from "../pages/MainPage";
import Page404 from "../pages/404"
import { Route, Routes } from "react-router-dom";
import SingleComicPage from "../pages/singleComicPage/SingeComicPage";

const App = () => {

    const [selectedChar, setChar] = useState(null)

    const onCharSelected = (id) => {
        setChar(id)
    }

    return (
        <div className="app">
            <AppHeader/>
            <main>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/comics" element={<ComicsList />} />
                    <Route path="*" element={<Page404 />} />
                    <Route path="/comics/:comicId" element={<SingleComicPage />} />
                </Routes>
            </main>
        </div>
    )

}

export default App;