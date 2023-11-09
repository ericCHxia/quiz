export type Item = {
	label: string;
	value: any;
};

export type ItemList = Item[] | string[];

interface MatchingAnswer {
	text: string;
	matching: string;
}

export interface MatchingData {
	type: "matching_question";
	text: string;
	answers: MatchingAnswer[];
	matching_list: string[];
}

interface ChoiceAnswer {
	correct: boolean;
	answer_text: string;
}

export interface ChoiceData {
	type: "multiple_choice_question"|"multiple_answers_question"|"true_false_question";
	text: string;
	answers: ChoiceAnswer[];
}

interface DropDownAnswer {
	label: string;
	value: string;
}

export interface DropDownData {
	type: "multiple_dropdowns_question";
	text: string;
	answers: DropDownAnswer[];
}

export type QuestionData = MatchingData | ChoiceData | DropDownData;