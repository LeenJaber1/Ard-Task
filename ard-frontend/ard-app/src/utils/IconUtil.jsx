export const getIcon = (filename , isLight) => {
    const lightDarkIcons = [
      "humidity.png",
      "pressure.png",
      "sunrise.png",
      "sunset.png",
      "uv.png",
      "wind.png",
    ];
    if (lightDarkIcons.includes(filename)) {
      return require(`../assets/${isLight ? "light" : "dark"}/${filename}`);
    } else {
      return require(`../assets/${filename}`);
    }
  };

    export const mapConditionToIcon = (condition, isDay = true) => {
        if (!condition) return isDay ? "clear.png" : "night.png";

        const lower = condition.toLowerCase();
      
        if (lower.includes("sun") || lower.includes("clear"))
          return isDay ? "clear.png" : "night.png";
      
        if (lower.includes("cloud")) return isDay ? "clouds.png" : "clouds_night.png";
        if (lower.includes("drizzle")) return  "drizzle.png" ;
        if (lower.includes("mist")) return "mist.png" ;
        if (lower.includes("rain")) return "rain.png";
        if (lower.includes("snow")) return "snow.png";
        if (lower.includes("storm") || lower.includes("thunder")) return "storm.png" ;
      
        return isDay ? "clear.png" : "night.png";
  };
