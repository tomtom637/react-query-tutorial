import { useState } from "react";
import { useQuery } from "react-query";
//import db from "@/assets/db.json";

// COMPONENTS
import Navbar from "@/components/NavBar/NavBar";

type Person = {
  id: number;
  name: string;
  age: number;
  hairColor: string;
  eyeColor: string;
  favoriteIceCream: string;
};

async function fetchPersonData(): Promise<Person[]> {
  return fetch("http://localhost:3001/people").then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
}

export default function Assignment(): JSX.Element {
  const [queryInterval, setQueryInterval] = useState<number | false>(3000);
  const onSuccess = (data: Person[]) => {
    if (data.length > 5) {
      setQueryInterval(false);
    }
  };
  const onError = (error: Error) => {
    setQueryInterval(false);
    console.log(error);
  };
  const { isLoading, isError, error, data } = useQuery(
    "personData",
    fetchPersonData,
    {
      // queries the db every 3 seconds for as long as there are less
      // than 5 people or until there is an error
      refetchInterval: queryInterval,
      onSuccess,
      onError,
    }
  );

  if (isLoading) return <p>Loading...</p>;

  if (isError && error instanceof Error)
    return <p>There seems to be an error: {error.message}</p>;

  if (data) {
    return (
      <>
        <Navbar />
        <main>
          <div
            style={{
              display: "flex",
              gap: "40px",
              flexWrap: "wrap",
            }}
          >
            {data.map((person: Person) => (
              <div key={person.id} style={{ flexGrow: "1" }}>
                <h3
                  style={{
                    borderBottom: "3px solid deeppink",
                    marginBlockEnd: "10px",
                    display: "inline-block",
                  }}
                >
                  {person.name}
                </h3>
                <p>age: {person.age}</p>
                <p>hair: {person.hairColor}</p>
                <p>eye: {person.eyeColor}</p>
                <p>Ice cream: {person.favoriteIceCream}</p>
              </div>
            ))}
          </div>
        </main>
      </>
    );
  }

  return <p>Not found</p>;
}
