import React from "react";
import { useState } from "react";

const ANIMALS = ['bird', 'cat', 'dog', 'horse', 'reptile'];
const SearchParams = () => {
    const [location, setLocation] = useState("")
    const [animal, setAnimal] = useState("")
    const [breed, setBreed] = useState("")
    const Breeds = [];
    return(
        <div className="search-params">
            <form>
                <label htmlFor="location">
                    Location
                    <input onChange={(e) => setLocation(e.target.value)} id="location" value={location} placeholder="Location" />
                </label>
                <label htmlFor="animal">
                    Animal
                    <select
                        id="animal"
                        value={animal}
                        onChange={(e) => {
                        setAnimal(e.target.value);
                        setBreed("")
                        }}
                    >
                        <option />
                        {ANIMALS.map((animal) => (
                        <option key={animal} value={animal}>
                            {animal}
                        </option>
                        ))}
                    </select>
                </label>
                <label htmlFor="breed">
                    Breed
                    <select
                        id="breed"
                        disabled = {Breeds.length === 0}
                        value={breed}
                        onChange={(e) => {
                        setBreed(e.target.value);
                        }}
                    >
                        <option />
                        {Breeds.map((breed) => (
                        <option key={breed} value={breed}>
                            {breed}
                        </option>
                        ))}
                    </select>
                </label>
                <button>Submit</button>
            </form>
        </div>
    );
};

export default SearchParams;