import React from "react";
import useBreedList from "./useBreedList";
import { useEffect, useState } from "react";
import Results from "./Results"

const ANIMALS = ['bird', 'cat', 'dog', 'horse', 'reptile'];
const SearchParams = () => {
    const [pets, setPets] = useState([]);
    const [location, setLocation] = useState("");
    const [animal, setAnimal] = useState("");
    const [breed, setBreed] = useState("");
    const [breedList, status] = useBreedList(animal);
    const breeds = useBreedList(animal);

    useEffect(() => {
        requestPets();
      }, []);

    async function requestPets() {
        const res = await fetch(
          `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
        );
        const json = await res.json();
        setPets(json.pets);
      }



    return(
        <div className="search-params">
            <form onSubmit={(e) => {e.preventDefault();
                requestPets();}}
            >
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
                        disabled = {breeds.length === 0}
                        value={breed}
                        onChange={(e) => {
                        setBreed(e.target.value);
                        }}
                    >
                        <option />
                        {breedList.map((breed) => (
                        <option key={breed} value={breed}>
                            {breed}
                        </option>
                        ))}
                    </select>
                </label>
                <button>Submit</button>
            </form>
            <Results pets ={pets}/>
        </div>
    );
};

export default SearchParams;