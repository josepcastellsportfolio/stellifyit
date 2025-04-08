import colors from '../theme/colors';

// Function to inject CSS variables dynamically
const setCSSVariables = () => {
  const root = document.documentElement;

  // Light theme variables
  root.style.setProperty('--dynamic-light-gradient-start', colors.background);
  root.style.setProperty('--dynamic-light-gradient-end', colors.secondaryButtonColor);

  // Dark theme variables
  root.style.setProperty('--dynamic-dark-gradient-start', colors.backgroundDark);
  root.style.setProperty('--dynamic-dark-gradient-end', colors.background2Dark);
};

// Call the function to set the variables
setCSSVariables();