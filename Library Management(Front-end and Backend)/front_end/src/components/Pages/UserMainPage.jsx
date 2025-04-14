import React from "react";
import { useNavigate } from "react-router-dom";
import "../Style/UserMainPage.css"; // Import Custom CSS
import user from '../../assets/userlogin.jpg'


function UserMainPage() {
  const navigate = useNavigate();

  return (
    <div className="usermainpage-contain">
    <div className="container-fluid ">
      <div className="row justify-content-center subcontain">
        
        {/* First Card - Library Slogan */}
        <div className="col-md-4 col-sm-6  custom-mt-1024">
        <div className="card text-center shadow card-1">
          <div className="card-body">
            <h5 className="card-title">
              "Books are a uniquely portable magic."
            </h5>
            <p className="card-text">
              Discover, learn, and explore with every page. Your library adventure awaits!
            </p>
          </div>
        </div>
      </div>


        {/* Second Card - Image + Button */}
        <div className="col-md-5 col-sm-6">
          <div className="card text-center shadow card-2">
            <div className="card-body">
              <img
                src={user}
                alt="Library"
                className="img-fluid rounded"
              />
            </div>
            <div className="card-footer">
              <button className="btn " onClick={() => navigate("/userbooklist")}>
                Explore Books
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
    </div>
  );
}

export default UserMainPage;
