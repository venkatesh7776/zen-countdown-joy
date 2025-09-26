import React, { useState } from 'react';
import CountdownInput from './CountdownInput';
import CountdownDisplay from './CountdownDisplay';

type AppState = 'input' | 'countdown' | 'preview';

const CountdownApp: React.FC = () => {
  const [state, setState] = useState<AppState>('input');
  const [countdownTime, setCountdownTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const handleStartCountdown = (hours: number, minutes: number, seconds: number) => {
    setCountdownTime({ hours, minutes, seconds });
    setState('countdown');
  };

  const handlePreview = (hours: number, minutes: number, seconds: number) => {
    setCountdownTime({ hours, minutes, seconds });
    setState('preview');
  };

  const handleReset = () => {
    setState('input');
  };

  const handleBackToInput = () => {
    setState('input');
  };

  return (
    <div className="min-h-screen">
      {state === 'input' && (
        <CountdownInput 
          onStartCountdown={handleStartCountdown}
          onPreview={handlePreview}
        />
      )}
      
      {state === 'countdown' && (
        <CountdownDisplay
          initialHours={countdownTime.hours}
          initialMinutes={countdownTime.minutes}
          initialSeconds={countdownTime.seconds}
          onReset={handleReset}
        />
      )}
      
      {state === 'preview' && (
        <CountdownDisplay
          initialHours={countdownTime.hours}
          initialMinutes={countdownTime.minutes}
          initialSeconds={countdownTime.seconds}
          onReset={handleReset}
          isPreview={true}
          onBackToInput={handleBackToInput}
        />
      )}
    </div>
  );
};

export default CountdownApp;