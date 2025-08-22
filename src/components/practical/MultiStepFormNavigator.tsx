import React, { useState } from 'react';
import { Check, ChevronRight, AlertCircle } from 'lucide-react';

interface Step {
  id: string;
  title: string;
  description: string;
  required: boolean;
  completed: boolean;
  hasError?: boolean;
  substeps?: Step[];
}

interface MultiStepFormNavigatorProps {
  steps: Step[];
  currentStepId: string;
  onStepChange: (stepId: string) => void;
  allowSkip?: boolean;
}

export const MultiStepFormNavigator: React.FC<MultiStepFormNavigatorProps> = ({
  steps,
  currentStepId,
  onStepChange,
  allowSkip = false
}) => {
  const [expandedSteps, setExpandedSteps] = useState<Set<string>>(new Set());

  const currentStepIndex = steps.findIndex(step => step.id === currentStepId);
  const completedSteps = steps.filter(step => step.completed).length;
  const totalSteps = steps.length;
  const progress = (completedSteps / totalSteps) * 100;

  const toggleExpanded = (stepId: string) => {
    const newExpanded = new Set(expandedSteps);
    if (newExpanded.has(stepId)) {
      newExpanded.delete(stepId);
    } else {
      newExpanded.add(stepId);
    }
    setExpandedSteps(newExpanded);
  };

  const canNavigateToStep = (stepIndex: number) => {
    if (allowSkip) return true;
    
    // Can navigate to current step or any completed step
    if (stepIndex <= currentStepIndex) return true;
    
    // Can navigate to next step if current is completed
    if (stepIndex === currentStepIndex + 1 && steps[currentStepIndex]?.completed) return true;
    
    return false;
  };

  const getStepStatus = (step: Step, index: number) => {
    if (step.hasError) return 'error';
    if (step.completed) return 'completed';
    if (step.id === currentStepId) return 'current';
    if (canNavigateToStep(index)) return 'available';
    return 'disabled';
  };

  const getStepStyles = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500 text-white border-green-500';
      case 'current':
        return 'bg-indigo-500 text-white border-indigo-500 ring-4 ring-indigo-100';
      case 'error':
        return 'bg-red-500 text-white border-red-500';
      case 'available':
        return 'bg-white text-gray-700 border-gray-300 hover:border-indigo-300';
      default:
        return 'bg-gray-100 text-gray-400 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      {/* Progress Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Form Progress</h3>
          <span className="text-sm text-gray-600">
            {completedSteps} of {totalSteps} completed
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-indigo-500 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Steps List */}
      <div className="p-6">
        <div className="space-y-4">
          {steps.map((step, index) => {
            const status = getStepStatus(step, index);
            const isExpanded = expandedSteps.has(step.id);
            const hasSubsteps = step.substeps && step.substeps.length > 0;

            return (
              <div key={step.id} className="relative">
                <div
                  className={`
                    flex items-center p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer
                    ${getStepStyles(status)}
                    ${status === 'disabled' ? 'cursor-not-allowed' : 'hover:shadow-md'}
                  `}
                  onClick={() => {
                    if (canNavigateToStep(index)) {
                      onStepChange(step.id);
                    }
                    if (hasSubsteps) {
                      toggleExpanded(step.id);
                    }
                  }}
                >
                  {/* Step Number/Icon */}
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-4">
                    {status === 'completed' ? (
                      <Check className="w-5 h-5" />
                    ) : status === 'error' ? (
                      <AlertCircle className="w-5 h-5" />
                    ) : (
                      <span className="text-sm font-medium">{index + 1}</span>
                    )}
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium truncate">
                        {step.title}
                        {step.required && <span className="text-red-500 ml-1">*</span>}
                      </h4>
                      {hasSubsteps && (
                        <ChevronRight 
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isExpanded ? 'rotate-90' : ''
                          }`} 
                        />
                      )}
                    </div>
                    <p className="text-xs opacity-75 mt-1">{step.description}</p>
                  </div>

                  {/* Connection Line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-8 top-full w-0.5 h-4 bg-gray-300 transform -translate-x-1/2" />
                  )}
                </div>

                {/* Substeps */}
                {hasSubsteps && isExpanded && (
                  <div className="ml-12 mt-2 space-y-2">
                    {step.substeps!.map((substep, subIndex) => {
                      const subStatus = getStepStatus(substep, index);
                      
                      return (
                        <div
                          key={substep.id}
                          className={`
                            flex items-center p-3 rounded-md border transition-all duration-200 cursor-pointer
                            ${getStepStyles(subStatus)}
                          `}
                          onClick={() => onStepChange(substep.id)}
                        >
                          <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-3 text-xs">
                            {subStatus === 'completed' ? (
                              <Check className="w-3 h-3" />
                            ) : (
                              <span>{subIndex + 1}</span>
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h5 className="text-xs font-medium truncate">{substep.title}</h5>
                            <p className="text-xs opacity-75">{substep.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};