import type { QuestionData } from '$lib/item';
import quiz from '../../quiz.json';
export const prerender = true;
export function entries() {
	return quiz.map((item) => ({
		quiz: item.short
	}));
}

export async function load({
	fetch,
	params
}){
	const res = await fetch(`/${params.quiz}.json`);
	if (!res.ok) {
		return {
			status: 404,
			error: new Error(`Failed to fetch quiz data for ${params.quiz}`)
		};
	}
	const item: QuestionData[] = await res.json();
	return { item };
}
