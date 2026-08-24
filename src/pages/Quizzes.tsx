
import { useMemo, useState } from "react";
import styles from "../module/QuizPage.module.css";
import { quizzes } from "../utils/MockData";


const categories = ["All", "Programming", "Networking", "Database", "Security"];

export const QuizPage = () => {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");

    const filteredQuizzes = useMemo(() => {
        return quizzes.filter((quiz) => {
            const matchesSearch =
                quiz.title.toLowerCase().includes(search.toLowerCase()) ||
                quiz.description.toLowerCase().includes(search.toLowerCase());

            const matchesCategory =
                category === "All" || quiz.category === category;

            return matchesSearch && matchesCategory;
        });
    }, [search, category]);

    return (
        <main className={styles.page}>
            <div className={styles.header}>
                <div>
                    <h1>Quizzes</h1>
                    <p>
                        Explore quizzes, test your knowledge, and challenge
                        yourself.
                    </p>
                </div>

                <button className={styles.createButton}>
                    + Create Quiz
                </button>
            </div>

            <section className={styles.filters}>
                <div className={styles.searchWrapper}>
                    <span className={styles.searchIcon}>⌕</span>

                    <input
                        type="text"
                        placeholder="Search quizzes..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className={styles.categoryWrapper}>
                    <label>Category</label>

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        {categories.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>
            </section>

            <div className={styles.resultsHeader}>
                <h2>All Quizzes</h2>
                <span>{filteredQuizzes.length} quizzes</span>
            </div>

            {filteredQuizzes.length > 0 ? (
                <section className={styles.quizGrid}>
                    {filteredQuizzes.map((quiz) => (
                        <article className={styles.quizCard} key={quiz.id}>
                            <div className={styles.cardTop}>
                                <span className={styles.category}>
                                    {quiz.category}
                                </span>

                                <span
                                    className={`${styles.difficulty} ${
                                        styles[quiz.difficulty.toLowerCase()]
                                    }`}
                                >
                                    {quiz.difficulty}
                                </span>
                            </div>

                            <div className={styles.quizContent}>
                                <h3>{quiz.title}</h3>

                                <p>{quiz.description}</p>

                                <div className={styles.quizInfo}>
                                    <span>
                                        <strong>{quiz.questions}</strong>{" "}
                                        Questions
                                    </span>

                                    <span>•</span>

                                    <span>{quiz.difficulty}</span>
                                </div>
                            </div>

                            <div className={styles.cardFooter}>
                                <div className={styles.creator}>
                                    <div className={styles.avatar}>
                                        {quiz.creator.avatar}
                                    </div>

                                    <div>
                                        <strong>{quiz.creator.name}</strong>
                                        <span>
                                            {quiz.creator.username}
                                        </span>
                                    </div>
                                </div>

                                <button className={styles.startButton}>
                                    Start Quiz →
                                </button>
                            </div>
                        </article>
                    ))}
                </section>
            ) : (
                <div className={styles.empty}>
                    <h3>No quizzes found</h3>
                    <p>
                        Try changing your search or selecting another
                        category.
                    </p>
                </div>
            )}
        </main>
    );
}