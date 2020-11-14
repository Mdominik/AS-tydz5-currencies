import './App.css';
import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
function App() {
  const [currencies, setCurrencies] = useState([]);
  const [currentCurrency, setCurrentCurrency] = useState();
  const [currentRate, setCurrentRate] = useState();
  const [currentInputRate, setCurrentInputRate] = useState();

  useEffect(() => {
    fetch("https://api.exchangeratesapi.io/latest?base=PLN")
    .then(response=>response.json())
    .then(data=>{
      setCurrencies(data.rates);
      Object.keys(data.rates).map(key => {
        console.log(key);
      })
    })
  },[]);
  const onCurrencyChanged = async(event) => {
    console.log("countr code ::", event.target.value);
    const currencyCode = event.target.value;
    setCurrentCurrency(currencyCode);
    console.log(Object.entries(currencies));
    Object.entries(currencies).forEach(currency => {
      
      console.log(currency[0]);
      console.log(event.target.value);
        if(currency[0] === event.target.value) {
          setCurrentRate((1 / currency[1]).toFixed(2));
          console.log(currency[1]);
        }
    });
  };

  const onButtonClicked = (event)  => {
    console.log("Rate:" + currentRate);
    console.log("Your rate: " + currentInputRate);
    if(currentRate > currentInputRate) {
      alert("Za malo");
    }
    else if(currentRate < currentInputRate) {
      alert("Za duzo");
    }
    else {
      alert("Bingo!");
    }
  };

  const handleChange = (event) => {
    setCurrentInputRate(event.target.value);
    console.log(currentRate);
  };
  return (
    <div className="app">
      <h1>Zgadnij kurs wymiany (waluta -> PLN)</h1>
      <FormControl className="app__form">
        <InputLabel id="demo-simple-select-label">waluta</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currentCurrency}
          onChange={e => onCurrencyChanged(e)}
        >
          { Object.keys(currencies).map((currency) => (
              <MenuItem value={currency}>{currency}</MenuItem>))
          }
        </Select>

      </FormControl>
      <TextField id="outlined-basic" label="your guess" variant="outlined"  onChange={handleChange}  />
      <Button className="app__button" variant="contained" color="primary" onClick={onButtonClicked}>
        Zgadnij!
      </Button>
    </div>
  );
}

export default App;
