import { App } from "./src/App"
import { AppRegistry } from "react-native"
import * as Sentry from "@sentry/react-native"
import "react-native-gesture-handler"

if (!__DEV__) {
  Sentry.init({
    dsn: "https://6e163b9f771f4c53951c546a4ac64891@sentry.io/1824125",
  })
}

AppRegistry.registerComponent("seasons", () => App)

const data = {
  data: {
    product: {
      id: "ck5pjijrt03nc08216raoir37",
      name: "Denver New Cord Overshirt",
      description:
        "Shirt made from a wide and heavy corduroy. Features a spread collar, snap button front closure, a single chest pocket and buttoned long sleeves. Back yoke on the back and a straight hem.",
      retailPrice: 280,
      modelSize: "M",
      modelHeight: 72,
      color: { name: "Yellow", __typename: "Color" },
      secondaryColor: null,
      brand: {
        name: "Acne Studios",
        logo: [
          {
            id: "attab9gm8vzZRt9Wb",
            url: "https://dl.airtable.com/.attachments/6fb6ff5d1eec5a217274f334f5183b94/96d55c51/acne-stockists.jpg",
            filename: "acne-stockists.jpg",
            size: 2457,
            type: "image/jpeg",
            thumbnails: {
              small: {
                url: "https://dl.airtable.com/.attachmentThumbnails/e5c94d38f425c6563f07e4dd6bd3b1ba/1eb66892",
                width: 36,
                height: 36,
              },
              large: {
                url: "https://dl.airtable.com/.attachmentThumbnails/7996e0a5b49eceefdb1d81d75b3f54c8/76421dfe",
                width: 300,
                height: 300,
              },
              full: {
                url: "https://dl.airtable.com/.attachmentThumbnails/fc74b87b5eac3265e7e90da6debab332/73051a62",
                width: 3000,
                height: 3000,
              },
            },
          },
        ],
        since: "1996-01-01T00:00:00.000Z",
        __typename: "Brand",
      },
      outerMaterials: ["Cotton"],
      innerMaterials: ["Cotton"],
      images: [
        {
          id: "attPT1Fept6JAl1SI",
          url:
            "https://dl.airtable.com/.attachments/ba7777744813b8542c9c7c63d30ea28d/ae4e1ba5/ACNE-Corduroy-Longsleeve-Front.png",
          filename: "ACNE-Corduroy-Longsleeve-Front.png",
          size: 5660962,
          type: "image/png",
          thumbnails: {
            small: {
              url: "https://dl.airtable.com/.attachmentThumbnails/16fa9440add7a300ebc04d2c222f4971/f4232085",
              width: 29,
              height: 36,
            },
            large: {
              url: "https://dl.airtable.com/.attachmentThumbnails/14824ebb7e674ffbf62ede2bc4e48ad2/e0392f83",
              width: 512,
              height: 640,
            },
            full: {
              url: "https://dl.airtable.com/.attachmentThumbnails/2ce98b38a495bfcc9f5b08b70b861b64/2ceb81fb",
              width: 3000,
              height: 3000,
            },
          },
        },
        {
          id: "atte0rLbGu9ajNM0n",
          url:
            "https://dl.airtable.com/.attachments/dd5fe16f10362c4f36f79474663200db/8620b454/ACNE-Corduroy-Longsleeve-CloseUp.png",
          filename: "ACNE-Corduroy-Longsleeve-CloseUp.png",
          size: 6419263,
          type: "image/png",
          thumbnails: {
            small: {
              url: "https://dl.airtable.com/.attachmentThumbnails/5e46a543f4a203e437bd4851c79956a2/75c9a53d",
              width: 29,
              height: 36,
            },
            large: {
              url: "https://dl.airtable.com/.attachmentThumbnails/0e28f0e4a245b1d87e941556c714b2c7/9901911b",
              width: 512,
              height: 640,
            },
            full: {
              url: "https://dl.airtable.com/.attachmentThumbnails/ad51815ceccfa4683c338b5fcf0a3ff4/a00a96d3",
              width: 3000,
              height: 3000,
            },
          },
        },
        {
          id: "attAny1u6wcpifUkh",
          url:
            "https://dl.airtable.com/.attachments/4a833701e5bf30edc033c0acc28af8bd/5d78a8fc/ACNE-Corduroy-Longsleeve-Back.png",
          filename: "ACNE-Corduroy-Longsleeve-Back.png",
          size: 5222003,
          type: "image/png",
          thumbnails: {
            small: {
              url: "https://dl.airtable.com/.attachmentThumbnails/b7a864f2dd1784ef2bcd9634bccb5877/19d3c9a8",
              width: 29,
              height: 36,
            },
            large: {
              url: "https://dl.airtable.com/.attachmentThumbnails/6f6e7bb9f9649e7758469794dd243afa/672aa7cf",
              width: 512,
              height: 640,
            },
            full: {
              url: "https://dl.airtable.com/.attachmentThumbnails/f81770117a1c210ce7345ef5bdf0423b/bfa3294e",
              width: 3000,
              height: 3000,
            },
          },
        },
        {
          id: "attoiiKWPwByPy7Cb",
          url:
            "https://dl.airtable.com/.attachments/09567bcd38df42a656b0b9965dcd6d08/19c97127/ACNE-Corduroy-Longsleeve-Side.png",
          filename: "ACNE-Corduroy-Longsleeve-Side.png",
          size: 3256272,
          type: "image/png",
          thumbnails: {
            small: {
              url: "https://dl.airtable.com/.attachmentThumbnails/f0e973db8bdc2ee6bbd5ef53e7955054/9fd4211d",
              width: 29,
              height: 36,
            },
            large: {
              url: "https://dl.airtable.com/.attachmentThumbnails/52ef93a85f3d7af073b37dadfc8a16f3/d58ffc58",
              width: 512,
              height: 640,
            },
            full: {
              url: "https://dl.airtable.com/.attachmentThumbnails/eb043e264dde008886267033e8954b57/6b09388d",
              width: 3000,
              height: 3000,
            },
          },
        },
      ],
      isSaved: false,
      variants: [
        {
          id: "ck5pusra90gtf0821akolopix",
          size: "S",
          total: 1,
          reservable: 0,
          nonReservable: 0,
          reserved: 1,
          isSaved: false,
          __typename: "ProductVariant",
        },
        {
          id: "ck5pusrfp0gtq0821d6y5foz2",
          size: "M",
          total: 1,
          reservable: 0,
          nonReservable: 0,
          reserved: 1,
          isSaved: false,
          __typename: "ProductVariant",
        },
        {
          id: "ck5pusrkr0gu10821byk4up5p",
          size: "L",
          total: 1,
          reservable: 0,
          nonReservable: 0,
          reserved: 1,
          isSaved: false,
          __typename: "ProductVariant",
        },
      ],
      __typename: "Product",
    },
  },
}
