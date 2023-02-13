import { useQuery, QueryFunctionContext } from "react-query";

type Person = {
  personId: number;
  name: string;
  age: number;
  hairColor: string;
  eyeColor: string;
  favoriteIceCream: string;
};

type Props = {
  personId: number;
  onSuccess?: (data: Person) => void;
  onError?: (data: Person) => void;
  enabled?: boolean;
};

async function fetchPersonData({ queryKey }: QueryFunctionContext): Promise<Person> {
  const [, personId] = queryKey;
  return fetch(`http://localhost:3001/people/${personId}`).then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
}

export default function useGetPersons({
  personId,
  onSuccess,
  onError,
  enabled
}: Props
) {
  return useQuery(
    ["personById", personId],
    fetchPersonData,
    {
      onSuccess,
      onError,
      enabled
    }
  );
}