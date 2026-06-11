import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const role = localStorage.getItem("role");

    const fetchUsers = async () => {
        const res = await API.get("/users");
        setUsers(res.data);
    };

    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("userId");

        navigate("/");
    };

    const updateProfile = async () => {
        try {
            const res = await API.put("/auth/profile", {
                name,
                email
            });

            alert(res.data.message);
        } catch (err) {
            alert("Profile update failed");
        }
    };

    const updateSalary = async (id) => {
        const salary = prompt("Enter new salary");

        try {
            await API.put(`/users/${id}/salary`, { salary });
            alert("Salary updated");
        } catch (err) {
            alert("Failed to update salary");
        }
    };

    const deleteUser = async (id) => {
        try {
            await API.delete(`/users/${id}`);
            alert("User deleted");
            fetchUsers();
        } catch (err) {
            alert("Delete failed");
        }
    };

    const changePassword = async () => {
        try {
            const res = await API.put("/auth/change-password", {
                oldPassword,
                newPassword
            });

            alert(res.data.message);
        } catch (err) {
            alert("Password change failed");
        }
    };

    // --- Premium Minimalist UI Styling ---
    const styles = {
        wrapper: {
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            backgroundColor: "#f8fafc",
            minHeight: "100vh",
            color: "#1e293b",
            padding: "2rem 1.5rem"
        },
        container: {
            maxWidth: "1200px",
            margin: "0 auto"
        },
        header: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: "1.5rem",
            marginBottom: "2rem",
            borderBottom: "1px solid #e2e8f0"
        },
        title: {
            fontSize: "1.75rem",
            fontWeight: "700",
            margin: 0,
            letterSpacing: "-0.025em",
            color: "#1e293b" // Added explicit dark color for header
        },
        badge: {
            fontSize: "0.75rem",
            textTransform: "uppercase",
            padding: "0.25rem 0.75rem",
            borderRadius: "9999px",
            backgroundColor: role === "admin" ? "#fef2f2" : role === "manager" ? "#eff6ff" : "#f1f5f9",
            color: role === "admin" ? "#ef4444" : role === "manager" ? "#3b82f6" : "#64748b",
            fontWeight: "600",
            marginLeft: "0.75rem",
            border: `1px solid ${role === "admin" ? "#fca5a5" : role === "manager" ? "#93c5fd" : "#cbd5e1"}`
        },
        logoutBtn: {
            backgroundColor: "#ffffff",
            color: "#ef4444",
            border: "1px solid #fee2e2",
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            fontWeight: "500",
            cursor: "pointer",
            transition: "all 0.2s",
            boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
        },
        grid: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1.5rem"
        },
        card: {
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            padding: "1.5rem",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
            border: "1px solid #f1f5f9"
        },
        cardTitle: {
            fontSize: "1.25rem",
            fontWeight: "600",
            marginTop: 0,
            marginBottom: "1.25rem",
            color: "#0f172a"
        },
        inputGroup: {
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            marginBottom: "1.25rem"
        },
        input: {
            padding: "0.75rem",
            borderRadius: "8px",
            border: "1px solid #cbd5e1",
            fontSize: "0.95rem",
            outline: "none",
            backgroundColor: "#f8fafc",
            color: "#1e293b", // FIX: Forces the input text to be dark and visible
            transition: "border-color 0.2s"
        },
        btnPrimary: {
            backgroundColor: "#4f46e5",
            color: "#ffffff",
            border: "none",
            padding: "0.75rem",
            borderRadius: "8px",
            fontWeight: "600",
            cursor: "pointer",
            width: "100%",
            transition: "background-color 0.2s"
        },
        userList: {
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem"
        },
        userRow: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0.75rem 1rem",
            backgroundColor: "#f8fafc",
            borderRadius: "8px",
            border: "1px solid #f1f5f9",
            color: "#1e293b" // Added explicit dark color for row text
        },
        userInfo: {
            fontWeight: "500",
            fontSize: "0.95rem"
        },
        userRole: {
            fontSize: "0.8rem",
            color: "#64748b",
            marginLeft: "0.5rem"
        },
        actionGroup: {
            display: "flex",
            gap: "0.5rem"
        },
        btnAction: {
            padding: "0.4rem 0.75rem",
            borderRadius: "6px",
            fontSize: "0.85rem",
            fontWeight: "500",
            cursor: "pointer",
            border: "1px solid #e2e8f0",
            backgroundColor: "#ffffff",
            color: "#334155"
        },
        btnDelete: {
            padding: "0.4rem 0.75rem",
            borderRadius: "6px",
            fontSize: "0.85rem",
            fontWeight: "500",
            cursor: "pointer",
            border: "1px solid #fee2e2",
            backgroundColor: "#fff5f5",
            color: "#e53e3e"
        }
    };

    return (
        <div style={styles.wrapper}>
            <div style={styles.container}>
                
                {/* HEADER */}
                <header style={styles.header}>
                    <h2 style={styles.title}>
                        Dashboard 
                        <span style={styles.badge}>{role || "Guest"}</span>
                    </h2>
                    <button 
                        onClick={handleLogout} 
                        style={styles.logoutBtn}
                        onMouseOver={(e) => e.target.style.backgroundColor = "#fff5f5"}
                        onMouseOut={(e) => e.target.style.backgroundColor = "#ffffff"}
                    >
                        Logout
                    </button>
                </header>

                {/* MAIN GRID */}
                <div style={styles.grid}>
                    
                    {/* PROFILE CARD */}
                    <div style={styles.card}>
                        <h3 style={styles.cardTitle}>Profile Settings</h3>
                        <div style={styles.inputGroup}>
                            <input 
                                style={styles.input}
                                placeholder="Name" 
                                value={name}
                                onChange={(e) => setName(e.target.value)} 
                            />
                            <input 
                                style={styles.input}
                                placeholder="Email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                        </div>
                        <button 
                            onClick={updateProfile} 
                            style={styles.btnPrimary}
                            onMouseOver={(e) => e.target.style.backgroundColor = "#4338ca"}
                            onMouseOut={(e) => e.target.style.backgroundColor = "#4f46e5"}
                        >
                            Update Profile
                        </button>
                    </div>

                    {/* PASSWORD CARD */}
                    <div style={styles.card}>
                        <h3 style={styles.cardTitle}>Security</h3>
                        <div style={styles.inputGroup}>
                            <input 
                                type="password" 
                                style={styles.input}
                                placeholder="Old Password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)} 
                            />
                            <input 
                                type="password" 
                                style={styles.input}
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)} 
                            />
                        </div>
                        <button 
                            onClick={changePassword} 
                            style={styles.btnPrimary}
                            onMouseOver={(e) => e.target.style.backgroundColor = "#4338ca"}
                            onMouseOut={(e) => e.target.style.backgroundColor = "#4f46e5"}
                        >
                            Change Password
                        </button>
                    </div>

                    {/* MANAGER VIEW */}
                    {(role === "manager") && (
                        <div style={{...styles.card, gridColumn: "1 / -1"}}>
                            <h3 style={styles.cardTitle}>Employee Directory</h3>
                            <div style={styles.userList}>
                                {users.map(u => (
                                    <div key={u._id} style={styles.userRow}>
                                        <span style={styles.userInfo}>
                                            {u.name} <span style={styles.userRole}>({u.role})</span>
                                        </span>
                                        <button 
                                            onClick={() => updateSalary(u._id)}
                                            style={styles.btnAction}
                                            onMouseOver={(e) => e.target.style.backgroundColor = "#f8fafc"}
                                            onMouseOut={(e) => e.target.style.backgroundColor = "#ffffff"}
                                        >
                                            Update Salary
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ADMIN VIEW */}
                    {role === "admin" && (
                        <div style={{...styles.card, gridColumn: "1 / -1"}}>
                            <h3 style={styles.cardTitle}>User Management Panel</h3>
                            <div style={styles.userList}>
                                {users.map(u => (
                                    <div key={u._id} style={styles.userRow}>
                                        <span style={styles.userInfo}>
                                            {u.name} <span style={styles.userRole}>({u.role})</span>
                                        </span>
                                        <div style={styles.actionGroup}>
                                            <button 
                                                onClick={() => updateSalary(u._id)}
                                                style={styles.btnAction}
                                                onMouseOver={(e) => e.target.style.backgroundColor = "#f8fafc"}
                                                onMouseOut={(e) => e.target.style.backgroundColor = "#ffffff"}
                                            >
                                                Update Salary
                                            </button>
                                            <button 
                                                onClick={() => deleteUser(u._id)}
                                                style={styles.btnDelete}
                                                onMouseOver={(e) => e.target.style.backgroundColor = "#fee2e2"}
                                                onMouseOut={(e) => e.target.style.backgroundColor = "#fff5f5"}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}