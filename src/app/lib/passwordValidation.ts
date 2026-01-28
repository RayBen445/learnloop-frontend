// Password validation utilities

export interface PasswordValidation {
  isValid: boolean;
  strength: 'weak' | 'medium' | 'strong';
  checks: {
    minLength: boolean;
    hasLetter: boolean;
    hasNumber: boolean;
    notCommon: boolean;
  };
  feedback: string[];
}

// Common weak passwords to reject
const COMMON_PASSWORDS = [
  'password', 'password123', '123456', '12345678', 'qwerty', 'abc123',
  'monkey', '1234567', 'letmein', 'trustno1', 'dragon', 'baseball',
  'iloveyou', 'master', 'sunshine', 'ashley', 'bailey', 'passw0rd',
  'shadow', '123123', '654321', 'superman', 'qazwsx', 'michael',
  'football', 'welcome', 'jesus', 'ninja', 'mustang', 'password1'
];

export function validatePassword(password: string): PasswordValidation {
  const checks = {
    minLength: password.length >= 8,
    hasLetter: /[a-zA-Z]/.test(password),
    hasNumber: /\d/.test(password),
    notCommon: !COMMON_PASSWORDS.includes(password.toLowerCase()),
  };

  const feedback: string[] = [];
  
  if (!checks.minLength) {
    feedback.push('At least 8 characters');
  }
  if (!checks.hasLetter) {
    feedback.push('Include a letter');
  }
  if (!checks.hasNumber) {
    feedback.push('Include a number');
  }
  if (!checks.notCommon) {
    feedback.push('Too common - choose something unique');
  }

  // All checks must pass for validity
  const isValid = Object.values(checks).every(check => check);

  // Calculate strength
  let strength: 'weak' | 'medium' | 'strong' = 'weak';
  
  if (isValid) {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecial = /[^a-zA-Z0-9]/.test(password);
    const isLong = password.length >= 12;
    
    const strengthPoints = [
      hasUpperCase,
      hasLowerCase,
      hasSpecial,
      isLong,
    ].filter(Boolean).length;
    
    if (strengthPoints >= 3) {
      strength = 'strong';
    } else if (strengthPoints >= 1) {
      strength = 'medium';
    }
  }

  return {
    isValid,
    strength,
    checks,
    feedback,
  };
}
