import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useSelectedContext } from "../../context/SelectedContext";
import useGetConversations from "../../hooks/useGetCoversations";
import toast from "react-hot-toast";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useSelectedContext();
  const { conversations } = useGetConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
    }

    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else toast.error("No such user found!");
  };
  return (
    <form onSubmit={handleSubmit} className="upshadow1 p-2 flex gap-3">
      <div className="shadow1">
        <input
          type="text"
          value={search}
          placeholder="Search"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      <button type="submit" className="circle text-center">
        <IoIosSearch className="mx-auto text-xl" />
      </button>
    </form>
  );
};

export default SearchInput;
