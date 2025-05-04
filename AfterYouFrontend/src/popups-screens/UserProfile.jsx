import React from "react";
import "../style/UserProfile.css";

const UserProfile = () => {
    return (
        <div className="profile-container">
            <div className="profile-header">
                <h1 className="profile-name">Shey Silva</h1>
                <div className="profile-subheader">
                    <span>Female - 26 years</span>
                    <span className="nic">200072348138</span>
                </div>
            </div>

            <div className="profile-section">
                <h2 className="section-title">Date Of Birth</h2>
                <p className="section-content">17/09/2000</p>
            </div>

            <div className="profile-section">
                <h2 className="section-title">Address</h2>
                <p className="section-content">76/1, Park Street, Colombo 08.</p>
            </div>

            <div className="profile-section">
                <h2 className="section-title">Contacts</h2>
                <p className="section-content">
                    Email : Silva@gmail.com<br />
                    Mobile : 077 8954632
                </p>
            </div>

            <div className="divider"></div>

            <div className="profile-section">
                <h2 className="section-title">Executor Details</h2>

                <div className="executor-details">
                    <div className="detail-item">
                        <strong>Name</strong>
                        <p>Damian Smith</p>
                    </div>

                    <div className="detail-item">
                        <strong>Date Of Birth</strong>
                        <p>17/09/2010</p>
                    </div>

                    <div className="detail-item">
                        <strong>NIC</strong>
                        <p>200072348138</p>
                    </div>

                    <div className="detail-item">
                        <strong>Contacts</strong>
                        <p>
                            Email : Silva@gmail.com<br />
                            Mobile : 077 8954632
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;