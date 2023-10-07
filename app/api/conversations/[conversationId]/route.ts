import getConversationById from '@/app/actions/getConversationById';
import { getCurrentUser } from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';

interface Params {
	conversationId?: string;
}

export const DELETE = async (
	request: Request,
	{ params }: { params: Params }
) => {
	try {
		const { conversationId } = params;
		const currentUser = await getCurrentUser();

		if (!currentUser?.id) {
			return new NextResponse('Unauthorized', { status: 400 });
		}

		const existingConversation = await prisma.conversation.findUnique({
			where: {
				id: conversationId,
			},
			include: {
				users: true,
			},
		});

		if (!existingConversation) {
			return new NextResponse('Invalid ID', { status: 400 });
		}

		const deleteConversation = await prisma.conversation.deleteMany({
			where: {
				id: conversationId,
				userIds: {
					hasSome: [currentUser.id],
				},
			},
		});

		return NextResponse.json(deleteConversation);
	} catch (error) {
		return new NextResponse('Internal Error', { status: 500 });
	}
};
