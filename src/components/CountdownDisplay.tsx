import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw, Settings, Eye } from 'lucide-react';

interface CountdownDisplayProps {
  initialHours: number;
  initialMinutes: number;
  initialSeconds: number;
  onReset: () => void;
  isPreview?: boolean;
  onBackToInput?: () => void;
}

const CountdownDisplay: React.FC<CountdownDisplayProps> = ({
  initialHours,
  initialMinutes,
  initialSeconds,
  onReset,
  isPreview = false,
  onBackToInput
}) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: initialHours,
    minutes: initialMinutes,
    seconds: initialSeconds,
  });
  const [isActive, setIsActive] = useState(!isPreview);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && !isCompleted) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          const totalSeconds = prevTime.hours * 3600 + prevTime.minutes * 60 + prevTime.seconds;
          
          if (totalSeconds <= 1) {
            setIsCompleted(true);
            setIsActive(false);
            return { hours: 0, minutes: 0, seconds: 0 };
          }

          const newTotalSeconds = totalSeconds - 1;
          return {
            hours: Math.floor(newTotalSeconds / 3600),
            minutes: Math.floor((newTotalSeconds % 3600) / 60),
            seconds: newTotalSeconds % 60,
          };
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isCompleted]);

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  const TimeDigit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="
          countdown-number 
          bg-primary 
          text-primary-foreground 
          rounded-2xl 
          shadow-timer 
          flex 
          items-center 
          justify-center 
          font-display 
          font-bold
          w-24 h-24 text-4xl
          md:w-32 md:h-32 md:text-6xl
          lg:w-40 lg:h-40 lg:text-7xl
        ">
          {formatNumber(value)}
        </div>
      </div>
      <span className="text-muted-foreground font-medium mt-3 text-sm md:text-base lg:text-lg font-display">
        {label}
      </span>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-timer-glow/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 text-center">
        {isPreview && (
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-accent/20 rounded-full border border-accent/30">
              <Eye className="w-4 h-4 mr-2 text-accent-foreground" />
              <span className="text-sm font-medium text-accent-foreground font-display">
                Preview Mode
              </span>
            </div>
          </div>
        )}

        {isCompleted && !isPreview && (
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-timer-primary mb-2 font-display">
              Time's Up! 🎉
            </h2>
            <p className="text-muted-foreground text-lg font-display">
              Your countdown has finished
            </p>
          </div>
        )}

        <div className="flex items-center justify-center space-x-4 md:space-x-8 mb-12">
          <TimeDigit value={timeLeft.hours} label="Hours" />
          <div className="text-timer-primary text-4xl md:text-6xl font-bold font-display self-start mt-3 md:mt-6">
            :
          </div>
          <TimeDigit value={timeLeft.minutes} label="Minutes" />
          <div className="text-timer-primary text-4xl md:text-6xl font-bold font-display self-start mt-3 md:mt-6">
            :
          </div>
          <TimeDigit value={timeLeft.seconds} label="Seconds" />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          {isPreview ? (
            <Button
              onClick={onBackToInput}
              variant="primary"
              size="lg"
              className="font-medium font-display"
            >
              <Settings className="w-4 h-4 mr-2" />
              Back to Setup
            </Button>
          ) : (
            <>
              <Button
                onClick={onReset}
                variant="secondary"
                size="lg"
                className="font-medium font-display"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset Timer
              </Button>
              
              {!isActive && !isCompleted && (
                <Button
                  onClick={() => setIsActive(true)}
                  variant="primary"
                  size="lg"
                  className="font-medium font-display"
                >
                  Resume
                </Button>
              )}
              
              {isActive && !isCompleted && (
                <Button
                  onClick={() => setIsActive(false)}
                  variant="outline"
                  size="lg"
                  className="font-medium font-display"
                >
                  Pause
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountdownDisplay;