import { emptyArrayOfStrings } from "./array";
import type { QuestionData } from "./question";
import type { ToastResponse } from "./type";

export const APP_NAME = 'SkillStorm';

export const DEFAULT_LOGIN = {
    email: "",
    password: ""
}

export const DEFAULT_QUESTION: QuestionData = {
    text: "",
    correctOption: 0,
    score: 10,
    description: "",
    options: emptyArrayOfStrings,
    answers: []
};

export const DEFAULT_POPUP = {
    isOpen: false,
    type: 'success' as ToastResponse,
    message: ''
}

export const DEFAULT_REGISTER = {
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
}