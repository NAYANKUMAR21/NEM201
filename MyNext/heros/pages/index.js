import axios from "axios";
import Link from "next/link";
export default function Home({ user }) {
  console.log(user, "frontend");
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Heros</h1>
      <div
        style={{
          display: "flex",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "20px",
          margin: "auto",
          width: "50%",
        }}
      >
        {user?.map((item) => {
          return (
            <Link href={`/${item._id}`}>
              <div key={item._id}>
                <h3>{item.name}</h3>
                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                  }}
                >
                  {item.powers?.map((el) => {
                    return <p>{el}</p>;
                  })}
                </div>
                <p>Age-{item.metadata.age}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
export const getServerSideProps = async () => {
  try {
    const { data } = await axios.get("http://localhost:8080");
    return {
      props: {
        user: data,
      },
    };
  } catch (re) {
    console.log(re.message);
  }
};
