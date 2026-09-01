import { useEffect, useState } from "react";
import { addEmployee, getEmployeeById, updateEmployee } from "../services/employeeService";
import "./EmployeeForm.css";
function EmployeeForm({ employeeId, onSaved, onCancel }) {

    const [employee, setEmployee] = useState({
        employeeId: "",
        name: "",
        email: "",
        phone: "",
        department: "",
        designation: "",
        joiningDate: "",
        profilePhotoUrl: ""
    });
    const [photoPreview, setPhotoPreview] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (employeeId) {
            loadEmployee();
        }

    }, [employeeId]);

    const loadEmployee = async () => {

        try {
            const response = await getEmployeeById(employeeId);
            setEmployee(response.data);
        } catch (error) {
            console.error("Error loading employee:", error);
        }
    };

    const handleChange = (event) => {

        const { name, value } = event.target;

        setEmployee({
            ...employee,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {

        event.preventDefault();
        setLoading(true);

        try {

            if (employeeId) {
                await updateEmployee(employeeId, employee);
                alert("Employee updated successfully!");
            } else {
                await addEmployee(employee);
                alert("Employee added successfully!");
            }

            onSaved();

        } catch (error) {

            console.error("Error saving employee:", error);
            alert("Failed to save employee.");

        } finally {
            setLoading(false);
        }
    };

return (
    <div className="employee-form-page">

        <div className="employee-form-container">

            <div className="form-header">

                <h2>
                    {employeeId
                        ? "Edit Employee"
                        : "Add Employee"}
                </h2>

                <p>
                    {employeeId
                        ? "Update employee information"
                        : "Add a new employee to the organization"}
                </p>

            </div>


            <form
                className="employee-form"
                onSubmit={handleSubmit}
            >

                <div className="form-group">

                    <label>
                        Employee ID
                    </label>

                    <input
                        type="text"
                        name="employeeId"
                        value={employee.employeeId}
                        onChange={handleChange}
                        placeholder="EMP001"
                        required
                    />

                </div>


                <div className="form-group">

                    <label>
                        Full Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        value={employee.name}
                        onChange={handleChange}
                        placeholder="Enter employee name"
                        required
                    />

                </div>


                <div className="form-group">

                    <label>
                        Email
                    </label>

                    <input
                        type="email"
                        name="email"
                        value={employee.email}
                        onChange={handleChange}
                        placeholder="employee@example.com"
                        required
                    />

                </div>


                <div className="form-group">

                    <label>
                        Phone
                    </label>

                    <input
                        type="text"
                        name="phone"
                        value={employee.phone}
                        onChange={handleChange}
                        placeholder="9876543210"
                    />

                </div>


                <div className="form-group">

                    <label>
                        Department
                    </label>

                    <input
                        type="text"
                        name="department"
                        value={employee.department}
                        onChange={handleChange}
                        placeholder="IT"
                    />

                </div>


                <div className="form-group">

                    <label>
                        Designation
                    </label>

                    <input
                        type="text"
                        name="designation"
                        value={employee.designation}
                        onChange={handleChange}
                        placeholder="Software Developer"
                    />

                </div>


                <div className="form-group">

                    <label>
                        Joining Date
                    </label>

                    <input
                        type="date"
                        name="joiningDate"
                        value={employee.joiningDate}
                        onChange={handleChange}
                    />

                </div>


                <div className="photo-section">

                    <label>
                        Profile Photo
                    </label>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {

                            const file =
                                e.target.files[0];

                            if (file) {

                                const imageUrl =
                                    URL.createObjectURL(file);

                                setPhotoPreview(imageUrl);

                            }

                        }}
                    />


                    {photoPreview && (

                        <img
                            className="photo-preview"
                            src={photoPreview}
                            alt="Profile Preview"
                        />

                    )}

                </div>


                <div className="form-actions">

                    <button
                        type="button"
                        className="cancel-button"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>


                    <button
                        type="submit"
                        className="save-button"
                        disabled={loading}
                    >

                        {loading
                            ? "Saving..."
                            : employeeId
                                ? "Update Employee"
                                : "Add Employee"}

                    </button>

                </div>

            </form>

        </div>

    </div>
);

}

export default EmployeeForm;