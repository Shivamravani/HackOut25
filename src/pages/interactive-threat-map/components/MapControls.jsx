import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const MapControls = ({ onZoomIn, onZoomOut, onResetView, onToggleFullscreen, onLocationSearch, isFullscreen }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const handleLocationSearch = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      onLocationSearch(searchQuery);
      setSearchQuery('');
      setIsSearchExpanded(false);
    }
  };

  const handleMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation?.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position?.coords;
          onLocationSearch(`${latitude},${longitude}`);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  return (
    <div className="absolute top-4 left-4 z-20 flex flex-col space-y-2">
      {/* Search Control */}
      <div className="bg-card border border-border rounded-lg shadow-lg overflow-hidden">
        {isSearchExpanded ? (
          <form onSubmit={handleLocationSearch} className="flex">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              placeholder="Search location..."
              className="px-3 py-2 w-64 text-sm font-body border-none outline-none bg-transparent"
              autoFocus
            />
            <button
              type="submit"
              className="px-3 py-2 text-primary hover:bg-primary/10 transition-colors"
            >
              <Icon name="Search" size={18} />
            </button>
            <button
              type="button"
              onClick={() => {
                setIsSearchExpanded(false);
                setSearchQuery('');
              }}
              className="px-3 py-2 text-muted-foreground hover:bg-muted/50 transition-colors"
            >
              <Icon name="X" size={18} />
            </button>
          </form>
        ) : (
          <button
            onClick={() => setIsSearchExpanded(true)}
            className="p-3 hover:bg-muted/50 transition-colors"
            title="Search location"
          >
            <Icon name="Search" size={20} className="text-foreground" />
          </button>
        )}
      </div>
      {/* Zoom Controls */}
      <div className="bg-card border border-border rounded-lg shadow-lg">
        <button
          onClick={onZoomIn}
          className="block w-full p-3 hover:bg-muted/50 transition-colors border-b border-border"
          title="Zoom in"
        >
          <Icon name="Plus" size={20} className="text-foreground" />
        </button>
        <button
          onClick={onZoomOut}
          className="block w-full p-3 hover:bg-muted/50 transition-colors"
          title="Zoom out"
        >
          <Icon name="Minus" size={20} className="text-foreground" />
        </button>
      </div>
      {/* Location & View Controls */}
      <div className="bg-card border border-border rounded-lg shadow-lg">
        <button
          onClick={handleMyLocation}
          className="block w-full p-3 hover:bg-muted/50 transition-colors border-b border-border"
          title="My location"
        >
          <Icon name="MapPin" size={20} className="text-foreground" />
        </button>
        <button
          onClick={onResetView}
          className="block w-full p-3 hover:bg-muted/50 transition-colors border-b border-border"
          title="Reset view"
        >
          <Icon name="RotateCcw" size={20} className="text-foreground" />
        </button>
        <button
          onClick={onToggleFullscreen}
          className="block w-full p-3 hover:bg-muted/50 transition-colors"
          title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          <Icon name={isFullscreen ? "Minimize2" : "Maximize2"} size={20} className="text-foreground" />
        </button>
      </div>
      {/* Drawing Tools */}
      <div className="bg-card border border-border rounded-lg shadow-lg">
        <button
          className="block w-full p-3 hover:bg-muted/50 transition-colors border-b border-border"
          title="Draw polygon"
        >
          <Icon name="Pentagon" size={20} className="text-foreground" />
        </button>
        <button
          className="block w-full p-3 hover:bg-muted/50 transition-colors border-b border-border"
          title="Draw circle"
        >
          <Icon name="Circle" size={20} className="text-foreground" />
        </button>
        <button
          className="block w-full p-3 hover:bg-muted/50 transition-colors"
          title="Measure distance"
        >
          <Icon name="Ruler" size={20} className="text-foreground" />
        </button>
      </div>
    </div>
  );
};

export default MapControls;