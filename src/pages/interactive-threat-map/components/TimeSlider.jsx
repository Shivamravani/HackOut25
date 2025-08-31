import React, { useState, useEffect } from 'react';

import Button from '../../../components/ui/Button';

const TimeSlider = ({ onTimeChange, isPlaying, onPlayPause }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [timeRange, setTimeRange] = useState('24h');
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const timeRanges = [
    { value: '1h', label: '1 Hour', steps: 60 },
    { value: '6h', label: '6 Hours', steps: 72 },
    { value: '24h', label: '24 Hours', steps: 96 },
    { value: '7d', label: '7 Days', steps: 168 },
    { value: '30d', label: '30 Days', steps: 720 }
  ];

  const playbackSpeeds = [0.5, 1, 2, 4, 8];

  const currentRange = timeRanges?.find(range => range?.value === timeRange);
  const maxSteps = currentRange ? currentRange?.steps : 96;

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const next = prev + 1;
          if (next >= maxSteps) {
            return 0;
          }
          return next;
        });
      }, 1000 / playbackSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, maxSteps]);

  useEffect(() => {
    onTimeChange(currentTime, timeRange);
  }, [currentTime, timeRange, onTimeChange]);

  const handleSliderChange = (e) => {
    const value = parseInt(e?.target?.value);
    setCurrentTime(value);
  };

  const handleTimeRangeChange = (newRange) => {
    setTimeRange(newRange);
    setCurrentTime(0);
  };

  const formatTimeLabel = (step, range) => {
    const now = new Date();
    let timeAgo;
    
    switch (range) {
      case '1h':
        timeAgo = new Date(now.getTime() - (60 - step) * 60 * 1000);
        return timeAgo?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      case '6h':
        timeAgo = new Date(now.getTime() - (72 - step) * 5 * 60 * 1000);
        return timeAgo?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      case '24h':
        timeAgo = new Date(now.getTime() - (96 - step) * 15 * 60 * 1000);
        return timeAgo?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      case '7d':
        timeAgo = new Date(now.getTime() - (168 - step) * 60 * 60 * 1000);
        return timeAgo?.toLocaleDateString([], { month: 'short', day: 'numeric' });
      case '30d':
        timeAgo = new Date(now.getTime() - (720 - step) * 60 * 60 * 1000);
        return timeAgo?.toLocaleDateString([], { month: 'short', day: 'numeric' });
      default:
        return '';
    }
  };

  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 bg-card border border-border rounded-lg shadow-lg p-4 w-96 max-w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-heading font-semibold text-foreground">Time Control</h3>
        <div className="flex items-center space-x-2">
          <span className="text-xs font-caption text-muted-foreground">Speed:</span>
          <select
            value={playbackSpeed}
            onChange={(e) => setPlaybackSpeed(parseFloat(e?.target?.value))}
            className="text-xs font-body bg-muted border border-border rounded px-2 py-1"
          >
            {playbackSpeeds?.map(speed => (
              <option key={speed} value={speed}>{speed}x</option>
            ))}
          </select>
        </div>
      </div>
      {/* Time Range Selector */}
      <div className="flex space-x-1 mb-4">
        {timeRanges?.map(range => (
          <button
            key={range?.value}
            onClick={() => handleTimeRangeChange(range?.value)}
            className={`
              px-3 py-1 text-xs font-body font-medium rounded transition-colors
              ${timeRange === range?.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }
            `}
          >
            {range?.label}
          </button>
        ))}
      </div>
      {/* Time Slider */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-caption text-muted-foreground">
            {formatTimeLabel(0, timeRange)}
          </span>
          <span className="text-xs font-caption text-foreground font-medium">
            {formatTimeLabel(currentTime, timeRange)}
          </span>
          <span className="text-xs font-caption text-muted-foreground">
            Now
          </span>
        </div>
        <div className="relative">
          <input
            type="range"
            min="0"
            max={maxSteps - 1}
            value={currentTime}
            onChange={handleSliderChange}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
          />
          <div 
            className="absolute top-1 left-0 h-1 bg-primary rounded-lg pointer-events-none"
            style={{ width: `${(currentTime / (maxSteps - 1)) * 100}%` }}
          />
        </div>
      </div>
      {/* Playback Controls */}
      <div className="flex items-center justify-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentTime(0)}
          iconName="SkipBack"
          iconSize={16}
        >
          <span className="sr-only">Reset to start</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentTime(Math.max(0, currentTime - 1))}
          iconName="ChevronLeft"
          iconSize={16}
        >
          <span className="sr-only">Previous step</span>
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={onPlayPause}
          iconName={isPlaying ? "Pause" : "Play"}
          iconSize={16}
        >
          <span className="sr-only">{isPlaying ? 'Pause' : 'Play'}</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentTime(Math.min(maxSteps - 1, currentTime + 1))}
          iconName="ChevronRight"
          iconSize={16}
        >
          <span className="sr-only">Next step</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentTime(maxSteps - 1)}
          iconName="SkipForward"
          iconSize={16}
        >
          <span className="sr-only">Jump to end</span>
        </Button>
      </div>
      {/* Progress Indicator */}
      <div className="mt-3 text-center">
        <span className="text-xs font-caption text-muted-foreground">
          Step {currentTime + 1} of {maxSteps} • {Math.round((currentTime / (maxSteps - 1)) * 100)}% complete
        </span>
      </div>
    </div>
  );
};

export default TimeSlider;