import React from "react";

const CountryList = ({countries, selectHandler}) =>
    <div>
        {countries.map( country =>
            <div key={country.name.common}>
                {country.name.common}
                <button onClick={selectHandler} value={country.name.common}> show< /button>
            </div>
        )}
    </div>

export default CountryList