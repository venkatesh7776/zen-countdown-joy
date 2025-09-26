import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Clock, Play, Eye } from 'lucide-react';

interface CountdownInputProps {
  onStartCountdown: (hours: number, minutes: number, seconds: number) => void;
  onPreview: (hours: number, minutes: number, seconds: number) => void;
}

const CountdownInput: React.FC<CountdownInputProps> = ({ onStartCountdown, onPreview }) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);

  const handleStart = () => {
    if (hours + minutes + seconds > 0) {
      onStartCountdown(hours, minutes, seconds);
    }
  };

  const handlePreview = () => {
    if (hours + minutes + seconds > 0) {
      onPreview(hours, minutes, seconds);
    }
  };

  const TimeInput = ({ 
    value, 
    onChange, 
    max, 
    label 
  }: { 
    value: number; 
    onChange: (value: number) => void; 
    max: number; 
    label: string;
  }) => (
    <div className="flex flex-col items-center space-y-2">
      <label className="text-sm font-medium text-muted-foreground font-display">
        {label}
      </label>
      <div className="relative">
        <input
          type="number"
          min="0"
          max={max}
          value={value}
          onChange={(e) => onChange(Math.max(0, Math.min(max, parseInt(e.target.value) || 0)))}
          className="w-20 h-16 text-2xl font-bold text-center border-2 border-border rounded-xl bg-card shadow-soft focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 font-display"
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="w-full max-w-md bg-gradient-card border-0 shadow-timer p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-button rounded-full mb-4 shadow-soft">
            <Clock className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2 font-display">
            Set Your Timer
          </h1>
          <p className="text-muted-foreground font-medium">
            Choose your perfect countdown duration
          </p>
        </div>

        <div className="space-y-8">
          <div className="flex justify-center items-center space-x-6">
            <TimeInput
              value={hours}
              onChange={setHours}
              max={23}
              label="Hours"
            />
            <div className="text-2xl font-bold text-muted-foreground">:</div>
            <TimeInput
              value={minutes}
              onChange={setMinutes}
              max={59}
              label="Minutes"
            />
            <div className="text-2xl font-bold text-muted-foreground">:</div>
            <TimeInput
              value={seconds}
              onChange={setSeconds}
              max={59}
              label="Seconds"
            />
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleStart}
              disabled={hours + minutes + seconds === 0}
              variant="primary"
              size="lg"
              className="w-full h-14 text-lg font-semibold font-display"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Countdown
            </Button>
            
            <Button
              onClick={handlePreview}
              disabled={hours + minutes + seconds === 0}
              variant="secondary"
              size="lg"
              className="w-full h-12 font-medium font-display"
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CountdownInput;