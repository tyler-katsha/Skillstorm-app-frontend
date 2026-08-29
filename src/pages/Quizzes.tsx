import { useEffect, useMemo, useState } from "react";
import styles from "../module/QuizPage.module.css";
import { API } from "../utils/API";
import { type QuizProps } from "../utils/type";
import { formatTopicNames, getToken } from "../utils/Utils";
import { Quiz } from "../components/Quiz";
import { useUser } from "../contexts/UserContext";
import { RedirectUser } from "../components/RedirectUser";

export const QuizPage = () => {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [quizzes, setQuizzes] = useState<QuizProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeQuiz, setActiveQuiz] = useState<QuizProps | null>(null);

    const { user } = useUser();

    if (!user) {
        <RedirectUser />
    }

    // Dynamically derive unique categories from the fetched quizzes
    const categories = useMemo(() => {
        const uniqueTopics = new Set<string>();
        quizzes.forEach((item) => {
            item.topicNames?.forEach((topic) => uniqueTopics.add(topic));
        });
        return ["All", ...Array.from(uniqueTopics)];
    }, [quizzes]);

    const filteredQuizzes = useMemo(() => {
        return quizzes.filter((item) => {
            const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
            const matchesCategory = category === "All" || item.topicNames.includes(category);

            return matchesSearch && matchesCategory;
        });
    }, [quizzes, search, category]);

    const startQuiz = (selectedQuiz: QuizProps) => {
        setActiveQuiz(selectedQuiz);
    };

    const fetchQuizzes = async () => {
        try {
            setLoading(true);
            const token = getToken();

            const response = await fetch(`${API}/quizzes`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error("No quizzes found");
            }

            const data: QuizProps[] = await response.json();

            setQuizzes(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuizzes();
    }, []);

    if (activeQuiz) {
        return (
            <div>
                <button onClick={() => setActiveQuiz(null)} style={{ margin: "1rem", cursor: "pointer" }} className={styles.startButton}>
                    ← Back to Quizzes
                </button>
                <Quiz sampleQuiz={activeQuiz} sampleUser={user} />
            </div>
        );
    }

    return (
        <main className={styles.page}>
            <div className={styles.header}>
                <div>
                    <h1>Quizzes</h1>
                    <p>Explore quizzes, test your knowledge, and challenge yourself.</p>
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
                    <label htmlFor="category-select">Category</label>
                    <select
                        id="category-select"
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

            {loading ? (
                <div className={styles.empty}>
                    <p>Loading quizzes...</p>
                </div>
            ) : filteredQuizzes.length > 0 ? (
                <section className={styles.quizGrid}>
                    {filteredQuizzes.map((item, index) => (
                        <article className={styles.quizCard} key={item.title + index}>
                            <div className={styles.cardTop}>
                                <span className={styles.category}>
                                    {formatTopicNames(item.topicNames)}
                                </span>
                                <span className={`${styles.difficulty} ${styles[item.difficulty.toLowerCase()]}`}>
                                    {item.difficulty}
                                </span>
                            </div>

                            <div className={styles.quizContent}>
                                <h3>{item.title}</h3>
                                <p>{formatTopicNames(item.topicNames)}</p>

                                <div className={styles.quizInfo}>
                                    <span><strong>{item.questions.length}</strong> Questions</span>
                                    <span>•</span>
                                    <span>{item.difficulty}</span>
                                </div>
                            </div>

                            <div className={styles.cardFooter}>
                                <button className={styles.startButton} onClick={() => startQuiz(item)}>
                                    Start Quiz →
                                </button>
                            </div>
                        </article>
                    ))}
                </section>
            ) : (
                <div className={styles.empty}>
                    <h3>No quizzes found</h3>
                    <p>Try changing your search or selecting another category.</p>
                </div>
            )}
        </main>
    );
};