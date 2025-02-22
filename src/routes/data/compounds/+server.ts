import { json } from '@sveltejs/kit';
import type { Compound, CompoundData } from '$lib/types';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ fetch }) => {
	const regex = /^(.+?): \["?(.+?)"?\]/gm;

	const rawData = await fetch('https://tokipona.org/compounds.txt').then(res =>
		res.text()
	);
	const glyphs = (await fetch('/glyphs.json').then(res =>
		res.json()
	)) as string[];

	const data: CompoundData = Object.fromEntries(
		[...rawData.matchAll(regex)].map(match => {
			const [, compound, rawUses] = match;

			const uses = Object.fromEntries(
				rawUses.split(', ').map(rawUse => {
					const parts = rawUse.split(' ');
					const count = Number(parts.pop());
					const use = parts.join(' ');

					return [use, count];
				})
			);

			let matches: string[];

			if (compound.includes(' ')) {
				const regex = new RegExp(
					`^${compound
						.split(' ')
						.map(w => `${w}[0-9]?`)
						.join('[-\\^\\*]')}$`,
					'g'
				);

				matches = glyphs.filter(glyph => glyph.match(regex));
			} else {
				matches = [compound];
			}

			const data: [string, Compound] = [compound, { compound, uses }];

			if (matches.length) data[1].glyphs = matches;

			return data;
		})
	);

	return json(data);
};
