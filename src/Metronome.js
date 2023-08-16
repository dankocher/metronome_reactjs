import React, {useState, useEffect, useRef} from 'react';

const host = window.location.hostname === "localhost" ? window.location.origin : "https://dankocher.github.io/metronome_reactjs";

function Metronome() {
    const [tempo, setTempo] = useState(200);
    const [isPlaying, setIsPlaying] = useState(false);
    const [beats, setBeats] = useState(0);

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const tickSound = useRef(new Audio(host + "/audio/sound0.wav"));

    useEffect(() => {
        if (isPlaying) {
            tick();
            const timer = setInterval(tick, (60 / tempo) * 1000);
            return () => clearInterval(timer);
        }
    }, [isPlaying, tempo]);

    const handleTempoChange = (event) => {
        setTempo(parseInt(event.target.value, 10) || 0);
    }

    const toggleMetronome = () => {
        setIsPlaying(!isPlaying);
    }

    const tick = () => {
        tickSound.current.currentTime = 0;
        tickSound.current.play();
        setBeats(v => v+1)
    }

    return (
        <div className="metronome">
            <h1>Metronome</h1>
            <h2>Beats: <b>{beats}</b></h2>
            <div className="controls">
                <label htmlFor="tempo">Tempo: </label>
                <input
                    type="number"
                    id="tempo"
                    value={tempo}
                    onChange={handleTempoChange}
                />
                <button onClick={toggleMetronome}>
                    {isPlaying ? 'Stop' : 'Start'}
                </button>
            </div>
        </div>
    );
}

export default Metronome;
