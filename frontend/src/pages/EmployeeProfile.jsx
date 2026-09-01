
import { useEffect, useState } from "react";
import { getEmployeeById } from "../services/employeeService";
import "./EmployeeProfile.css";
function EmployeeProfile({ employeeId, onBack, onEdit }) {

    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadEmployee();
    }, [employeeId]);

    const loadEmployee = async () => {

        try {

            const response = await getEmployeeById(employeeId);

            setEmployee(response.data);

        } catch (error) {

            console.error("Error loading employee:", error);

        } finally {

            setLoading(false);

        }
    };

    if (loading) {
        return <h2>Loading employee...</h2>;
    }

    if (!employee) {
        return <h2>Employee not found</h2>;
    }

    return (
    <div className="profile-page">

        <button
            className="back-button"
            onClick={onBack}
        >
            ← Back to Employees
        </button>


        <div className="profile-card">

            <div className="profile-header">

                <img
                    className="profile-photo"
                    src={
                        employee.profilePhotoUrl
                            ? employee.profilePhotoUrl
                            : "https://via.placeholder.com/150"
                    }
                    alt={employee.name}
                />


                <div>

                    <h1>
                        {employee.name}
                    </h1>

                    <p>
                        {employee.designation}
                    </p>

                </div>

            </div>


            <div className="profile-info">

                <div className="info-item">

                    <span className="info-label">
                        Employee ID
                    </span>

                    <span className="info-value">
                        {employee.employeeId}
                    </span>

                </div>


                <div className="info-item">

                    <span className="info-label">
                        Department
                    </span>

                    <span className="info-value">
                        {employee.department}
                    </span>

                </div>


                <div className="info-item">

                    <span className="info-label">
                        Email
                    </span>

                    <span className="info-value">
                        {employee.email}
                    </span>

                </div>


                <div className="info-item">

                    <span className="info-label">
                        Phone
                    </span>

                    <span className="info-value">
                        {employee.phone || "Not provided"}
                    </span>

                </div>


                <div className="info-item">

                    <span className="info-label">
                        Designation
                    </span>

                    <span className="info-value">
                        {employee.designation}
                    </span>

                </div>


                <div className="info-item">

                    <span className="info-label">
                        Joining Date
                    </span>

                    <span className="info-value">
                        {employee.joiningDate || "Not provided"}
                    </span>

                </div>

            </div>


            <div className="profile-actions">

                <button
                    className="profile-edit-button"
                    onClick={() => onEdit(employee.id)}
                >
                    Edit Employee
                </button>

            </div>

        </div>

    </div>
);
}

export default EmployeeProfile;