import React from "react";

const CountryDetail = ( {country} ) => {
        const languages = Object.entries( country.languages ).map( l =>l[1])
        return <div>
                <h1>{country.name.common}</h1>
                capital {country.capital[0]}<br/>
                population {country.population}
                <h2>languages</h2>
                <ul> {languages.map( l => <li key={l}>{l}</li> )} </ul>
                <img alt={"flag"} src={country.flags.png}/>
        </div>
}

export default CountryDetail