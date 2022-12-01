import { useAppSelector } from "@/hooks/useStore";
import { useRef, FC } from "react";
import { BsSearch } from "react-icons/bs";
import { Form, useSubmit } from "react-router-dom";

const InputSearch = () => {
  const { gender, species, status } = useAppSelector(
    (state) => state.characters.filter
  );
  const searchRef = useRef<HTMLInputElement>(null);
  const submit = useSubmit();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    submit(e.target);
    if (searchRef.current?.value) {
      searchRef.current.value = "";
    }
  };
  return (
    <div className="search">
      <Form onSubmit={handleSubmit}>
        <div style={{ display: "flex" }}>
          <input
            ref={searchRef}
            className="search_input"
            autoComplete="off"
            name="name"
            type="text"
            placeholder="Search"
          />
          <input
            name="species"
            value={species}
            type="hidden"
            placeholder="Search"
          />
          <input
            name="status"
            value={status}
            type="hidden"
            placeholder="Search"
          />
          <input
            name="gender"
            value={gender}
            type="hidden"
            placeholder="Search"
          />
          <button className="btn_search">
            <BsSearch />
          </button>
        </div>
      </Form>
    </div>
  );
};

export default InputSearch;
