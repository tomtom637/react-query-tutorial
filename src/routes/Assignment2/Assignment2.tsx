import { useState } from "react";
import { Link } from "react-router-dom";

// HOOKS
import useGetPersons from "@/hooks/useGetPersons";

// COMPONENTS
import Navbar from "@/components/NavBar/NavBar";

export default function Assignment2(): JSX.Element {
  const [disabled, setDisabled] = useState(false);
  const { isLoading, isError, error, data, refetch } = useGetPersons({
    enabled: false,
  });

  const handleClick = () => {
    refetch();
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, 3000);
  };

  if (isLoading) return <p>Loading...</p>;

  if (isError && error instanceof Error)
    return <p>There seems to be an error: {error.message}</p>;

  return (
    <>
      <Navbar />
      <main>
        <button
          style={{ padding: "2px 10px", marginBlockEnd: "15px" }}
          onClick={handleClick}
          disabled={disabled}
        >
          {data ? "Refresh" : "Fetch"} the data
        </button>
        <div
          style={{
            display: "flex",
            gap: "40px",
            flexWrap: "wrap",
          }}
        >
          {data &&
            data.map((person) => (
              <Link
                to={`/person/${person.id}`}
                key={person.id}
                style={{ flexGrow: "1" }}
              >
                <h3
                  style={{
                    borderBottom: "1px solid deeppink",
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
              </Link>
            ))}
        </div>
      </main>
    </>
  );
}
