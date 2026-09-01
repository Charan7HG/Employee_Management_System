
import { useEffect, useState } from "react";

import {
    getEmployees,
    deleteEmployee
} from "../services/employeeService";
import "./EmployeeList.css";
import EmployeeForm from "./EmployeeForm";
import EmployeeProfile from "./EmployeeProfile";

function EmployeeList() {

    const [employees, setEmployees] = useState([]);

    const [search, setSearch] = useState("");

    const [showForm, setShowForm] = useState(false);

    const [showProfile, setShowProfile] = useState(false);

    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);


    // Load all employees
    const loadEmployees = async () => {

        try {

            const response = await getEmployees();

            setEmployees(response.data);

        } catch (error) {

            console.error("Error loading employees:", error);

        }

    };


    useEffect(() => {

        loadEmployees();

    }, []);


    // Add Employee
    const handleAdd = () => {

        setSelectedEmployeeId(null);

        setShowProfile(false);

        setShowForm(true);

    };


    // Edit Employee
    const handleEdit = (id) => {

        setSelectedEmployeeId(id);

        setShowProfile(false);

        setShowForm(true);

    };


    // View Employee Profile
    const handleProfile = (id) => {

        setSelectedEmployeeId(id);

        setShowForm(false);

        setShowProfile(true);

    };


    // Delete Employee
    const handleDelete = async (id) => {

        if (!window.confirm(
            "Are you sure you want to delete this employee?"
        )) {

            return;

        }


        try {

            await deleteEmployee(id);

            loadEmployees();

        } catch (error) {

            console.error("Error deleting employee:", error);

        }

    };


    // After Add / Edit
    const handleSaved = () => {

        setShowForm(false);

        setShowProfile(false);

        setSelectedEmployeeId(null);

        loadEmployees();

    };


    // Cancel Form
    const handleCancel = () => {

        setShowForm(false);

        setSelectedEmployeeId(null);

    };


    // Back from Profile
    const handleBackFromProfile = () => {

        setShowProfile(false);

        setSelectedEmployeeId(null);

    };


    // Search
    const filteredEmployees = employees.filter((employee) => {

        const searchText = search.toLowerCase();

        return (

            employee.name?.toLowerCase().includes(searchText) ||

            employee.employeeId?.toLowerCase().includes(searchText) ||

            employee.department?.toLowerCase().includes(searchText) ||

            employee.designation?.toLowerCase().includes(searchText) ||

            employee.email?.toLowerCase().includes(searchText)

        );

    });


    // ================================
    // SHOW ADD / EDIT FORM
    // ================================

    if (showForm) {

        return (

            <EmployeeForm
                employeeId={selectedEmployeeId}
                onSaved={handleSaved}
                onCancel={handleCancel}
            />

        );

    }


    // ================================
    // SHOW EMPLOYEE PROFILE
    // ================================

    if (showProfile) {

        return (

            <EmployeeProfile
                employeeId={selectedEmployeeId}
                onBack={handleBackFromProfile}
                onEdit={handleEdit}
            />

        );

    }


    // ================================
    // EMPLOYEE LIST
    // ================================

    return (

        <div className="employee-page">

            <div className="employee-header">

                <div>
                    <h1>Employee Management</h1>
                    <p>Manage your organization's employees</p>
                </div>

                <button
                    className="add-button"
                    onClick={handleAdd}
                >
                    + Add Employee
                </button>

            </div>


            <br />
            <br />


            <div className="search-container">

                <input
                    className="search-input"
                    type="text"
                    placeholder="Search by name, ID, department..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

            </div>


            <br />
            <br />


            <div className="table-container">

                <table className="employee-table">

                    <thead>

                        <tr>

                            <th>ID</th>

                            <th>Employee ID</th>

                            <th>Name</th>

                            <th>Email</th>

                            <th>Department</th>

                            <th>Designation</th>

                            <th>Actions</th>

                        </tr>

                    </thead>


                    <tbody>

                        {filteredEmployees.length > 0 ? (

                            filteredEmployees.map((employee) => (

                                <tr key={employee.id}>

                                    <td>
                                        {employee.id}
                                    </td>


                                    <td>
                                        {employee.employeeId}
                                    </td>


                                    <td className="employee-name">
                                        {employee.name}
                                    </td>


                                    <td>
                                        {employee.email}
                                    </td>


                                    <td>
                                        <span className="department-badge">
                                            {employee.department}
                                        </span>
                                    </td>


                                    <td>
                                        {employee.designation}
                                    </td>


                                    <td>

                                      <button
    className="action-button view-button"
    onClick={() =>
        handleProfile(employee.id)
    }
>
    View
</button>


                                        {" "}


                                        <button
    className="action-button edit-button"
    onClick={() =>
        handleEdit(employee.id)
    }
>
    Edit
</button>

                                        {" "}


                                       <button
    className="action-button delete-button"
    onClick={() =>
        handleDelete(employee.id)
    }
>
    Delete
</button>

                                    </td>

                                </tr>

                            ))

                        ) : (

                            <tr>

                                <td colSpan="7">
                                    No employees found
                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>
            </div>

        </div>

    );

}

export default EmployeeList;
