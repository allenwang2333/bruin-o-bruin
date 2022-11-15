import React from "react";
  
const Home = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <form action="../../post" method="post" 
              className="form">
          <button type="submit">Connected?</button>
        </form>
    </div>
  );
};
  
export default Home;