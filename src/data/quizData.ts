import type { CardData } from "../types/card";
import type { QuizData } from "../types/quiz";

export const quizData: CardData[] = [
    { title: 'Data Structure', text: 'Diffculty: Hard', numOfQuestions: 12 },
    { title: 'SQL Fundamentals', text: 'Diffculty: Medium', numOfQuestions: 10 },
    { title: 'ERD and DB Design', text: 'Diffculty: Hard', numOfQuestions: 8 },
    { title: 'JavaScript Basics', text: 'Diffculty: Easy', numOfQuestions: 15 },
]

export const sampleQuiz: QuizData = {
    "title": "Polymorphism in Java",
    "questions": [
        {
            "text": "Which of these cannot be inherited by a subclass?",
            "options": ["The superclass's public instance methods", "The superclass's private fields", "The superclass's protected fields", "The superclass's final static methods"],
            "correctOption": 1
        },
        {
            "text": "The method `makeSound` is defined in both `Animal` and a subclass of `Animal`, `Dog`. Which polymorphism technique does this method illustrate?",
            "options": ["overriding", "overloading", "overflowing", "overwriting"],
            "correctOption": 0
        },
        {
            "text": "Which of the following statements is true of a class declared `final`?",
            "options": ["Final classes cannot have instance methods", "Final classes can only have final members", "Final classes cannot have static methods", "Final classes cannot be extended"],
            "correctOption": 3
        },
        {
            "text": "True or false: Abstract methods must have method bodies.",
            "options": ["True", "False"],
            "correctOption": 1
        },
        {
            "text": "Which Java keyword can be used in a class declaration to derive a subclass from an existing class?",
            "options": ["final", "int", "extends", "class", "implements", "new"],
            "correctOption": 2
        },
        {
            "text": "Which Java keyword can be used in a method declaration to prevent a method from being overriden in a subclass?",
            "options": ["public", "static", "final", "abstract"],
            "correctOption": 2
        },
    ]
}