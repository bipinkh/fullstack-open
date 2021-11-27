import React from "react";

const Find = ({currentQuery, handleQueryChange}) =>
    <div>
        find countries <input value={currentQuery} onChange={handleQueryChange} />
    </div>

export default Find