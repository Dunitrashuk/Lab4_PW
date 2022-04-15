import React from 'react';
import './index.css';
import App from './App';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { createRoot } from "react-dom/client";
import SignUp from "./pages/SignUp";
import Landing from "./pages/Landing";
import Quiz from "./pages/Quiz";
import MakeQuiz from "./pages/MakeQuiz";
import Sound from "react-sound";
import song from "./song.mp3";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
    <BrowserRouter>
        <Sound
            url={song}
            playStatus="PLAYING"
            loop={true}
            />
        <Routes>
            <Route path="/" exact element={<App />}/>
            <Route path="/login" exact element={<SignUp />} />
            <Route path="/landing" exact element={<Landing />} />
            <Route path="/quiz" exact element={<Quiz />} />
            <Route path="/makeQuiz" exact element={<MakeQuiz />}/>
            <Route
                path="*"
                element={
                    <main style={{ padding: "1rem" }}>
                        <p>There's nothing here!</p>
                    </main>
                }
            />
        </Routes>
    </BrowserRouter>
);

