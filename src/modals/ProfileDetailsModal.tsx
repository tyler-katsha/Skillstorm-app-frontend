import { useState } from "react";
import { useUser } from "../contexts/UserContext";
import styles from "../module/ProfileDetailsModal.module.css";
import { getToken, trim } from "../utils/Utils";
import { API } from "../utils/API";
import type { ProfileDetailsModalProps } from "../types/user";
import { useToast } from "../contexts/ToastContext";


export const ProfileDetailsModal: React.FC<ProfileDetailsModalProps> = ({ isOpen, onClose }) => {
    const { user, setUser } = useUser();
    const { showToast } = useToast();

    const [isEditingUsername, setIsEditingUsername] = useState(false);
    const [newUsername, setNewUsername] = useState(user?.username || "");
    const [isUpdating, setIsUpdating] = useState(false);

    if (!isOpen || !user) return null;

    const handleUpdateUsername = async () => {
        if(!trim(newUsername) || newUsername === user.username) {
            setIsEditingUsername(false);
            return;
        }

        setIsUpdating(true);

        const token = getToken();
        try {
            const response = await fetch(`${API}/users`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({username: newUsername})
            });

            if (!response.ok) {
            const errorData = await response.text(); 

            showToast(errorData ?? 'Failed to update on server','error');
            setNewUsername(user.username);
            return;
        }
            setIsEditingUsername(false);

            if(setUser) {
                setUser({...user,username: newUsername})
            }
            showToast("Username updated successfully!", "success");
        } catch(err) {
            showToast('Network Error occurred','error');
            setNewUsername(user.username);
        } finally {
            setIsUpdating(false);
        }
    };

    const handleClose = () => {
        setIsEditingUsername(false);
        setNewUsername(user.username);
        onClose();
    } 

    return (
        <div className={styles.modalOverlay} onClick={handleClose}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h2>Profile Details</h2>
                    <button className={styles.closeButton} onClick={handleClose}>&times;</button>
                </div>

                <div className={styles.detailsList}>
                    
                    <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Username</span>
                        
                        {isEditingUsername ? (
                            <div className={styles.editActionGroup}>
                                <input 
                                    type="text" 
                                    className={styles.usernameInput}
                                    value={newUsername}
                                    onChange={(e) => setNewUsername(e.target.value)}
                                    disabled={isUpdating}
                                    autoFocus
                                />
                                <button 
                                    className={styles.saveBtn} 
                                    onClick={handleUpdateUsername}
                                    disabled={isUpdating}
                                >
                                    {isUpdating ? '...' : 'Save'}
                                </button>
                                <button 
                                    className={styles.cancelBtn} 
                                    onClick={() => {
                                        setIsEditingUsername(false);
                                        setNewUsername(user.username);
                                    }}
                                    disabled={isUpdating}
                                >
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <div className={styles.valueActionGroup}>
                                <span className={styles.detailValue}>{user.username}</span>
                                <button 
                                    className={styles.editBtn} 
                                    onClick={() => setIsEditingUsername(true)}
                                >
                                    Edit
                                </button>
                            </div>
                        )}
                    </div>

                    <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Email</span>
                        <span className={styles.detailValue}>{user.email}</span>
                    </div>
                    <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>XP Points</span>
                        <span className={styles.detailValue}>{user.xp}</span>
                    </div>
                    <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Level</span>
                        <span className={styles.detailValue}>{user.level}</span>
                    </div>
                    <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Joined</span>
                        <span className={styles.detailValue}>
                            {new Date(user.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                    <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Auth Provider</span>
                        <span className={styles.detailValue} style={{ textTransform: 'capitalize' }}>
                            {user.authProvider}
                        </span>
                    </div>
                    <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Roles</span>
                        <div className={styles.rolesContainer}>
                            {user.roles?.map((role, idx) => (
                                <span key={idx} className={styles.roleBadge}>{role}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};