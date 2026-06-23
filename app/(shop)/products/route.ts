import { inArray } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { products } from '@/lib/db/schema';

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const ids = searchParams.get('ids')?.split(',') || [];

	if (ids.length === 0) return NextResponse.json([]);

	const result = await db.query.products.findMany({
		where: inArray(products.id, ids),
	});

	return NextResponse.json(result);
}
