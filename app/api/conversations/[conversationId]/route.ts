import getConversationById from '@/app/actions/getConversationById';
import { getCurrentUser } from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import { pusherServer } from '@/app/libs/pusher';

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

		existingConversation.users.forEach((user) => {
			if (user.email) {
				pusherServer.trigger(
					user.email,
					'conversation:delete',
					existingConversation //using this instead of deleteConversation due to BUG
				);
			}
		});

		return NextResponse.json(deleteConversation);
	} catch (error) {
		console.log(error);

		return new NextResponse('Internal Error', { status: 500 });
	}
};
