import { FullConversationType } from '../types';
import { getCurrentUser } from './getCurrentUser';

const getConversations = async (): Promise<
	FullConversationType[] | undefined | never[]
> => {
	const currentUser = await getCurrentUser();

	if (!currentUser) return [];

	try {
		const conversations = await prisma?.conversation.findMany({
			orderBy: {
				lastMessageAt: 'desc',
			},
			where: {
				userIds: {
					has: currentUser.id,
				},
			},
			include: {
				users: true,
				messages: {
					include: {
						sender: true,
						seen: true,
					},
				},
			},
		});

		return conversations as FullConversationType[];
	} catch (error: any) {
		return [];
	}
};

export default getConversations;
