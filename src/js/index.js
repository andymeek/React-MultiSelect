import React from 'react';
import ReactDOM from 'react-dom';
import MultiSelect from './components/MultiSelect';

const selectedCitiesElement = document.getElementById('selected-cities');

const cities = [
    'Sydney',
    'Melbourne',
    'Brisbane',
    'Perth',
    'Adelaide'
];

const getSelectedCities = (selectedCityIndexes = [], cities = []) => {
  let tmpCities = [];
  for (let city of selectedCityIndexes) {
    tmpCities.push(cities[city]);
  }
  return tmpCities;
};

const selectedOptionsCallback = (selectedIndexes) => {
    const selectedCities = getSelectedCities(selectedIndexes, cities);
    renderSelectedCities(selectedCities);
};

const renderSelectedCities = (selectedCities = []) => {
    selectedCitiesElement.innerHTML = `
        <p>You have selected...</p>
        <p>${selectedCities.join(', ')}</p>
    `;
        
};

ReactDOM.render(
    <MultiSelect
        dropDownLabel={'Select city'}
        initialSelectedIndexes={[]}
        enabled={true}
        optionsData={cities}
        selectedOptionsCallback={selectedOptionsCallback}
    />,
    document.getElementById('app')
);