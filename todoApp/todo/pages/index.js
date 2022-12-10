import Link from "next/link";
import axios from "axios";
import { useState } from "react";
export default function Home({ user }) {
  const [tasks, setTasks] = useState("");
  console.log(tasks);
  const handleClick = (e) => {
    e.preventDefault();
    postData(tasks);
    
  };
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Nayan kumar</h1>
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
        {user.map((item) => {
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
const postData = async (task) => {
  try {
    const obj = { id: Date.now(), task };
    const get = await axios.post("http://localhost:8080/todo", obj);
    console.log(get);
  } catch (er) {
    console.log(er.message);
  }
};
