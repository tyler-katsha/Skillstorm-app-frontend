// § Imports §
import { useState, Fragment } from 'react';
// TODO: Replace SampleData with API calls
import { sampleQuiz, sampleUser } from '../utils/MockData.ts';
import { roundN, pluralS, OptionState, type OptionStateT } from '../utils/Utils.ts';
import styles from '../module/Quiz.module.css';

// ======================== Constants & variables =========================
/**
 * The value of the user configuration option "Quick Select",
 * which determines whether the "Check answer" button is shown, or if
 * clicking on an option causes the question to submit immediately.
 */
const QUICK_SELECT = sampleUser.options.quick_select;

// ============================== Components ==============================
type ProgressbarsProps = {
    answered: number;
    total: number;
    currentLevel: number;
    currentXp: number;
    nextLevelXp: number;
};

export const Progressbars = (props: ProgressbarsProps) => {
    const { answered, total, currentLevel, currentXp, nextLevelXp } = props;
    const quizProgress = Math.round(100 * (answered / total));
    const levelProgress = Math.round(100 * (currentXp / nextLevelXp));
    const unanswered = total - answered;
    let questionsToGo;
    if (unanswered >= 1) {
        questionsToGo = (
            <>
                <span className={styles.bigger}>{unanswered} </span>
                <span>question{pluralS(unanswered)} to go</span>
            </>
        );
    } else {
        questionsToGo = <span>Last question!</span>;
    }

    return (
        <div className={styles.pbars}>
            <div
                className={styles.xpPbar}
                style={{
                    backgroundImage: `linear-gradient(90deg, var(--ink) ${levelProgress}%, var(--guardsman-red) ${levelProgress}%)`,
                }}
            >
                <span className={styles.pbarLeftText}>
                    {currentXp} / {nextLevelXp}
                </span>
                <span className={styles.pbarRightText}>Level {currentLevel}</span>
            </div>
            <div
                className={styles.quizPbar}
                style={{
                    backgroundImage: `linear-gradient(90deg, var(--ink) ${quizProgress}%, var(--guardsman-red) ${quizProgress}%)`,
                }}
            >
                <span className={styles.pbarLeftText}>
                    <span className={styles.smaller}>Question </span>
                    <span className={styles.bigger}>{answered}</span>
                </span>
                <span className={styles.pbarRightText}>{questionsToGo}</span>
            </div>
        </div>
    );
};

type QuestionTextboxProps = {
    content: string;
};

export const QuestionTextbox = (props: QuestionTextboxProps) => {
    const { content } = props;
    return <p className={styles.questionTextbox}>{content}</p>;
};

type QuestionOptionProps = {
    label: string;
    selected: boolean;
    state: OptionStateT;
    myOnClick: (label: string) => void;
};

export const QuestionOption = (props: QuestionOptionProps) => {
    const OptSt = OptionState; // alias for brevity
    const { label, selected, state, myOnClick } = props;
    if (!Object.values(OptSt).includes(state)) {
        const errmsg = `Invalid value "${String(state)}" for \`state\` prop, expected a value from OptionState.`;
        throw new TypeError(errmsg);
    }
    const disabled = state !== OptSt.POSSIBLE;
    const [hovering, setHovering] = useState(false);

    function getBackgroundColor() {
        const colors = {
            // TODO: Replace this green with a more on-brand colour from the palette.
            [OptSt.CORRECT]: "lightgreen",
            [OptSt.INCORRECT]: "hsl(from var(--guardsman-red) h s 70%)",
            [OptSt.UNSELECTED]: "lightgray",
            [OptSt.POSSIBLE]: "var(--corn-silk)",
        };
        const color = colors[state];
        return hovering ? `hsl(from ${color} h s 80%)` : color;
    }

    return (
        <button
            type="button"
            onMouseOver={() => setHovering(true)}
            onMouseOut={() => setHovering(false)}
            onClick={() => {
                myOnClick(label);
            }}
            disabled={disabled}
            className={styles.quizOptionButton}
            style={{
                border: selected ? "2px solid #2563eb" : "2px solid transparent",
                background: getBackgroundColor(),
                cursor: disabled ? "not-allowed" : "pointer",
            }}
        >
            {label}
        </button>
    );
};

type SubmitButtonProps = {
    label: string;
    disabled: boolean;
    myOnClick: () => void;
};

export const SubmitButton = (props: SubmitButtonProps) => {
    const { label, disabled, myOnClick } = props;
    const [hovering, setHovering] = useState(false);
    const getStyle = () => ({
        backgroundColor: hovering && !disabled ? "#EEE" : "#DDD",
    });

    return (
        <button
            type="button"
            onMouseOver={() => setHovering(true)}
            onMouseOut={() => setHovering(false)}
            disabled={disabled}
            onClick={myOnClick}
            className={styles.submitButton}
            style={getStyle()}
        >
            {label}
        </button>
    );
};

type CongratsProps = {
    correct: number;
    total: number;
};

export const Congrats = (props: CongratsProps) => {
    const { correct, total } = props;
    const percentage = roundN((100 * correct) / total, 2);
    return (
        <div className={styles.congratsBlock}>
            <span>Congratulations!</span>
            <span>
                You answered <span className={styles.congratsFraction}>{correct} / {total}</span> (
                <span className={styles.congratsPercentage}>{percentage}%</span>) questions correctly.
            </span>
        </div>
    );
};

// TODO: Finish styling `Congratulations`
// TODO: Implement `QuizPageBG`

export const QuizPageBG = () => {
    throw new (class NotImplementedError {})();
};

export const Quiz = () => {
    const [questionIdx, setQuestionIdx] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedIdx, setSelectedIdx] = useState(-1);
    const [isAnswering, setAnswering] = useState(true);

    if (questionIdx >= sampleQuiz.questions.length) {
        return <Congrats correct={score} total={sampleQuiz.questions.length} />;
    }

    function getBtnState(index: number) {
        if (isAnswering) {
            return OptionState.POSSIBLE;
        } else if (index === sampleQuiz.questions[questionIdx].correctOption) {
            return OptionState.CORRECT;
        } else if (index === selectedIdx) {
            return OptionState.INCORRECT;
        } else {
            return OptionState.UNSELECTED;
        }
    }

    function doSubmit() {
        if (!isAnswering) {
            setScore(score + (getBtnState(selectedIdx) === OptionState.CORRECT ? 1 : 0));
            setSelectedIdx(-1);
            setQuestionIdx((x) => x + 1);
        }
        setAnswering(!isAnswering);
    }

    function doSelect(index: number) {
        if (QUICK_SELECT) {
            doSubmit();
            setSelectedIdx(-1);
        } else {
            setSelectedIdx(selectedIdx !== index ? index : -1);
        }
    }

    const submitButton = (
        <SubmitButton
            label={isAnswering ? "Check answer" : "Next question"}
            disabled={selectedIdx === -1}
            myOnClick={() => {
                doSubmit();
            }}
        />
    );

    const quizContentComp = (
        <div className={styles.pageRoot}>
            <Progressbars
                answered={questionIdx + 1}
                total={sampleQuiz.questions.length}
                currentLevel={sampleUser.level}
                currentXp={sampleUser.xp}
                nextLevelXp={sampleUser.xpGoal}
            />
            <QuestionTextbox content={sampleQuiz.questions[questionIdx].text} />
            <div>
                {sampleQuiz.questions[questionIdx].options.map((v, i) => (
                    <Fragment key={i}>
                        <QuestionOption
                            label={v}
                            selected={selectedIdx === i}
                            state={getBtnState(i)}
                            myOnClick={() => doSelect(i)}
                        />
                        <hr className={styles.divider} />
                    </Fragment>
                ))}
            </div>
            {QUICK_SELECT ? null : submitButton}
        </div>
    );

    return quizContentComp;
};