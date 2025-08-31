import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ExportTools = ({ selectedSensors, selectedAreas, dateRange, onExport }) => {
  const [exportFormat, setExportFormat] = useState('csv');
  const [exportOptions, setExportOptions] = useState({
    includeMetadata: true,
    includeCharts: false,
    includeStatistics: true,
    includeAnomalies: true,
    compressData: false
  });
  const [isExporting, setIsExporting] = useState(false);
  const [reportTemplate, setReportTemplate] = useState('standard');

  const exportFormats = [
    { value: 'csv', label: 'CSV (Comma Separated)', icon: 'FileText', description: 'Raw data in spreadsheet format' },
    { value: 'json', label: 'JSON (JavaScript Object)', icon: 'Code', description: 'Structured data format' },
    { value: 'pdf', label: 'PDF Report', icon: 'FileDown', description: 'Formatted report document' },
    { value: 'excel', label: 'Excel Workbook', icon: 'Sheet', description: 'Microsoft Excel format' }
  ];

  const reportTemplates = [
    { value: 'standard', label: 'Standard Report', description: 'Basic data analysis and trends' },
    { value: 'executive', label: 'Executive Summary', description: 'High-level insights and recommendations' },
    { value: 'technical', label: 'Technical Analysis', description: 'Detailed statistical analysis' },
    { value: 'compliance', label: 'Compliance Report', description: 'Regulatory compliance format' },
    { value: 'research', label: 'Research Paper', description: 'Academic research format' }
  ];

  const handleExportOptionChange = (option, value) => {
    setExportOptions(prev => ({
      ...prev,
      [option]: value
    }));
  };

  const handleExport = async () => {
    if (!dateRange || selectedSensors?.length === 0) {
      return;
    }

    setIsExporting(true);
    
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const exportData = {
        format: exportFormat,
        template: reportTemplate,
        options: exportOptions,
        filters: {
          dateRange,
          sensors: selectedSensors,
          areas: selectedAreas
        },
        timestamp: new Date()?.toISOString(),
        filename: generateFilename()
      };

      // Call parent export handler
      if (onExport) {
        onExport(exportData);
      }

      // Simulate file download
      downloadFile(exportData);
      
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const generateFilename = () => {
    const date = new Date()?.toISOString()?.split('T')?.[0];
    const sensorCount = selectedSensors?.length;
    const areaCount = selectedAreas?.length;
    
    return `coastal-data-${date}-${sensorCount}sensors-${areaCount}areas.${exportFormat}`;
  };

  const downloadFile = (exportData) => {
    // Create mock file content based on format
    let content = '';
    let mimeType = '';
    
    switch (exportFormat) {
      case 'csv':
        content = generateCSVContent();
        mimeType = 'text/csv';
        break;
      case 'json':
        content = JSON.stringify(exportData, null, 2);
        mimeType = 'application/json';
        break;
      case 'pdf': // In a real app, you'd generate actual PDF content
        content = 'PDF content would be generated here';
        mimeType = 'application/pdf';
        break;
      case 'excel':
        content = generateCSVContent(); // Simplified for demo
        mimeType = 'application/vnd.ms-excel';
        break;
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = exportData?.filename;
    document.body?.appendChild(a);
    a?.click();
    document.body?.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateCSVContent = () => {
    const headers = ['Date', 'Time', ...selectedSensors];
    const rows = [headers?.join(',')];
    
    // Generate sample data rows
    for (let i = 0; i < 10; i++) {
      const date = new Date();
      date?.setDate(date?.getDate() - i);
      const row = [
        date?.toISOString()?.split('T')?.[0],
        date?.toTimeString()?.split(' ')?.[0],
        ...selectedSensors?.map(() => (Math.random() * 100)?.toFixed(2))
      ];
      rows?.push(row?.join(','));
    }
    
    return rows?.join('\n');
  };

  const getEstimatedFileSize = () => {
    const baseSize = selectedSensors?.length * selectedAreas?.length * 100; // bytes per sensor per area
    const multiplier = exportOptions?.includeCharts ? 2 : 1;
    const size = baseSize * multiplier;
    
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024)?.toFixed(1)} KB`;
    return `${(size / (1024 * 1024))?.toFixed(1)} MB`;
  };

  const canExport = dateRange && selectedSensors?.length > 0;

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Export Data</h3>
        <Icon name="Download" size={20} className="text-muted-foreground" />
      </div>
      <div className="space-y-4">
        {/* Export Format Selection */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Export Format
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {exportFormats?.map((format) => (
              <div
                key={format?.value}
                className={`
                  flex items-start space-x-3 p-3 rounded-md border cursor-pointer transition-colors
                  ${exportFormat === format?.value
                    ? 'border-primary bg-primary/5' :'border-border hover:bg-muted/50'
                  }
                `}
                onClick={() => setExportFormat(format?.value)}
              >
                <div className={`
                  w-4 h-4 rounded border-2 flex items-center justify-center mt-0.5
                  ${exportFormat === format?.value
                    ? 'border-primary bg-primary' :'border-muted-foreground'
                  }
                `}>
                  {exportFormat === format?.value && (
                    <Icon name="Check" size={12} color="white" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <Icon name={format?.icon} size={16} className="text-muted-foreground" />
                    <span className="font-medium text-foreground text-sm">{format?.label}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{format?.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Report Template (for PDF exports) */}
        {exportFormat === 'pdf' && (
          <div>
            <Select
              label="Report Template"
              options={reportTemplates}
              value={reportTemplate}
              onChange={setReportTemplate}
              placeholder="Select report template"
            />
          </div>
        )}

        {/* Export Options */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Export Options
          </label>
          <div className="space-y-3">
            <Checkbox
              label="Include metadata and sensor information"
              checked={exportOptions?.includeMetadata}
              onChange={(e) => handleExportOptionChange('includeMetadata', e?.target?.checked)}
            />
            
            {exportFormat === 'pdf' && (
              <Checkbox
                label="Include charts and visualizations"
                checked={exportOptions?.includeCharts}
                onChange={(e) => handleExportOptionChange('includeCharts', e?.target?.checked)}
              />
            )}
            
            <Checkbox
              label="Include statistical analysis"
              checked={exportOptions?.includeStatistics}
              onChange={(e) => handleExportOptionChange('includeStatistics', e?.target?.checked)}
            />
            
            <Checkbox
              label="Include anomaly detection results"
              checked={exportOptions?.includeAnomalies}
              onChange={(e) => handleExportOptionChange('includeAnomalies', e?.target?.checked)}
            />
            
            <Checkbox
              label="Compress data (ZIP format)"
              checked={exportOptions?.compressData}
              onChange={(e) => handleExportOptionChange('compressData', e?.target?.checked)}
            />
          </div>
        </div>

        {/* Export Summary */}
        <div className="p-3 bg-muted rounded-md">
          <h4 className="text-sm font-medium text-foreground mb-2">Export Summary</h4>
          <div className="space-y-1 text-xs text-muted-foreground">
            <div className="flex justify-between">
              <span>Date Range:</span>
              <span>{dateRange?.label || 'Not selected'}</span>
            </div>
            <div className="flex justify-between">
              <span>Sensors:</span>
              <span>{selectedSensors?.length} selected</span>
            </div>
            <div className="flex justify-between">
              <span>Areas:</span>
              <span>{selectedAreas?.length} selected</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Size:</span>
              <span>{getEstimatedFileSize()}</span>
            </div>
            <div className="flex justify-between">
              <span>Filename:</span>
              <span className="truncate max-w-32">{generateFilename()}</span>
            </div>
          </div>
        </div>

        {/* Export Button */}
        <div className="flex space-x-2">
          <Button
            variant="default"
            onClick={handleExport}
            disabled={!canExport || isExporting}
            loading={isExporting}
            iconName="Download"
            iconSize={16}
            className="flex-1"
          >
            {isExporting ? 'Exporting...' : 'Export Data'}
          </Button>
          
          <Button
            variant="outline"
            onClick={() => {
              // Preview functionality
              console.log('Preview export:', { exportFormat, exportOptions });
            }}
            disabled={!canExport}
            iconName="Eye"
            iconSize={16}
          >
            Preview
          </Button>
        </div>

        {/* Export Status */}
        {!canExport && (
          <div className="flex items-center space-x-2 p-3 bg-warning/10 text-warning rounded-md">
            <Icon name="AlertTriangle" size={16} />
            <span className="text-sm">
              Please select a date range and at least one sensor to export data.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExportTools;