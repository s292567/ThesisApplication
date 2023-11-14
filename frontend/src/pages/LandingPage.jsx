import Navbar from "../components/Navbar/Navbar";

const LandingPage = (props) => {
  return (
    <>
      <header>

        <Navbar isLoggedIn={props.isLoggedIn} logout={props.logout}/>

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
