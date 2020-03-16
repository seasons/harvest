import Config from "react-native-config"

const AWS = require("aws-sdk/dist/aws-sdk-react-native")

const s3 = new AWS.S3({
  region: "us-east-1",
  credentials: {
    accessKeyId: Config.AWS_ACCESS_KEY_ID,
    secretAccessKey: Config.AWS_SECRET_ACCESS_KEY,
  },
})

export const downloadFromS3 = async (bucket, key) => {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: bucket,
      Key: key,
    }
    return s3.getObject(params, (err, data) => {
      const jsonResponse = JSON.parse(data?.Body?.toString())
      return jsonResponse
      if (err) reject(err)
    })
  })
}
