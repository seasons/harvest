const waait = require("waait")

export const waitForLoad = async component => {
  await waait(0)
  component.update()
}
