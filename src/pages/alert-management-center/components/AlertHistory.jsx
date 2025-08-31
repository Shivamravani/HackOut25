import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertHistory = ({ isOpen, onClose, alertHistory }) => {
  const [selectedEntry, setSelectedEntry] = useState(null);

  const actionIcons = {
    created: 'Plus',
    modified: 'Edit',
    escalated: 'TrendingUp',
    cancelled: 'X',
    resolved: 'Check',
    sent: 'Send',
    delivered: 'CheckCheck',
    acknowledged: 'Eye'
  };

  const actionColors = {
    created: 'text-success',
    modified: 'text-warning',
    escalated: 'text-error',
    cancelled: 'text-muted-foreground',
    resolved: 'text-success',
    sent: 'text-primary',
    delivered: 'text-secondary',
    acknowledged: 'text-accent'
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-secondary rounded-lg">
              <Icon name="History" size={20} color="white" />
            </div>
            <div>
              <h2 className="text-lg font-heading font-semibold text-foreground">
                Alert History & Audit Trail
              </h2>
              <p className="text-sm text-muted-foreground font-caption">
                Complete log of alert activities and system responses
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            iconName="X"
            onClick={onClose}
          />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex">
          {/* History List */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-4">
              {alertHistory?.map((entry) => (
                <div
                  key={entry?.id}
                  className={`
                    flex items-start space-x-4 p-4 border rounded-lg cursor-pointer transition-all duration-200
                    ${selectedEntry?.id === entry?.id 
                      ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/30'
                    }
                  `}
                  onClick={() => setSelectedEntry(entry)}
                >
                  <div className={`
                    flex items-center justify-center w-10 h-10 rounded-lg
                    ${selectedEntry?.id === entry?.id ? 'bg-primary/10' : 'bg-muted'}
                  `}>
                    <Icon 
                      name={actionIcons?.[entry?.action] || 'Activity'} 
                      size={18} 
                      className={selectedEntry?.id === entry?.id ? 'text-primary' : actionColors?.[entry?.action]}
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-body font-semibold text-foreground">
                        {entry?.alertTitle}
                      </h4>
                      <span className="text-xs text-muted-foreground font-caption">
                        {entry?.timestamp}
                      </span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
                      {entry?.description}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Icon name="User" size={12} />
                        <span className="font-caption">{entry?.user}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Tag" size={12} />
                        <span className="font-caption capitalize">{entry?.action}</span>
                      </div>
                      {entry?.affectedUsers && (
                        <div className="flex items-center space-x-1">
                          <Icon name="Users" size={12} />
                          <span className="font-caption">{entry?.affectedUsers} users</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detail Panel */}
          {selectedEntry && (
            <div className="w-80 border-l border-border bg-muted/30 p-6 overflow-y-auto">
              <div className="space-y-6">
                {/* Entry Header */}
                <div>
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`
                      flex items-center justify-center w-12 h-12 rounded-lg
                      ${actionColors?.[selectedEntry?.action]?.replace('text-', 'bg-')}/10
                    `}>
                      <Icon 
                        name={actionIcons?.[selectedEntry?.action] || 'Activity'} 
                        size={20} 
                        className={actionColors?.[selectedEntry?.action]}
                      />
                    </div>
                    <div>
                      <h3 className="text-base font-heading font-semibold text-foreground">
                        {selectedEntry?.alertTitle}
                      </h3>
                      <p className="text-sm text-muted-foreground font-caption capitalize">
                        {selectedEntry?.action} Action
                      </p>
                    </div>
                  </div>
                </div>

                {/* Entry Details */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-caption font-medium text-foreground mb-2">
                      Description
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedEntry?.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-caption font-medium text-foreground mb-1">
                        User
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {selectedEntry?.user}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-caption font-medium text-foreground mb-1">
                        Timestamp
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {selectedEntry?.timestamp}
                      </p>
                    </div>
                  </div>

                  {selectedEntry?.affectedUsers && (
                    <div>
                      <h4 className="text-sm font-caption font-medium text-foreground mb-1">
                        Affected Users
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {selectedEntry?.affectedUsers?.toLocaleString()} recipients
                      </p>
                    </div>
                  )}

                  {selectedEntry?.changes && (
                    <div>
                      <h4 className="text-sm font-caption font-medium text-foreground mb-2">
                        Changes Made
                      </h4>
                      <div className="space-y-2">
                        {selectedEntry?.changes?.map((change, index) => (
                          <div key={index} className="text-sm">
                            <span className="text-muted-foreground">{change?.field}:</span>
                            <div className="ml-2">
                              <span className="text-error line-through">{change?.from}</span>
                              <span className="text-muted-foreground mx-2">→</span>
                              <span className="text-success">{change?.to}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedEntry?.deliveryStats && (
                    <div>
                      <h4 className="text-sm font-caption font-medium text-foreground mb-2">
                        Delivery Statistics
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">SMS Sent:</span>
                          <span className="text-foreground font-medium">
                            {selectedEntry?.deliveryStats?.sms?.sent}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Push Sent:</span>
                          <span className="text-foreground font-medium">
                            {selectedEntry?.deliveryStats?.push?.sent}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Email Sent:</span>
                          <span className="text-foreground font-medium">
                            {selectedEntry?.deliveryStats?.email?.sent}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertHistory;