'use client';

import { validatePassword, PasswordValidation } from '../lib/passwordValidation';
import { motion, AnimatePresence } from 'framer-motion';

interface PasswordStrengthIndicatorProps {
  password: string;
  className?: string;
}

export default function PasswordStrengthIndicator({
  password,
  className = '',
}: PasswordStrengthIndicatorProps) {
  // Don't show anything if password is empty
  if (!password) {
    return null;
  }

  const validation: PasswordValidation = validatePassword(password);
  const { strength, checks, feedback } = validation;

  // Strength bar colors
  const strengthColors = {
    weak: 'from-red-500 to-red-600',
    medium: 'from-yellow-500 to-orange-500',
    strong: 'from-gradient-secondary-from to-gradient-secondary-to',
  };

  // Strength bar width
  const strengthWidth = {
    weak: '33%',
    medium: '66%',
    strong: '100%',
  };

  // Strength text colors
  const strengthTextColors = {
    weak: 'text-red-400',
    medium: 'text-yellow-400',
    strong: 'text-gradient-secondary-from',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={className}
    >
      {/* Strength bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-luxury-gray-400">
            Password Strength
          </span>
          <span className={`text-xs font-semibold ${strengthTextColors[strength]} capitalize`}>
            {strength}
          </span>
        </div>
        
        <div className="h-1.5 bg-dark-surface-elevated rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: strengthWidth[strength] }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`h-full bg-gradient-to-r ${strengthColors[strength]} rounded-full`}
          />
        </div>
      </div>

      {/* Requirements checklist */}
      <AnimatePresence mode="wait">
        {!validation.isValid && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-1.5"
          >
            {/* Minimum length */}
            <RequirementItem
              met={checks.minLength}
              text="At least 8 characters"
            />
            
            {/* Has letter */}
            <RequirementItem
              met={checks.hasLetter}
              text="Contains a letter"
            />
            
            {/* Has number */}
            <RequirementItem
              met={checks.hasNumber}
              text="Contains a number"
            />
            
            {/* Not common */}
            {!checks.notCommon && (
              <RequirementItem
                met={false}
                text="Too common - choose something unique"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success message when valid */}
      <AnimatePresence mode="wait">
        {validation.isValid && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2 text-xs text-gradient-secondary-from"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-medium">
              {strength === 'strong' ? 'Excellent password!' : 'Good password'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface RequirementItemProps {
  met: boolean;
  text: string;
}

function RequirementItem({ met, text }: RequirementItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
      className="flex items-center gap-2"
    >
      {met ? (
        <svg className="w-4 h-4 text-gradient-secondary-from flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="w-4 h-4 text-luxury-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="10" strokeWidth={2} />
        </svg>
      )}
      <span className={`text-xs ${met ? 'text-luxury-gray-400 line-through' : 'text-luxury-gray-400'}`}>
        {text}
      </span>
    </motion.div>
  );
}
