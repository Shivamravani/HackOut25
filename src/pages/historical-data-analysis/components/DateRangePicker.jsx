import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const DateRangePicker = ({ onDateRangeChange, selectedRange }) => {
  const [isCustomRange, setIsCustomRange] = useState(false);
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');

  const predefinedRanges = [
    { label: 'Last 7 Days', value: '7d', days: 7 },
    { label: 'Last 30 Days', value: '30d', days: 30 },
    { label: 'Last 3 Months', value: '3m', days: 90 },
    { label: 'Last 6 Months', value: '6m', days: 180 },
    { label: 'Last Year', value: '1y', days: 365 },
    { label: 'Custom Range', value: 'custom', days: null }
  ];

  const handleRangeSelect = (range) => {
    if (range?.value === 'custom') {
      setIsCustomRange(true);
      return;
    }
    
    setIsCustomRange(false);
    const endDate = new Date();
    const startDate = new Date();
    startDate?.setDate(endDate?.getDate() - range?.days);
    
    onDateRangeChange({
      startDate: startDate?.toISOString()?.split('T')?.[0],
      endDate: endDate?.toISOString()?.split('T')?.[0],
      label: range?.label
    });
  };

  const handleCustomRangeApply = () => {
    if (customStartDate && customEndDate) {
      onDateRangeChange({
        startDate: customStartDate,
        endDate: customEndDate,
        label: `${customStartDate} to ${customEndDate}`
      });
      setIsCustomRange(false);
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Date Range</h3>
        <Icon name="Calendar" size={20} className="text-muted-foreground" />
      </div>
      {!isCustomRange ? (
        <div className="space-y-2">
          {predefinedRanges?.map((range) => (
            <Button
              key={range?.value}
              variant={selectedRange?.label === range?.label ? "default" : "ghost"}
              onClick={() => handleRangeSelect(range)}
              className="w-full justify-start"
            >
              <Icon 
                name={range?.value === 'custom' ? 'Settings' : 'Clock'} 
                size={16} 
                className="mr-2" 
              />
              {range?.label}
            </Button>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <Input
            type="date"
            label="Start Date"
            value={customStartDate}
            onChange={(e) => setCustomStartDate(e?.target?.value)}
            max={new Date()?.toISOString()?.split('T')?.[0]}
          />
          <Input
            type="date"
            label="End Date"
            value={customEndDate}
            onChange={(e) => setCustomEndDate(e?.target?.value)}
            min={customStartDate}
            max={new Date()?.toISOString()?.split('T')?.[0]}
          />
          <div className="flex space-x-2">
            <Button
              variant="default"
              onClick={handleCustomRangeApply}
              disabled={!customStartDate || !customEndDate}
              className="flex-1"
            >
              Apply Range
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsCustomRange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
      {selectedRange && (
        <div className="mt-4 p-3 bg-muted rounded-md">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Selected Range:</span>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => onDateRangeChange(null)}
              iconName="X"
              iconSize={14}
            >
              Clear
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{selectedRange?.label}</p>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;