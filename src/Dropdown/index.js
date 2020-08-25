import React, { useState, useEffect, useCallback } from 'react';
import './styles.css';
import DropdownList from './DropdownList';


function Dropdown () {
    const [countriesList, setCountriesList ] = useState([]);
    const [searchValue, setSearchValue ] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [countOfMoreitems, setCountOfMoreitems] = useState(5);

    useEffect(() => {
        getCountriesList();
    }, []);

    const getCountriesList =() =>{

        setIsLoading(true);

        fetch(`https://5f43f3343fb92f00167531ed.mockapi.io/api/countries`)
        .then(res => res.json())
        .then(res => { 
            setIsLoading(false);
            setCountriesList(res);
        })
        .catch((e) => {
            setIsLoading(false);
        });
    }

    const debounce =(func, wait)=> {
        let timeout;
        return function(...args) {
          const context = this;
          if (timeout) clearTimeout(timeout);
          timeout = setTimeout(() => {
            timeout = null;
            func.apply(context, args);
          }, wait);
        };
    }

    const onChange =(value)=> {
        setIsLoading(false);
        setSearchValue(value);
        setCountOfMoreitems(5)

        fetch(`https://5f43f3343fb92f00167531ed.mockapi.io/api/countries?name=${value}`)
        .then(res => res.json())
        .then(res => {
            setIsLoading(false);
            setCountriesList(res);
        })
        .catch((e) => {
            setIsLoading(false);
        });
    }

    const debounceOnChange = useCallback(debounce(onChange, 500), []);


    const handleAddCountry = (value) => {

        setSelectedCountry(value);
        setIsLoading(true);

        fetch(`https://5f43f3343fb92f00167531ed.mockapi.io/api/countries`, {
            method: "POST",
            body: JSON.stringify({ 
                name: searchValue
            }), 
            headers: { 
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(res => res.json())
        .then(res =>  {
            setIsLoading(false);
            setCountriesList((prevState)=> [...prevState, res]);
        })  
        .catch((e) => {
            setIsLoading(false);
        });  
    }
 
    const hanldeMoreoptions =(e)=> {
        e.stopPropagation();
        setCountOfMoreitems((prevState) => prevState + 5);
    }

    const handleSelectedCountry =(value)=> {
        setSelectedCountry(value);
    }

    return (
        <div className="mainContainer">
            <div className="mainSelectBlock">
                <div className="headerTxt">
                    <h3>Standard Drop-down</h3>
                </div>
                <div className="selectBlock">
                    <div className="selectField">
                        <span className="selectFieldLocation">Select a Location: {selectedCountry}</span>
                        <span className="selectFieldCaretDownicon"/> 
                    </div>
                    <div className="selectList">
                        <div className="searchInput">
                            <input type="text" placeholder="Search..." onChange={e => debounceOnChange(e.target.value)} id="search"/>
                            <i className="fa fa-search searchIcon"></i>
                        </div>
                        {!isLoading ?
                            <div className="searchList">
                                <DropdownList 
                                countOfMoreitems={countOfMoreitems}
                                countriesList={countriesList} 
                                handleSelectedCountry={handleSelectedCountry}
                                handleAddCountry={handleAddCountry}
                                searchValue={searchValue}
                                hanldeMoreoptions={hanldeMoreoptions}
                                isLoading={isLoading}
                                /> 
                            </div>
                        :
                            <div className="spinner">
                                 <i className="fa fa-spinner fa-spin">
                                </i>Loading
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dropdown;
