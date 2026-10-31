import { useState } from 'react';
import styles from '../module/CreateBadge.module.css';
import { getToken } from '../utils/Utils';
import { API } from '../utils/API';
import type { BadgeDetailModalProps } from '../types/badge';

export const BadgeDetailModal: React.FC<BadgeDetailModalProps> = ({ badge, isAdmin, onClose, onRefresh }) => {
    const [formData, setFormData] = useState({
        title: badge.title,
        description: badge.description,
        icon: badge.icon,
        goal: badge.goal
    });
    const [isSaving, setIsSaving] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isAdmin) return;

        setIsSaving(true);
        try {
            const token = getToken();

            const response = await fetch(`${API}/badges/${badge.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...badge, 
                    ...formData 
                })
            });

            if (response.ok) {
                onRefresh(); 
                onClose(); 
            } else {
                const errorText = await response.text();
                alert(`Failed to update: ${errorText}`);
            }
        } catch (error) {
            console.error("Error updating badge:", error);
            alert("Network error.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.createPage} onClick={(e) => e.stopPropagation()}>
                
                <section className={styles.intro}>
                    <div>
                        <div className={styles.eyebrow}>{isAdmin ? 'EDIT BADGE' : 'BADGE DETAILS'}</div>
                        <h1>{badge.icon} {badge.title}<span>.</span></h1>
                        {badge.earned && (
                            <p style={{ color: '#10b981', fontWeight: 600 }}>
                                ✓ Earned on {badge.earnedAt ? new Date(badge.earnedAt).toLocaleDateString() : 'recently'}
                            </p>
                        )}
                    </div>
                </section>

                <form className={styles.formContainer} onSubmit={handleUpdate}>
                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label htmlFor="title">Badge Title</label>
                            <input 
                                type="text" 
                                id="title" 
                                name="title" 
                                value={formData.title} 
                                onChange={handleChange} 
                                disabled={!isAdmin} 
                                required 
                            />
                        </div>
                        
                        <div className={styles.formGroup}>
                            <label>Tracking Metric (Kind)</label>
                            <input type="text" value={badge.kind} disabled />
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="description">Description</label>
                        <textarea 
                            id="description" 
                            name="description" 
                            rows={3} 
                            value={formData.description} 
                            onChange={handleChange} 
                            disabled={!isAdmin} 
                            required 
                        />
                    </div>

                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label htmlFor="icon">Emoji Icon</label>
                            <input 
                                type="text" 
                                id="icon" 
                                name="icon" 
                                value={formData.icon} 
                                onChange={handleChange} 
                                disabled={!isAdmin} 
                                required 
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="goal">Goal Amount</label>
                            <input 
                                type="number" 
                                id="goal" 
                                name="goal" 
                                min="1" 
                                value={formData.goal} 
                                onChange={handleChange} 
                                disabled={!isAdmin} 
                                required 
                            />
                        </div>
                    </div>

                    {!badge.earned && (
                        <div className={styles.formGroup}>
                            <label>Current Progress</label>
                            <div style={{ background: '#f3f4f6', padding: '12px', borderRadius: '8px', fontWeight: 600 }}>
                                {Math.min(badge.currentProgress, badge.goal)} / {badge.goal}
                            </div>
                        </div>
                    )}

                    <div className={styles.formActions}>
                        <button type="button" className={styles.cancelBtn} onClick={onClose}>
                            Close
                        </button>
                        {isAdmin && (
                            <button type="submit" className={styles.submitBtn} disabled={isSaving}>
                                {isSaving ? 'Saving...' : 'Save Changes'}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};