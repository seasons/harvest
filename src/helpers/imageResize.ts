import qs from "querystring"
import { identity, pickBy } from "lodash"

export type ImageSize = "initial" | "thumb" | "small" | "medium" | "large" | "xlarge"

interface ImageResizerOptions {
  fit?: "clip"
  w?: number
  h?: number
  retina?: boolean
}

interface ImageSizeOptions {
  w?: number
  h?: number
  fit?: "clip"
}

type ImageSizeMap = {
  [key in ImageSize]: ImageSizeOptions
}

const IMGIX_BASE = "https://seasons-nyc.imgix.net/"
const AIRTABLE_BASE = "https://dl.airtable.com/.attachments/"

export const IMAGE_ASPECT_RATIO = 1.25

export const sizes: ImageSizeMap = {
  initial: {
    w: 30,
    fit: "clip",
  },
  thumb: {
    w: 208,
    fit: "clip",
  },
  small: {
    w: 288,
    fit: "clip",
  },
  medium: {
    w: 372,
    fit: "clip",
  },
  large: {
    w: 560,
    fit: "clip",
  },
  xlarge: {
    w: 702,
    fit: "clip",
  },
}

type ImageResizerSize = keyof typeof sizes

export const imageResize = (
  url: string,
  sizeName: ImageResizerSize,
  passedOptions: ImageResizerOptions = { fit: "clip" }
) => {
  const [path] = url.split("?")
  const newURL = path.replace(AIRTABLE_BASE, IMGIX_BASE)

  const options: ImageResizerOptions = pickBy(
    {
      fit: "clip",
      retina: true,
      ...passedOptions,
    },
    identity
  )

  let params: any
  const { retina, ...remainingOptions } = options

  if (sizeName) {
    const size = sizes[sizeName]
    params = pickBy(
      {
        ...sizes[sizeName],
        ...(options.retina && size.w ? { w: size.w * 2 } : {}),
        ...(options.retina && size.h ? { h: size.h * 2 } : {}),
        ...remainingOptions,
      },
      identity
    )
  } else {
    params = remainingOptions
  }
  return newURL + "?" + qs.stringify(params)
}
