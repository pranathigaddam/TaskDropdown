import React from 'react';

const Dropdownlist = React.memo(({countriesList, handleSelectedCountry, countOfMoreitems, handleAddCountry, searchValue, hanldeMoreoptions}) => {
    return (
        <ul>
             {
                countriesList.length > 0 ?
                 countriesList.slice(0, countOfMoreitems).map((country, i) => {
                    return ( 
                        <li key={country.id} onClick={e => handleSelectedCountry(country.name)}> 
                            {country.name}
                            {
                                countriesList.length !== i+ 1 && countriesList.slice(0, countOfMoreitems).length === i+ 1 && 
                                <span onClick={e => hanldeMoreoptions(e)}>5 more...</span>
                            }
                       </li>
                    )
                })
                : searchValue !== "" && <li>"{searchValue}" not found<button onClick={e => handleAddCountry(searchValue)}>Add & Select</button></li>
            }
        </ul>
    )
})

export default Dropdownlist;
