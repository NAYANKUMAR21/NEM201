import axios from "axios";
import { useRouter } from "next/router";
const SingleRoute = ({ user }) => {
  console.log(user);
  return (
    <div>
      <h1>Single Page</h1>
      <h1>
        {user.id}-{user.task}
      </h1>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { id } = context.query;

  try {
    const { data } = await axios.get("http://localhost:8080/todo/" + id);
    console.log(data);
    return {
      props: {
        user: data,
      },
    };
  } catch (er) {}
};
export default SingleRoute;
