import { useQuery } from "react-query";

type Person = {
  id: number;
  name: string;
  age: number;
  hairColor: string;
  eyeColor: string;
  favoriteIceCream: string;
};

type Props = {
  onSuccess?: (data: Person[]) => void;
  onError?: (data: Person[]) => void;
  enabled?: boolean;
};

async function fetchPersonData(): Promise<Person[]> {
  return fetch("src/assets/db.json").then(response => {
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