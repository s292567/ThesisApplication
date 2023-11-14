import Navbar from "../components/Navbar/Navbar";

const LandingPage = () => {
  return (
    <>
      <header>
        <Navbar loginButton={true}/>
      </header>
      <main>
        <div className="container" style={{display: "flex", flexDirection: "row", justifyContent:"center", marginTop: "12rem"}}>
          <p>Hello</p>
        </div>
      </main>
    </>
  );
};

export default LandingPage;
