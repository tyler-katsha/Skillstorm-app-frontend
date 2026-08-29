// =============================== Imports ================================
import { Suspense, use, useState } from 'react';
import { roundN, pluralS, OptionState, type OptionStateT, getLevel, getXpGoal } from '../utils/Utils.ts';
import styles from '../module/Quiz.module.css';
import type { QuizData, UserData } from '../utils/type.ts';
import { API } from '../utils/API.ts';

// ======================== Constants & variables =========================


// ============================== Components ==============================
type ProgressbarsProps = {
    answered: number
    total: number
    currentLevel: number,
    currentXp: number
    nextLevelXp: number
}
export function Progressbars(props: ProgressbarsProps) {
    const { answered, total, currentLevel, currentXp, nextLevelXp } = props;
    const quizProgress = Math.round(100 * (answered / total));
    const levelProgress = Math.round(100 * (currentXp / nextLevelXp));
    const unanswered = total - answered;
    let questionsToGo;
    if (unanswered >= 1) {
        questionsToGo = (<>
            <span className="bigger">{unanswered} </span>
            <span>question{pluralS(unanswered)} to go</span>
        </>);
    }
    else {
        questionsToGo = (<span>Last question!</span>);
    }

    return (
        <div className={styles["pbars"]}>
            <div
                className={styles["xp-pbar"]}
                style={{
                    backgroundImage: `linear-gradient(90deg, var(--ink) ${levelProgress}%, var(--guardsman-red) ${levelProgress}%)`
                }}
            >
                <span className={styles["pbar-left-text"]}>
                    {currentXp} / {nextLevelXp}
                </span>
                <span className={styles["pbar-right-text"]}>
                    Level {currentLevel}
                </span>
            </div>
            <div
                className={styles["quiz-pbar"]}
                style={{
                    backgroundImage: `linear-gradient(90deg, var(--ink) ${quizProgress}%, var(--guardsman-red) ${quizProgress}%)`
                }}
            >
                <span className={styles["pbar-left-text"]}>
                    <span className={styles["smaller"]}>Question </span>
                    <span className={styles["bigger"]}>{answered}</span>
                </span>
                <span className={styles["pbar-right-text"]}>
                    {questionsToGo}
                </span>
            </div>
        </div>
    );
}

type QuestionTextboxProps = {
    content: string
};
export function QuestionTextbox(props: QuestionTextboxProps) {
    const { content } = props;
    return (
        <p className={styles["question-textbox"]}>
            {content}
        </p>
    );
}

type QuestionOptionProps = {
    label: string,
    selected: boolean,
    state: OptionStateT,
    myOnClick: (label: string) => void,
};
export function QuestionOption(props: QuestionOptionProps) {
    const OptSt = OptionState; // alias for brevity
    const { label, selected, state, myOnClick } = props;
    if (!(Object.values(OptSt).includes(state))) {
        const errmsg = `Invalid value "${String(state)}" for \`state\` prop, expected a value from OptionState.`;
        throw new TypeError(errmsg);
    }
    const disabled = state != OptSt.POSSIBLE;
    const [hovering, setHovering] = useState(false);

    function getBackgroundColor() {
        const colors = {
            // TODO: Replace this green with a more on-brand colour from the palette.
            [OptSt.CORRECT]: "lightgreen",
            [OptSt.INCORRECT]: "hsl(from var(--guardsman-red) h s 70%)",
            [OptSt.UNSELECTED]: "lightgray",
            [OptSt.POSSIBLE]: "var(--corn-silk)",
        }
        const color = colors[state];
        return hovering ? `hsl(from ${color} h s 80%)` : color;
    }

    return (
        <button
            type="button"
            onMouseOver={() => setHovering(true)}
            onMouseOut={() => setHovering(false)}
            onClick={() => { myOnClick(label) }}
            disabled={disabled}
            className={styles["quiz-option-button"]}
            style={{
                border: selected ? "2px solid #2563eb" : "2px solid transparent",
                background: getBackgroundColor(),
                cursor: disabled ? "not-allowed" : "pointer",
            }}>
            {label}
        </button>
    );
}


type SubmitButtonProps = {
    label: string,
    disabled: boolean,
    myOnClick: () => void
};
export function SubmitButton(props: SubmitButtonProps) {
    const { label, disabled, myOnClick } = props;
    const [ hovering, setHovering ] = useState(false);
    const getStyle = () => ({
        backgroundColor: hovering && !disabled ? "#EEE" : "#DDD",
    });

    return <button
        type="button"
        onMouseOver={() => setHovering(true)}
        onMouseOut={() => setHovering(false)}
        disabled={disabled}
        onClick={myOnClick}
        className={styles["submit-button"]}
        style={getStyle()}>
        {label}
    </button>
}

type CongratsProps = {
    correct: number,
    total: number,
};
export function Congrats(props: CongratsProps) {
    const { correct, total } = props;
    const percentage = roundN(100 * correct / total, 2);
    // TODO: Get the name of this quiz using useContext
    // and put it in the congratulations message
    return <div className={styles["congrats-block"]}>
        <div className={styles["congrats-bg"]}>
            <div className={styles["radgrad-center"]}></div>
        </div>
        <span>Congratulations on completing <strong>this quiz</strong>!</span>
        <span>You answered <span className={styles["congrats-fraction"]}>{correct} / {total}</span> (<span className={styles["congrats-percentage"]}>{percentage}%</span>) questions correctly.</span>
    </div>
}

export function QuizPageBG () {
    return <div></div>;
}

export function QuizLoading() {
    return <div>Loading...</div>;
}

export function QuizPage() {
    const [questionIdx, setQuestionIdx] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedIdx, setSelectedIdx] = useState(-1);
    const [isAnswering, setAnswering] = useState(true);

    // TODO: Return hard-coded "1" values with data from some browser source.
    // For example, the quiz ID could be a URL parameter, and
    // the user ID parameter could be obtained from a session cookie.
    // TODO: Add error handling for failed requests,
    // and Suspense for in-progress requests
    const quizData = use(
        fetch(`${API}/quizzes/1`)
        .then(r => r.json())
        .then(obj => obj as QuizData)
    );
    const userData = use(
        fetch(`${API}/users/1`)
        .then(r => r.json())
        .then(obj => obj as UserData)
    );

    function getBtnState(index: number) {
        if (isAnswering) {
            return OptionState.POSSIBLE;
        }
        else if (quizData.questions[questionIdx].answers[index].is_correct) {
            return OptionState.CORRECT;
        }
        else if (index == selectedIdx) {
            return OptionState.INCORRECT;
        }
        else {
            return OptionState.UNSELECTED;
        }
    }

    // Triggered when the user submits the question,
    // either by pressing "Check answer" or using Quick Select.
    function doSubmit() {
        if (!isAnswering) {
            setScore(score + (getBtnState(selectedIdx) === OptionState.CORRECT ? 1 : 0));
            setSelectedIdx(-1);
            setQuestionIdx(x => x + 1);
        }
        setAnswering(!isAnswering);
    }

    // Triggered when the user selects an option
    function doSelect(index: number) {
        setSelectedIdx(selectedIdx != index ? index : -1);
    }

    const submitButton = (<SubmitButton
        label={isAnswering ? "Check answer" : "Next question"}
        disabled={selectedIdx == -1}
        myOnClick={() => {
            doSubmit();
        }}
    />);

    if (questionIdx >= quizData.questions.length) {
        return (<div className={styles["page-root"]}>
            <Congrats
                correct={score}
                total={quizData.questions.length}
            />
        </div>);
    }

    else {
        return (<div className={styles["page-root"]}>
            <QuizPageBG></QuizPageBG>
            <Progressbars
                answered={questionIdx + 1}
                total={quizData.questions.length}
                currentLevel={getLevel(userData.xp)}
                currentXp={userData.xp}
                nextLevelXp={getXpGoal(userData.xp)}
            ></Progressbars>
            <QuestionTextbox
                content={quizData.questions[questionIdx].question_text}
            ></QuestionTextbox>
            <div>
                {quizData.questions[questionIdx].answers.map((v, i) =>
                    <QuestionOption
                        key={i}
                        label={v.answer_text}
                        selected={selectedIdx == i}
                        state={getBtnState(i)}
                        myOnClick={() => doSelect(i)}
                    ></QuestionOption>
                )}
            </div>
            {submitButton}
        </div>);
    }

}

export function Quiz() {
    return (<Suspense fallback={<QuizLoading/>}>
        <QuizPage></QuizPage>
    </Suspense>);
}
