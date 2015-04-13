module.exports = {
	description: 'llama-table',

	normalizeEntityName: function () {
		return 'llama-table';
	},

	afterInstall: function () {
		return this.addBowerPackageToProject('number-formatter');
	}
};
