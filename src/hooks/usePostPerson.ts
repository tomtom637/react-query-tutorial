import { useMutation, useQueryClient } from "react-query";
import { Person } from "../types/Person";

async function postPersonData(person: Person) {
  const response = await fetch("http://localhost:3001/people", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(person)
  });
  if (!response.ok) {
    throw new Error("It seems we couldn't post that person at this time...");
  }
  const result = await response.json();
}

export default function usePostPerson() {
  const queryClient = useQueryClient();
  return useMutation(postPersonData, {
    onSuccess: () => {
      queryClient.invalidateQueries("personData");
    },
  });
}

