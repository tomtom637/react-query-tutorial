import { useQuery } from "react-query";
import { Person } from "../types/Person";


type Props = {
  onSuccess?: (data: Person[]) => void;
  onError?: (data: Person[]) => void;
  enabled?: boolean;
};

async function fetchPersonData(): Promise<Person[]> {
  return fetch("http://localhost:3001/people").then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
}

export default function useGetPersons({
  onSuccess,
  onError,
  enabled
}: Props
) {
  return useQuery(
    "personDataFromHook",
    fetchPersonData,
    {
      onSuccess,
      onError,
      enabled
    }
  );
}