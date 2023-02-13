import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

// HOOKS
import useGetPersonById from "@/hooks/useGetPersonById";

// COMPONENTS
import Navbar from "@/components/NavBar/NavBar";

export default function PersonId(): JSX.Element {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetPersonById({
    personId: id ? parseInt(id) : 0,
  });

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
          {isError && (
            <p>
              <>There seems to be an error: {error}</>
            </p>
          )}
          {data && (
            <>
              <h3
                style={{
                  borderBottom: "1px solid deeppink",
                  marginBlockEnd: "10px",
                  display: "inline-block",
                }}
              >
                {data.name}
              </h3>
              <p>age: {data.age}</p>
              <p>hair: {data.hairColor}</p>
              <p>eye: {data.eyeColor}</p>
              <p>Ice cream: {data.favoriteIceCream}</p>
            </>
          )}
        </div>
      </main>
    </>
  );
}
