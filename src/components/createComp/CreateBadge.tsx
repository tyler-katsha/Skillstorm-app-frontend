import React, { useState } from 'react';
import styles from '../../module/CreateBadge.module.css';
import type { Kind } from '../../types/type';
import type { BadgeRequest, CreateBadgeProps } from '../../types/badge';
import { getToken } from '../../utils/Utils';
import { API } from '../../utils/API';
import { useNavigate } from 'react-router-dom';
import { handleHttpErrors } from '../../utils/httpUtils';
import { useToast } from '../../contexts/ToastContext';

export const CreateBadge: React.FC<CreateBadgeProps> = ({ onClose, onRefresh }) => {

    const navigate = useNavigate();
    const { showToast } = useToast();
    const [formData, setFormData] = useState<BadgeRequest>({
        definitionId: '',
        title: '',
        description: '',
        icon: '🏆',
        kind: 'GAMES' as Kind,
        goal: 1,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
        const token = getToken();
        const response = await fetch(`${API}/badges`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        });

        if(handleHttpErrors(response.status,navigate,showToast)) return;

        if (!response.ok) {
            const errorText = await response.text(); 
            showToast(errorText,'error');
            return;
        } 
        onClose(); 
        onRefresh();
    } catch (error) {
        showToast('Network error occurred','error');
    }
};

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            
            <div className={styles.createPage} onClick={(e) => e.stopPropagation()}>
                
                <section className={styles.intro}>
                    <div>
                        <div className={styles.eyebrow}>ADMINISTRATION</div>
                        <h1>Create a Badge<span>.</span></h1>
                        <p>Design a new milestone and set the goals required to unlock it.</p>
                    </div>
                </section>

                <form className={styles.formContainer} onSubmit={handleSubmit}>
                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label htmlFor="title">Badge Title</label>
                            <input 
                                type="text" 
                                id="title" 
                                name="title" 
                                placeholder="e.g. Master Strategist" 
                                value={formData.title} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        
                        <div className={styles.formGroup}>
                            <label htmlFor="definitionId">Definition ID</label>
                            <input 
                                type="text" 
                                id="definitionId" 
                                name="definitionId" 
                                placeholder="e.g. badge_master_strat" 
                                value={formData.definitionId} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="description">Description</label>
                        <textarea 
                            id="description" 
                            name="description" 
                            rows={3} 
                            placeholder="Explain what the player needs to do to earn this..." 
                            value={formData.description} 
                            onChange={handleChange} 
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
                                placeholder="Enter a emoji as a icon" 
                                value={formData.icon} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="kind">Tracking Metric (Kind)</label>
                            <div className={styles.selectWrapper}>
                                <select id="kind" name="kind" value={formData.kind} onChange={handleChange}>
                                    <option value="GAMES">Games Played</option>
                                    <option value="WINS">Wins</option>
                                    <option value="HIGH_SCORES">High Scores</option>
                                    <option value="PERFECT">Perfect Scores</option>
                                    <option value="TOPICS">Unique Topics</option>
                                    <option value="LEADERBOARD">Leaderboard</option>
                                </select>
                            </div>
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
                                required 
                            />
                        </div>
                    </div>

                    <div className={styles.formActions}>
                        <button type="button" className={styles.cancelBtn} onClick={onClose}>Cancel</button>
                        <button type="submit" className={styles.submitBtn}>Create Badge</button>
                    </div>
                </form>
            </div>
        </div>
    );
}