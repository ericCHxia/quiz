export const prerender = true;
import quiz from '../quiz.json';

export function load() {
    return { quiz };
}