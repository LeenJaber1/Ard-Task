const primaryMain = "#1E1E1E";        
const backgroundDefault = "#444444";
const cardsColor = "#444444";  
const white = "#ffffff";               
const green = "#4CBB17";  
const buttonHover = "#333333";         

export const darkPalette = {
  primary: {
    main: primaryMain,
    dark: "#000000"    
  },
  secondary: {
    main: cardsColor,
  },
  background: {
    default: backgroundDefault,
    paper: "#333333", 
  },
  text: {
    primary: white
  },
  button: {
    background: green,
    text: white,
    hover: buttonHover
  },
  custom: {
    gradientBackground: primaryMain,
    hourlyDayForecast: cardsColor,
    hourlyNightForecast: cardsColor
  }
};