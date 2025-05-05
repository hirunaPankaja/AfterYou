import React from "react";
import "../style/UserProfile.css";
import { FaUserCircle } from "react-icons/fa"; // Using react-icons for the default profile icon

const UserProfile = () => {
    return (
        <div className="profile-container">
            <div className="user-profile-header">
                <div className="profile-photo">
                    <FaUserCircle className="default-icon" />
                </div>
                <div className="profile-info">
                    <h1>Shey Silva</h1>
                    <div className="profile-subheader">
                        Female - 26 years <span className="nic">200072348138</span>
                    </div>
                </div>
            </div>

            <div className="details-container">
                <div className="user-details">
                    <h2>Date Of Birth</h2>
                    <p>17/08/2000</p>

                    <h2>Address</h2>
                    <p>761, Park Street, Colombo 08.</p>

                    <h2>Contacts</h2>
                    <p>
                        Email : Siva@gmail.com<br />
                        Mobile : 077 8564632
                    </p>
                </div>

                <div className="vertical-divider"></div>

                <div className="executor-details">
                    <h2>Executor Details</h2>
                    <p><strong>Name</strong><br />
                        Damian Smith</p>

                    <p><strong>Date Of Birth</strong><br />
                        17/08/2010</p>

                    <p><strong>NIC</strong><br />
                        200072348138</p>

                    <p><strong>Contacts</strong><br />
                        Email : Siva@gmail.com<br />
                        Mobile : 077 8564632</p>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;