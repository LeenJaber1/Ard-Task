import {
  Box,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
} from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { fetchWithRefresh } from "../utils/ApiUtil";

const SearchBar = ({ setCity , updateUserLocation}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && query.trim() !== "") {
      handleSelection(query);
    }
  };

  const handleItemClick = (city) => {
    setResults([]); 
    handleSelection(city);
  };

  const handleSelection = (selectedValue) => {
    updateUserLocation(selectedValue);
    setCity(selectedValue);
  };

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);
    if(value === ""){
      return;
    }
    try {
      const response = await fetchWithRefresh(() => axios.get(
        `http://localhost:8080/weather/complete?input=${encodeURIComponent(value)}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
      ));
      setResults(response.data); 
    } catch (error) {
        console.error("Error fetching cities:", error);
        setResults([]); 
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 600, mx: "auto", mt: 4, position: "relative" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#2e2e2e",
          borderRadius: "999px",
          px: 2,
          py: 1,
          boxShadow: 2,
        }}
      >
        <SearchIcon sx={{ color: "#aaa", mr: 1 }} />
        <InputBase
          value={query}
          onChange={handleSearch}
          placeholder="Search for your preffered city..."
          onKeyPress={handleKeyPress}
          sx={{
            color: "white",
            flex: 1,
            fontSize: "1rem",
          }}
        />
      </Box>

      <List disablePadding>
        {query.trim() !== "" && results.length > 0 && (
          <Paper
          sx={{
            maxHeight: 300,
            overflow: "auto",
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            mt: 1,
            backgroundColor: "#222",
            borderRadius: 2,
            color: "white",
            zIndex: 10,
          }}
          >
            <List disablePadding>
              {results.map((city, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    onClick={() => handleItemClick(city.name)}
                    sx={{
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                      },
                    }}
                  >
                    <ListItemText
                      primary={city.name} 
                      sx={{
                        fontSize: "0.95rem",
                        padding: "4px 0",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Paper>
        )}
      </List>
    </Box>
  );
};

export default SearchBar;
