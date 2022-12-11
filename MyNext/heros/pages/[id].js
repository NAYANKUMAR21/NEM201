import axios from "axios";

const SingleHero = ({ hero }) => {
  console.log(hero, "single");
  return (
    <div
      style={{
        border: "1px solid teal",
        padding: "20px",
        width: "30%",
        margin: "auto",
      }}
    >
      <h3 style={{ textAlign: "center" }}>{hero.name}</h3>
      <p style={{ textAlign: "center" }}>{hero.health}</p>
      <p style={{ textAlign: "center" }}>Age : {hero.metadata.age} </p>
      <p style={{ textAlign: "center" }}>
        favirate Color: {hero.metadata.favouriteColor}{" "}
      </p>
      <h1 style={{ textAlign: "center" }}>Villains</h1>
      <div style={{ display: "flex", columnGap: "20px", margin: "auto" }}>
        {hero.villains?.map((item) => {
          return (
            <>
              <span>
                Name<h4>{item.name}</h4>
              </span>
              <span>
                Health<h1>{item.health}</h1>
              </span>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default SingleHero;
export const getServerSideProps = async (context) => {
  const { id } = context.query;
  try {
    const { data } = await axios.get(`http://localhost:8080/${id}`);
    return {
      props: {
        hero: data,
      },
    };
  } catch (er) {
    console.log(er.message);
  }
};
