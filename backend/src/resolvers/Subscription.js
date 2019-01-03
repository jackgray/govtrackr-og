const { forwardTo } = require('prisma-binding');

const Subscription = {
	async bill(parent, args, ctx, info) {
		return await ctx.db.subscription.bill(
			{
				where: {
					mutation_in: [ 'UPDATED' ]
				}
			},
			info
		);
	}
};
