import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import wuji from './assets/audio/wuji.mp3';

const messages = [
    "You are an amazing person!",
    "Your kindness is truly inspiring!",
    "You bring joy to those around you.",
    "Your hard work never goes unnoticed.",
    "You have a heart of gold.",
    "The world is a better place because of you.",
    "Your positivity is contagious!",
    "You are a beacon of light for others.",
    "Your smile brightens up any room.",
    "You are appreciated more than you know.",
];

function App() {
    const [advice, set_advice] = useState(messages[0]); // -- default message
    const [songPlayed, setSongPlayed] = useState(false);
    const [audio] = useState(new Audio(wuji));
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (songPlayed) {
            audio.loop = true;
            if (isPlaying) {
                audio.play();
            } else {
                audio.pause();
            }
        } else {
            audio.pause();
            audio.currentTime = 0;
        }
    }, [songPlayed, isPlaying, audio]);

    function get_advice() {
        //-- will pick random message from the array...
        const randomIndex = Math.floor(Math.random() * messages.length);
        set_advice(messages[randomIndex]);

        //-- makes sure that when you click get message, the song will play...
        if (!songPlayed) {
            setSongPlayed(true);
            setIsPlaying(true);
        }
    }

    const handleClick = () => {
        get_advice();
    };

    const handlePause = () => {
        setIsPlaying(false);
    };

    const handlePlay = () => {
        setIsPlaying(true);
    };

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100">
            <div className="row justify-content-center">
                <div className="col-sm-12">
                    <div className="container advice-container p-4 rounded text-center">
                        <h1 className="advice">"{advice}"</h1>
                    </div>
                    <div className="button-container mt-5">
                        <button className="btn btn-purple btn-lg btn-custom" onClick={handleClick}>Get Message</button>
                    </div>
                    {songPlayed && isPlaying ? (
                        <div className="pause-button-container">
                            <button className="btn btn-secondary btn-sm btn-block pause-button" onClick={handlePause}>Pause Song</button>
                        </div>
                    ) : (
                        <div className="pause-button-container">
                            <button className="btn btn-secondary btn-sm btn-block pause-button" onClick={handlePlay}>Play Song</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
