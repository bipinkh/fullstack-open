import React from "react";

const CountryList = ({countries}) =>
    <div>
        <ul> {countries.map( country => <li key={country.name.common}> {country.name.common} </li> )} </ul>
    </div>

export default CountryList