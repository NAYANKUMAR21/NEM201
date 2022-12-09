import React from "react";

const laptop = ({ state }) => {
  // const { query } = useRouter(); //we use useRouter for dynamic routing.  we use id because filename is id
  // useEffect(() => {

  // }, [query.id]);

  return (
    <div>
      <h1>
        {state.name} -{state.username}
      </h1>
      <h1>{state.website}</h1>
      <h1>About - {state.phone}</h1>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { id } = context.query;
  let x = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  let res = await x.json();
  return {
    props: {
      state: res,
    },
  };
};

export default laptop;
