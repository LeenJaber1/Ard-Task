const primaryMain = "#1E1E1E";        
const backgroundDefault = "#D9D9D9";
const cardsColor = "#D9D9D9";   
const white = "#ffffff";               
const green = "#4CBB17";
const buttonHover = "#333333";           
const textColor = "#292929";  

export const lightPalette = {
  primary: {
    main: primaryMain,
    dark: "#000000"    
  },
  secondary: {
    main: cardsColor,
  },
  background: {
    default: backgroundDefault,
    paper: cardsColor,
  },
  text: {
    primary: textColor
  },
  button: {
    background: green,
    text: white,
    hover: buttonHover
  },
  custom: {
    gradientBackground: 'linear-gradient(to top right, #FFFFFF, #292929)',
    hourlyDayForecast: 'linear-gradient(to bottom, #F88508, #F6FAD9)',
    hourlyNightForecast: 'linear-gradient(to bottom, #443D64, #6582C6)'
  }
};