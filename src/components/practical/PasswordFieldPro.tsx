import React, { useState, useMemo } from 'react';
import { Eye, EyeOff, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface PasswordFieldProProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  showStrengthMeter?: boolean;
  showSuggestions?: boolean;
}

export const PasswordFieldPro: React.FC<PasswordFieldProProps> = ({
  value,
  onChange,
  placeholder = "Enter your password",
  showStrengthMeter = true,
  showSuggestions = true
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);

  const analysis = useMemo(() => {
    const checks = {
      length: value.length >= 8,
      uppercase: /[A-Z]/.test(value),
      lowercase: /[a-z]/.test(value),
      numbers: /\d/.test(value),
      symbols: /[^A-Za-z0-9]/.test(value)
    };

    const score = Object.values(checks).filter(Boolean).length;
    const strength = score <= 1 ? 'weak' : score <= 3 ? 'medium' : score <= 4 ? 'strong' : 'very-strong';

    return { checks, score, strength };
  }, [value]);

  const suggestions = useMemo(() => {
    if (!showSuggestions || !focused) return [];
    
    const tips = [];
    if (!analysis.checks.length) tips.push("Use at least 8 characters");
    if (!analysis.checks.uppercase) tips.push("Add uppercase letters");
    if (!analysis.checks.lowercase) tips.push("Add lowercase letters");
    if (!analysis.checks.numbers) tips.push("Add numbers");
    if (!analysis.checks.symbols) tips.push("Add special characters");
    
    return tips.slice(0, 2);
  }, [analysis, focused, showSuggestions]);

  const strengthColors = {
    weak: 'bg-red-500',
    medium: 'bg-yellow-500',
    strong: 'bg-blue-500',
    'very-strong': 'bg-green-500'
  };

  const strengthLabels = {
    weak: 'Weak',
    medium: 'Medium',
    strong: 'Strong',
    'very-strong': 'Very Strong'
  };

  return (
    <div className="w-full max-w-md">
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
        />
        
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>

      {showStrengthMeter && value && (
        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Password strength</span>
            <span className={`text-sm font-medium ${
              analysis.strength === 'weak' ? 'text-red-600' :
              analysis.strength === 'medium' ? 'text-yellow-600' :
              analysis.strength === 'strong' ? 'text-blue-600' : 'text-green-600'
            }`}>
              {strengthLabels[analysis.strength]}
            </span>
          </div>
          
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded-full transition-colors duration-300 ${
                  i < analysis.score ? strengthColors[analysis.strength] : 'bg-gray-200'
                }`}
              />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {Object.entries({
              '8+ chars': analysis.checks.length,
              'Uppercase': analysis.checks.uppercase,
              'Lowercase': analysis.checks.lowercase,
              'Numbers': analysis.checks.numbers,
              'Symbols': analysis.checks.symbols
            }).slice(0, 4).map(([label, passed]) => (
              <div key={label} className="flex items-center space-x-1">
                {passed ? 
                  <CheckCircle className="w-3 h-3 text-green-500" /> :
                  <XCircle className="w-3 h-3 text-gray-400" />
                }
                <span className={passed ? 'text-green-600' : 'text-gray-500'}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {suggestions.length > 0 && (
        <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Suggestions:</p>
              <ul className="space-y-1">
                {suggestions.map((tip, index) => (
                  <li key={index}>• {tip}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};