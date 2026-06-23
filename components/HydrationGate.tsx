'use client';

import { useEffect } from 'react';

export default function HydrationGate() {
	useEffect(() => {
		document.body.dataset.hydrated = 'true';
	}, []);

	return null;
}
