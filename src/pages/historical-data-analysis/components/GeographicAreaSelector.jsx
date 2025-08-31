import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const GeographicAreaSelector = ({ onAreaChange, selectedAreas }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const coastalRegions = [
    {
      region: 'Atlantic Coast',
      icon: 'MapPin',
      areas: [
        { id: 'maine_coast', name: 'Maine Coast', coordinates: '44.3106, -68.2073', stations: 12 },
        { id: 'cape_cod', name: 'Cape Cod Bay', coordinates: '41.7003, -70.2962', stations: 8 },
        { id: 'chesapeake_bay', name: 'Chesapeake Bay', coordinates: '38.9784, -76.4951', stations: 15 },
        { id: 'outer_banks', name: 'Outer Banks', coordinates: '35.2859, -75.4129', stations: 6 },
        { id: 'florida_keys', name: 'Florida Keys', coordinates: '24.6762, -81.2056', stations: 10 }
      ]
    },
    {
      region: 'Pacific Coast',
      icon: 'Mountain',
      areas: [
        { id: 'puget_sound', name: 'Puget Sound', coordinates: '47.6062, -122.3321', stations: 18 },
        { id: 'san_francisco_bay', name: 'San Francisco Bay', coordinates: '37.7749, -122.4194', stations: 22 },
        { id: 'monterey_bay', name: 'Monterey Bay', coordinates: '36.6002, -121.8947', stations: 9 },
        { id: 'channel_islands', name: 'Channel Islands', coordinates: '34.0059, -119.4179', stations: 7 },
        { id: 'san_diego_bay', name: 'San Diego Bay', coordinates: '32.7157, -117.1611', stations: 11 }
      ]
    },
    {
      region: 'Gulf Coast',
      icon: 'Waves',
      areas: [
        { id: 'galveston_bay', name: 'Galveston Bay', coordinates: '29.3013, -94.7977', stations: 14 },
        { id: 'mobile_bay', name: 'Mobile Bay', coordinates: '30.6954, -88.0399', stations: 8 },
        { id: 'tampa_bay', name: 'Tampa Bay', coordinates: '27.9506, -82.4572', stations: 13 },
        { id: 'mississippi_delta', name: 'Mississippi Delta', coordinates: '29.2520, -89.4012', stations: 16 }
      ]
    },
    {
      region: 'Great Lakes',
      icon: 'Lake',
      areas: [
        { id: 'lake_superior', name: 'Lake Superior', coordinates: '47.7511, -87.9896', stations: 20 },
        { id: 'lake_michigan', name: 'Lake Michigan', coordinates: '43.3255, -87.2611', stations: 25 },
        { id: 'lake_huron', name: 'Lake Huron', coordinates: '44.7631, -82.4103', stations: 18 },
        { id: 'lake_erie', name: 'Lake Erie', coordinates: '42.2619, -81.2456', stations: 22 },
        { id: 'lake_ontario', name: 'Lake Ontario', coordinates: '43.7001, -77.4389', stations: 15 }
      ]
    }
  ];

  const filteredRegions = coastalRegions?.map(region => ({
    ...region,
    areas: region?.areas?.filter(area =>
      area?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    )
  }))?.filter(region => region?.areas?.length > 0);

  const handleAreaToggle = (areaId) => {
    const updatedAreas = selectedAreas?.includes(areaId)
      ? selectedAreas?.filter(id => id !== areaId)
      : [...selectedAreas, areaId];
    
    onAreaChange(updatedAreas);
  };

  const handleRegionToggle = (region) => {
    const regionIds = region?.areas?.map(area => area?.id);
    const allSelected = regionIds?.every(id => selectedAreas?.includes(id));
    
    if (allSelected) {
      const updatedAreas = selectedAreas?.filter(id => !regionIds?.includes(id));
      onAreaChange(updatedAreas);
    } else {
      const updatedAreas = [...new Set([...selectedAreas, ...regionIds])];
      onAreaChange(updatedAreas);
    }
  };

  const clearAllSelections = () => {
    onAreaChange([]);
  };

  const selectAllAreas = () => {
    const allAreaIds = coastalRegions?.flatMap(region => region?.areas?.map(area => area?.id));
    onAreaChange(allAreaIds);
  };

  const getTotalStations = (areaIds) => {
    return coastalRegions?.flatMap(region => region?.areas)?.filter(area => areaIds?.includes(area?.id))?.reduce((total, area) => total + area?.stations, 0);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Geographic Areas</h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="xs"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
            iconSize={16}
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </Button>
        </div>
      </div>
      {isExpanded && (
        <>
          <div className="mb-4">
            <div className="relative">
              <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search areas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e?.target?.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex space-x-2 mb-4">
            <Button
              variant="outline"
              size="xs"
              onClick={selectAllAreas}
              iconName="CheckSquare"
              iconSize={14}
            >
              Select All
            </Button>
            <Button
              variant="outline"
              size="xs"
              onClick={clearAllSelections}
              iconName="Square"
              iconSize={14}
            >
              Clear All
            </Button>
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {filteredRegions?.map((region) => {
              const regionIds = region?.areas?.map(area => area?.id);
              const selectedInRegion = regionIds?.filter(id => selectedAreas?.includes(id))?.length;
              const allSelected = selectedInRegion === regionIds?.length;
              const someSelected = selectedInRegion > 0 && selectedInRegion < regionIds?.length;

              return (
                <div key={region?.region} className="border border-border rounded-md p-3">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Icon name={region?.icon} size={18} className="text-muted-foreground" />
                      <h4 className="font-medium text-foreground">{region?.region}</h4>
                      <span className="text-xs text-muted-foreground">
                        ({selectedInRegion}/{regionIds?.length})
                      </span>
                    </div>
                    <Checkbox
                      checked={allSelected}
                      indeterminate={someSelected}
                      onChange={() => handleRegionToggle(region)}
                      label=""
                    />
                  </div>
                  <div className="space-y-2">
                    {region?.areas?.map((area) => (
                      <div key={area?.id} className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            checked={selectedAreas?.includes(area?.id)}
                            onChange={() => handleAreaToggle(area?.id)}
                            label=""
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-foreground">
                                {area?.name}
                              </span>
                              <span className="inline-flex items-center px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full">
                                {area?.stations} stations
                              </span>
                            </div>
                            <div className="flex items-center space-x-1 mt-1">
                              <Icon name="MapPin" size={12} className="text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">{area?.coordinates}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {searchTerm && filteredRegions?.length === 0 && (
            <div className="text-center py-8">
              <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-2" />
              <p className="text-muted-foreground">No areas found matching "{searchTerm}"</p>
            </div>
          )}
        </>
      )}
      {selectedAreas?.length > 0 && (
        <div className="mt-4 p-3 bg-muted rounded-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">
              Selected Areas: {selectedAreas?.length}
            </span>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-muted-foreground">
                {getTotalStations(selectedAreas)} stations
              </span>
              <Button
                variant="ghost"
                size="xs"
                onClick={clearAllSelections}
                iconName="X"
                iconSize={14}
              >
                Clear
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap gap-1">
            {selectedAreas?.slice(0, 4)?.map((areaId) => {
              const area = coastalRegions?.flatMap(region => region?.areas)?.find(a => a?.id === areaId);
              return (
                <span
                  key={areaId}
                  className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                >
                  {area?.name}
                </span>
              );
            })}
            {selectedAreas?.length > 4 && (
              <span className="text-xs text-muted-foreground">
                +{selectedAreas?.length - 4} more
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GeographicAreaSelector;