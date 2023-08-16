import React, {useState, useEffect, useRef} from 'react';
import styled, { keyframes } from 'styled-components';

const host = window.location.hostname === "localhost" ? window.location.origin : "https://dankocher.github.io/metronome_reactjs";

const MetronomeWrapper = styled.div`
  text-align: center;
  position: relative;
  width: 200px;
  justify-content: center;
  align-content: center;
  align-items: center;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Controls = styled.div`
  margin-top: 20px;
  justify-content: center;
  align-content: center;
  align-items: center;
  flex: 1;
  display: flex;
  flex-direction: column;
  
`;

const Count = styled.div`
  font-size: 24px;
  margin-top: 10px;
`;

const Button = styled.button`
  font-size: 18px;
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #0056b3;
  }
`;

const tickAnimation = (tempo) => keyframes`
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(120px);
  }
`;

const BouncingCircle = styled.div`
  width: 20px;
  height: 20px;
  background-color: #ff5733;
  border-radius: 50%;
  position: absolute;
  animation: ${(props) => tickAnimation(props.tempo)} ${(props) => 120 / props.tempo}s linear infinite;
`;


function Metronome() {
    const [tempo, setTempo] = useState(200);
    const [isPlaying, setIsPlaying] = useState(false);
    const [beats, setBeats] = useState(0);

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const tickSound = new Audio(host + "/audio/sound0.wav");

    useEffect(() => {
        if (isPlaying) {
            const timer = setInterval(() => {
                tick();
                setBeats((prevCount) => prevCount + 1);
            }, (60 / tempo) * 1000);
            return () => clearInterval(timer);
        }
    }, [isPlaying, tempo]);

    const tick = () => {
        tickSound.currentTime = 0;
        tickSound.play();
    };

    const toggleMetronome = () => {
        if (isPlaying) {
            setIsPlaying(false);
            setBeats(0);
        } else {
            setIsPlaying(true);
        }
    };

    return (
        <MetronomeWrapper>
            <h1>Metronome</h1>
            <Count>Tics: {beats}</Count>
            <div style={{width: 150, height: 20}}>
                <BouncingCircle tempo={tempo} style={{display: isPlaying ? "block" : "none"}}/>
            </div>
            <Controls>
                <label htmlFor="tempo">Tempo: </label>
                <input
                    type="number"
                    id="tempo"
                    value={tempo}
                    style={{marginTop: 10, textAlign: "center", fontSize: 20, width: 80}}
                    onChange={(e) => setTempo(parseInt(e.target.value, 10) || 0)}
                    disabled={isPlaying}
                />
                <Button onClick={toggleMetronome}>
                    {isPlaying ? 'Stop' : 'Start'}
                </Button>
            </Controls>
        </MetronomeWrapper>
    );
}

export default Metronome;