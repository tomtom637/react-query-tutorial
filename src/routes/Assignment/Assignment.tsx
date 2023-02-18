import { useState, useMemo } from "react";
import { useQuery } from "react-query";
import { Person } from "@/types/Person";

// HOOKS
import usePostPerson from "@/hooks/usePostPerson";

// COMPONENTS
import Navbar from "@/components/NavBar/NavBar";
import AddPersonForm from "@/components/AddPersonForm/AddPersonForm";

async function fetchPersonData(): Promise<Person[]> {
  return fetch("http://localhost:3001/people").then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
}

export default function Assignment(): JSX.Element {
  const postPerson: any = usePostPerson();
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
      //refetchInterval: queryInterval,
      refetchOnWindowFocus: false,
      onSuccess,
      onError,
    }
  );

  const brownEyedPeople = useMemo(() => {
    return data?.filter((person: Person) => person.eyeColor === "brown");
  }, [data]);

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
          {isLoading && <p>Loading...</p>}
          {postPerson.isLoading && <p>Adding person...</p>}
          {isError && error instanceof Error && (
            <p>There seems to be an error: {error.message}</p>
          )}
          {postPerson.isError && (
            <p>There seems to be an error: {postPerson.error.message}</p>
          )}
          {data?.map((person: Person) => (
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
        <section
          style={{
            marginBlockStart: "20px",
            display: "flex",
            alignItems: "baseline",
            gap: "15px",
          }}
        >
          <h3>Brown eyed people: </h3>
          {brownEyedPeople?.map((person: Person) => (
            <p key={person.id}>{person.name}</p>
          ))}
        </section>
        <section style={{ marginBlockStart: "20px" }}>
          <h3>Add a person</h3>
          <AddPersonForm postPerson={postPerson} />
        </section>
      </main>
    </>
  );
}
