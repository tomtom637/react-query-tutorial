import { useQuery, QueryFunctionContext, useQueryClient } from "react-query";
import { Person } from "@/types/Person";

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
  const queryClient = useQueryClient();
  return useQuery(
    ["personById", personId],
    fetchPersonData,
    {
      initialData: () => {
        console.log(queryClient.getQueryData<Person[]>("personDataFromHook"));
        const selectedPerson = queryClient.getQueryData<Person[]>("personDataFromHook")
          ?.find(person => person.id === personId);
        if (selectedPerson) {
          return selectedPerson;
        } else {
          return undefined;
        }
      },
      onSuccess,
      onError,
      enabled
    }
  );
}