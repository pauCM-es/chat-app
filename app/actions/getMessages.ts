import prisma from '@/app/libs/prismadb';

const getMessages = (conversationId: any) => {
	try {
		const messages = prisma.message.findMany({
			where: {
				conversationId,
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
