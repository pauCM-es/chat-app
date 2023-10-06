import prisma from '@/app/libs/prismadb';

const getMessages = (conversationID: string) => {
	try {
		const messages = prisma.message.findMany({
			where: {
				conversationId: { equals: [conversationID] },
			},
			include: {
				sender: true,
				seen: true,
			},
			orderBy: {
				createdAt: 'asc',
			},
		});

		return messages;
	} catch (error) {
		return [];
	}
};

export default getMessages;
