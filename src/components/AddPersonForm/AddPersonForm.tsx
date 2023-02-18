import { useState } from "react";

const formGroupStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  width: "50%",
} as const;

export default function AddPersonForm({ postPerson }: { postPerson: any }) {
  const [personData, setPersonData] = useState({
    name: "",
    age: "",
    hairColor: "",
    eyeColor: "",
    favoriteIceCream: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPersonData({ ...personData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    postPerson.mutate(personData);
    setPersonData({
      name: "",
      age: "",
      hairColor: "",
      eyeColor: "",
      favoriteIceCream: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={formGroupStyle}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={personData.name}
          onChange={handleChange}
        />
      </div>
      <div style={formGroupStyle}>
        <label htmlFor="age">Age</label>
        <input
          type="number"
          name="age"
          id="age"
          value={personData.age}
          onChange={handleChange}
        />
      </div>
      <div style={formGroupStyle}>
        <label htmlFor="hairColor">Hair Color</label>
        <input
          type="text"
          name="hairColor"
          id="hairColor"
          value={personData.hairColor}
          onChange={handleChange}
        />
      </div>
      <div style={formGroupStyle}>
        <label htmlFor="eyeColor">Eye Color</label>
        <input
          type="text"
          name="eyeColor"
          id="eyeColor"
          value={personData.eyeColor}
          onChange={handleChange}
        />
      </div>
      <div style={formGroupStyle}>
        <label htmlFor="favoriteIceCream">Favorite Ice Cream</label>
        <input
          type="text"
          name="favoriteIceCream"
          id="favoriteIceCream"
          value={personData.favoriteIceCream}
          onChange={handleChange}
        />
      </div>
      <div style={formGroupStyle}>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
