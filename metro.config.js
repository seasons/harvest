const { applyConfigForLinkedDependencies } = require("@carimus/metro-symlinked-deps")

module.exports = applyConfigForLinkedDependencies(
  {
    /* Your existing configuration, optional */
  },
  {
    /* Options to pass to applyConfigForLinkedDependencies, optional */
    projectRoot: __dirname,
  }
)
