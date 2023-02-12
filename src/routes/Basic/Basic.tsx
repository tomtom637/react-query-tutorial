import { useQuery } from "react-query";
import Navbar from "@/components/NavBar/NavBar";

type Data = {
  name: string;
  description: string;
  subscribers_count: number;
  stargazers_count: number;
  forks_count: number;
};

async function fetchRepoData(): Promise<Data> {
  return fetch("https://api.github.com/repos/tannerlinsley/react-query").then(
    response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    }
  );
}

export default function Basic(): JSX.Element {
  const { isLoading, isError, error, data } = useQuery(
    "repoData",
    fetchRepoData,
    {
      // by adding a staleTime of 30 seconds, we can make sure that the data
      // is not refetched on every render, but only after 30 seconds have
      // passed since the last fetch
      staleTime: 30000,
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
          <h1>{data.name}</h1>
          <p>{data.description}</p>
          <strong>👀 {data.subscribers_count}</strong>{" "}
          <strong>✨ {data.stargazers_count}</strong>{" "}
          <strong>🍴 {data.forks_count}</strong>
        </main>
      </>
    );
  }

  return <p>Not found</p>;
}
