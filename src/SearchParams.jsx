import React from "react";
import useBreedList from "./useBreedList";
import { useState } from "react";
import Results from "./Results"
import fetchSearch from "./fetchSearch";
import { useQuery } from "@tanstack/react-query";

const ANIMALS = ['bird', 'cat', 'dog', 'horse', 'reptile'];


const SearchParams = () => {
    const [requestParams, setRequestParams] = useState({
        location: "",
        animal: "",
        breed: "",
    });
    const [animal, setAnimal] = useState("");
    const[breeds] = useBreedList(animal);
      
    const results = useQuery(["search", requestParams], fetchSearch);
    const pets = results?.data?.pets ?? [];


    // useEffect(() => {
    //     requestPets();
    //   }, []);

    // async function requestPets() {
    //     const res = await fetch(
    //       `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    //     );
    //     const json = await res.json();
    //     setPets(json.pets);
    //   }


    return(
        <div className="search-params">
            <form 
                onSubmit={(e) => {e.preventDefault();
                const formData = new FormData(e.target); 
                const obj = {
                    animal: formData.get("animal") ?? "",
                    breed: formData.get("breed") ?? "",
                    location: formData.get("location") ?? "",
                };
                setRequestParams(obj);
                }
            }
            >
                <label htmlFor="location">
                    Location
                    <input name="location" id="location" placeholder="Location" />
                </label>
                <label htmlFor="animal">
                    Animal
                    <select
                        id="animal"
                        value={animal}
                        onChange={(e) => {
                        setAnimal(e.target.value);
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
                        name="breed"
                    >
                        <option />
                        {breeds.map((breed) => (
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