import getSession from './getSession';

export const getCurrentUser = async () => {
	try {
		const session = await getSession();

		if (!session?.user?.email) {
			return null;
		}

		const currentUser = await prisma?.user.findUnique({
			where: {
				email: session.user.email as string,
			},
		});

		return currentUser;
	} catch (error: any) {
		return null;
	}
};
