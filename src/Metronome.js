import React, {useState, useEffect, useRef} from 'react';

function Metronome() {
    const [tempo, setTempo] = useState(200);
    const [isPlaying, setIsPlaying] = useState(false);
    const [beats, setBeats] = useState(0);

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const tickSound = useRef(new Audio("/audio/sound0.wav"));

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
