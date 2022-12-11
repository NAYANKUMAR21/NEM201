import Link from "next/link";
import axios from "axios";
import { useState } from "react";
export default function Home({ user }) {
  const [tasks, setTasks] = useState("");
  const [data, setData] = useState(user);
  const handleClick = (e) => {
    e.preventDefault();
    postData(tasks).then(() => {
      getData().then((res) => setData(res));
    });
    setTasks("");
  };
  return (
    <div style={{ textAlign: "center" }}>
      <h1>TODO</h1>
      <form onSubmit={handleClick}>
        <input
          placeholder="Enter tasks"
          // value={tasks}
          onChange={(e) => setTasks(e.target.value)}
        />
        <input type="submit" defaultValue="ADD" />
      </form>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "20px",
        }}
      >
        {data?.map((item) => {
          return (
            <div key={item.id}>
              <Link
                href={`/${item.id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <h3>
                  {item.id}. {item.task}
                </h3>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  try {
    const { data } = await axios.get("http://localhost:8080/todo");
    console.log(data, "nayan");
    return {
      props: {
        user: data,
      },
    };
  } catch (er) {
    console.log(er.message, "inside get serve side props");
  }
};
export const postData = async (task) => {
  try {
    const obj = { id: Date.now(), task };
    const get = await axios.post("http://localhost:8080/todo", obj);
    console.log(get, "from post");
  } catch (er) {
    console.log(er.message);
  }
};

const getData = async () => {
  try {
    let { data } = await axios.get("http://localhost:8080/todo");
    console.log(data, "from get ");
    return data;
  } catch (er) {
    console.log(er.message);
  }
};
